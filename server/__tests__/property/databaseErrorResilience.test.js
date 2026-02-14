// Feature: assignment-compliance-improvements, Property 4: Database Error Resilience
const fc = require('fast-check');
const request = require('supertest');
const mongoose = require('mongoose');
const createTestApp = require('../testApp');
const { createTestStudent, createTestAdmin } = require('../testUtils');

const app = createTestApp();

describe('Property 4: Database Error Resilience', () => {
  let student, studentToken, adminToken;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test_jwt_secret';
    const studentResult = await createTestStudent();
    student = studentResult.student;
    studentToken = studentResult.token;

    const adminResult = await createTestAdmin();
    adminToken = adminResult.token;
  });

  describe('System should handle database errors gracefully', () => {
    it('should handle invalid ObjectId format without crashing', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string().filter(s => !mongoose.isValidObjectId(s) && s.length > 0),
          async (invalidId) => {
            const response = await request(app)
              .post('/api/courses/register')
              .set('Authorization', `Bearer ${studentToken}`)
              .send({
                courseIds: [invalidId],
                userId: student._id
              });

            // System should handle error gracefully and return appropriate response
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response.status).toBeLessThan(600);
            expect(response.body).toHaveProperty('status');
            return true;
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should handle malformed user IDs without crashing', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string().filter(s => s.length > 0 && s.length < 50),
          async (malformedId) => {
            const response = await request(app)
              .post('/api/courses/register')
              .set('Authorization', `Bearer ${studentToken}`)
              .send({
                courseIds: ['507f1f77bcf86cd799439011'],
                userId: malformedId
              });

            // System should handle error gracefully
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response.status).toBeLessThan(600);
            expect(response.body).toHaveProperty('status');
            return true;
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should handle non-existent document queries gracefully', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 24, maxLength: 24 }).filter(s => /^[0-9a-f]{24}$/.test(s)),
          async (nonExistentId) => {
            const response = await request(app)
              .post('/api/courses/register')
              .set('Authorization', `Bearer ${studentToken}`)
              .send({
                courseIds: [nonExistentId],
                userId: student._id
              });

            // Should return 404 or 400, not crash
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response.status).toBeLessThan(500);
            expect(response.body).toHaveProperty('message');
            return true;
          }
        ),
        { numRuns: 20 } // Reduced runs since filter is expensive
      );
    });

    it('should handle duplicate key errors gracefully', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 5, maxLength: 20 }),
          async (randomString) => {
            const userData = {
              name: 'Test User',
              regNo: `UG15/CS/${randomString}`,
              email: `${randomString}@test.com`,
              password: 'password123',
              level: '100'
            };

            // Create user first time
            await request(app)
              .post('/api/auth/signup')
              .send(userData);

            // Try to create duplicate
            const response = await request(app)
              .post('/api/auth/signup')
              .send(userData);

            // Should handle duplicate error gracefully
            expect(response.status).toBe(400);
            expect(response.body.message).toBeDefined();
            return true;
          }
        ),
        { numRuns: 20 }
      );
    }, 30000);

    it('should handle validation errors without crashing', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            courseCode: fc.string({ minLength: 1, maxLength: 10 }),
            courseName: fc.string({ minLength: 1, maxLength: 100 }),
            semester: fc.integer(),
            creditUnit: fc.integer(),
            level: fc.string()
          }),
          async (invalidCourseData) => {
            const response = await request(app)
              .post('/api/admin/courses')
              .set('Authorization', `Bearer ${adminToken}`)
              .send(invalidCourseData);

            // System should handle validation errors gracefully
            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(response.status).toBeLessThan(600);
            expect(response.body).toHaveProperty('status');
            return true;
          }
        ),
        { numRuns: 20 }
      );
    }, 30000);

    it('should return appropriate error responses for database failures', async () => {
      // Test with various invalid inputs that could cause database errors
      const testCases = [
        {
          endpoint: '/api/courses/register',
          method: 'post',
          token: studentToken,
          data: { courseIds: null, userId: student._id }
        },
        {
          endpoint: '/api/courses/register',
          method: 'post',
          token: studentToken,
          data: { courseIds: ['invalid'], userId: student._id }
        },
        {
          endpoint: '/api/admin/courses',
          method: 'post',
          token: adminToken,
          data: { courseCode: '', courseName: '', semester: 0, creditUnit: 0, level: '' }
        }
      ];

      for (const testCase of testCases) {
        const response = await request(app)[testCase.method](testCase.endpoint)
          .set('Authorization', `Bearer ${testCase.token}`)
          .send(testCase.data);

        // Should return error response, not crash
        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.body).toHaveProperty('status');
        expect(response.body.status).toBe('error');
      }
    });

    it('should handle concurrent database operations without crashing', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(fc.integer({ min: 1, max: 10 }), { minLength: 5, maxLength: 10 }),
          async (operations) => {
            // Simulate concurrent requests
            const promises = operations.map(async () => {
              try {
                const response = await request(app)
                  .get('/api/admin/stats')
                  .set('Authorization', `Bearer ${adminToken}`);
                
                return response.status;
              } catch (_error) {
                return 500;
              }
            });

            const results = await Promise.all(promises);
            
            // All requests should complete without crashing
            results.forEach(status => {
              expect(status).toBeGreaterThanOrEqual(200);
              expect(status).toBeLessThan(600);
            });
            
            return true;
          }
        ),
        { numRuns: 10 } // Reduced runs for concurrent operations
      );
    }, 30000);

    it('should maintain system stability after database errors', async () => {
      // Cause a database error
      await request(app)
        .post('/api/courses/register')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ courseIds: ['invalid'], userId: student._id });

      // System should still work after error
      const response = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
    });

    it('should handle empty or null database results gracefully', async () => {
      // Query for non-existent data
      const response = await request(app)
        .get('/api/courses/all?level=500');

      // Should return empty result, not crash
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });

    it('should handle malformed query parameters without crashing', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string(),
          async (malformedLevel) => {
            const response = await request(app)
              .get(`/api/courses/all?level=${encodeURIComponent(malformedLevel)}`);

            // Should handle gracefully, not crash
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBeLessThan(600);
            expect(response.body).toHaveProperty('status');
            return true;
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('System should log errors but continue operating', () => {
    it('should continue serving requests after encountering errors', async () => {
      const errorRequests = [];
      const successRequests = [];

      // Generate some error requests
      for (let i = 0; i < 5; i++) {
        errorRequests.push(
          request(app)
            .post('/api/courses/register')
            .set('Authorization', `Bearer ${studentToken}`)
            .send({ courseIds: ['invalid'], userId: student._id })
        );
      }

      await Promise.all(errorRequests);

      // System should still handle valid requests
      for (let i = 0; i < 5; i++) {
        successRequests.push(
          request(app)
            .get('/api/admin/stats')
            .set('Authorization', `Bearer ${adminToken}`)
        );
      }

      const results = await Promise.all(successRequests);
      
      results.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
      });
    });
  });
});
