# Member-by-Member Contribution Guide

## Overview

This guide provides step-by-step instructions for each team member to contribute code to the project. The workflow is simple:

1. Fork the target repository (where we'll all contribute)
2. Download the source code (the complete working application)
3. Copy your assigned files from source to your fork
4. Create a pull request
5. Review other members' pull requests
6. Wait for tutor to merge

**Source Repository (Complete Code):** https://github.com/dayyabu17/university-course-reg  
**Target Repository (Where We Contribute):** https://github.com/university-course-registration/university-course-registration

## Why This Approach?

The source repository contains a fully working application. Each team member will copy specific parts of this application to the target repository. This simulates real-world open-source contribution where you:
- Fork a project
- Add your contribution
- Submit a pull request
- Get code review
- Have maintainers merge your work

This demonstrates Git/GitHub collaboration skills required for the assignment.

---

## Prerequisites (Do This First!)

Before starting, make sure you have:

1. **Git installed** on your computer
   - Windows: Download from https://git-scm.com/download/win
   - Mac: `brew install git` or download from https://git-scm.com/download/mac
   - Linux: `sudo apt install git`
   - Verify: `git --version`

2. **GitHub account** created at https://github.com/signup

3. **Git configured** with your name and email:
   ```bash
   git config --global user.name "Your Full Name"
   git config --global user.email "your-email@example.com"
   ```

---

## Quick Start for All Members

### Step 1: Fork the Target Repository

1. Go to: https://github.com/university-course-registration/university-course-registration
2. Click the **"Fork"** button in the top-right corner
3. This creates a copy under your GitHub account: `https://github.com/YOUR-USERNAME/university-course-registration`

### Step 2: Clone Your Fork

```bash
# Clone YOUR fork (replace YOUR-USERNAME with your actual GitHub username)
git clone https://github.com/YOUR-USERNAME/university-course-registration.git

# Navigate into the folder
cd university-course-registration

# Add upstream remote (the main repository)
git remote add upstream https://github.com/university-course-registration/university-course-registration.git

# Verify remotes are set up correctly
git remote -v
# You should see:
# origin    https://github.com/YOUR-USERNAME/university-course-registration.git (fetch)
# origin    https://github.com/YOUR-USERNAME/university-course-registration.git (push)
# upstream  https://github.com/university-course-registration/university-course-registration.git (fetch)
# upstream  https://github.com/university-course-registration/university-course-registration.git (push)
```

### Step 3: Download Source Code

```bash
# Go back to parent directory
cd ..

# Download the complete source code
git clone https://github.com/dayyabu17/university-course-reg.git source-code

# Now you should have two folders in your current directory:
# 1. university-course-registration/ - Your working repository (where you'll add files)
# 2. source-code/ - The complete application (where you'll copy files from)
```

**Verify your setup:**
```bash
# List directories
ls
# You should see both folders:
# university-course-registration/
# source-code/
```

Now you're ready to follow your specific member instructions below!

---

## Member 1: Suleiman Abdulkadir (Project Lead)
**Registration:** CST/20/SWE/00482

### Your Assignment: Project Configuration & Root Files

**Files to Copy:**
```
source-code/
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── LICENSE.md
├── CONTRIBUTING.md
└── .github/
    └── workflows/
        └── ci.yml
```

### Step-by-Step Instructions:

```bash
# 1. Navigate to your repository
cd university-course-registration

# 2. Create your feature branch
git checkout -b feature/project-setup

# 3. Copy root configuration files
cp ../source-code/package.json .
cp ../source-code/package-lock.json .
cp ../source-code/.gitignore .
cp ../source-code/README.md .
cp ../source-code/LICENSE.md .
cp ../source-code/CONTRIBUTING.md .

# 4. Copy GitHub workflows
mkdir -p .github/workflows
cp ../source-code/.github/workflows/ci.yml .github/workflows/

# 5. Stage your changes
git add .

# 6. Commit with a meaningful message
git commit -m "feat: add project configuration and CI/CD setup

- Add package.json with project dependencies
- Add .gitignore for Node.js project
- Add README with project documentation
- Add LICENSE (MIT) and CONTRIBUTING guidelines
- Add GitHub Actions CI/CD workflow"

# 7. Push to your fork
git push origin feature/project-setup

# 8. Create Pull Request on GitHub
# Go to your fork and click "Compare & pull request"
# Title: [Setup] Add project configuration and CI/CD
# Description: Initial project setup with root configuration files
```

---

## Member 2: Usman Dayyabu Usman (Repository Manager)
**Registration:** CST/21/SWE/00652

### Your Assignment: Server Configuration & Models

**Files to Copy:**
```
source-code/server/
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── index.js
├── jest.config.js
├── eslint.config.mjs
└── models/
    ├── User.js
    ├── Course.js
    └── SystemConfig.js
```

### Step-by-Step Instructions:

```bash
# 1. Sync with upstream first
cd university-course-registration
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feature/server-setup

# 3. Create server directory
mkdir -p server/models

# 4. Copy server configuration files
cp ../source-code/server/package.json server/
cp ../source-code/server/package-lock.json server/
cp ../source-code/server/.gitignore server/
cp ../source-code/server/index.js server/
cp ../source-code/server/jest.config.js server/
cp ../source-code/server/eslint.config.mjs server/

# 5. Create .env.example (don't copy actual .env)
cat > server/.env.example << 'EOF'
PORT=5000
MONGODB_URI=mongodb://localhost:27017/course-registration
JWT_SECRET=your_jwt_secret_key_here
EOF

# 6. Copy model files
cp ../source-code/server/models/User.js server/models/
cp ../source-code/server/models/Course.js server/models/
cp ../source-code/server/models/SystemConfig.js server/models/

# 7. Stage, commit, and push
git add .
git commit -m "feat: add server configuration and database models

- Add server package.json with dependencies
- Add Express server entry point (index.js)
- Add Jest and ESLint configuration
- Add Mongoose models (User, Course, SystemConfig)
- Add .env.example for environment variables"

git push origin feature/server-setup

# 8. Create Pull Request
# Title: [Server] Add server configuration and database models
```

---

## Member 3: Abdulhalim Muhammad Yaro (Maintainer)
**Registration:** CST/21/SWE/00663

### Your Assignment: Server Controllers

**Files to Copy:**
```
source-code/server/controllers/
├── authController.js
├── courseController.js
├── adminController.js
├── profileController.js
└── exportController.js
```

### Step-by-Step Instructions:

```bash
# 1. Sync with upstream
cd university-course-registration
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feature/server-controllers

# 3. Create controllers directory
mkdir -p server/controllers

# 4. Copy all controller files
cp ../source-code/server/controllers/authController.js server/controllers/
cp ../source-code/server/controllers/courseController.js server/controllers/
cp ../source-code/server/controllers/adminController.js server/controllers/
cp ../source-code/server/controllers/profileController.js server/controllers/
cp ../source-code/server/controllers/exportController.js server/controllers/

# 5. Stage, commit, and push
git add .
git commit -m "feat: add server controllers for API endpoints

- Add authController for user authentication
- Add courseController for course operations
- Add adminController for admin operations
- Add profileController for user profile management
- Add exportController for data export functionality"

git push origin feature/server-controllers

# 6. Create Pull Request
# Title: [Server] Add API controllers
```

---

## Member 4: Suhaibu Salihu Musa
**Registration:** CST/20/SWE/00503

### Your Assignment: Server Middleware & Routes

**Files to Copy:**
```
source-code/server/
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── validation.js
│   └── checkRegistrationPeriod.js
└── routes/
    ├── authRoutes.js
    ├── courseRoutes.js
    ├── adminRoutes.js
    ├── profileRoutes.js
    └── exportRoutes.js
```

### Step-by-Step Instructions:

```bash
# 1. Sync with upstream
cd university-course-registration
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feature/middleware-routes

# 3. Create directories
mkdir -p server/middleware
mkdir -p server/routes

# 4. Copy middleware files
cp ../source-code/server/middleware/authMiddleware.js server/middleware/
cp ../source-code/server/middleware/errorHandler.js server/middleware/
cp ../source-code/server/middleware/validation.js server/middleware/
cp ../source-code/server/middleware/checkRegistrationPeriod.js server/middleware/

# 5. Copy route files
cp ../source-code/server/routes/authRoutes.js server/routes/
cp ../source-code/server/routes/courseRoutes.js server/routes/
cp ../source-code/server/routes/adminRoutes.js server/routes/
cp ../source-code/server/routes/profileRoutes.js server/routes/
cp ../source-code/server/routes/exportRoutes.js server/routes/

# 6. Stage, commit, and push
git add .
git commit -m "feat: add middleware and API routes

- Add authentication middleware for JWT verification
- Add error handler middleware
- Add validation middleware for request data
- Add registration period check middleware
- Add route definitions for all API endpoints"

git push origin feature/middleware-routes

# 7. Create Pull Request
# Title: [Server] Add middleware and API routes
```

---

## Member 5: Maryam Muhammad Bello
**Registration:** CST/20/SWE/0502

### Your Assignment: Server Tests (Integration)

**Files to Copy:**
```
source-code/server/__tests__/
├── setup.js
├── testApp.js
├── testUtils.js
└── integration/
    ├── auth.test.js
    ├── courses.test.js
    ├── admin.test.js
    ├── capacity.test.js
    └── prerequisites.test.js
```

### Step-by-Step Instructions:

```bash
# 1. Sync with upstream
cd university-course-registration
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feature/integration-tests

# 3. Create test directories
mkdir -p server/__tests__/integration

# 4. Copy test setup files
cp ../source-code/server/__tests__/setup.js server/__tests__/
cp ../source-code/server/__tests__/testApp.js server/__tests__/
cp ../source-code/server/__tests__/testUtils.js server/__tests__/

# 5. Copy integration test files
cp ../source-code/server/__tests__/integration/auth.test.js server/__tests__/integration/
cp ../source-code/server/__tests__/integration/courses.test.js server/__tests__/integration/
cp ../source-code/server/__tests__/integration/admin.test.js server/__tests__/integration/
cp ../source-code/server/__tests__/integration/capacity.test.js server/__tests__/integration/
cp ../source-code/server/__tests__/integration/prerequisites.test.js server/__tests__/integration/

# 6. Stage, commit, and push
git add .
git commit -m "test: add integration tests for API endpoints

- Add test setup and utilities
- Add authentication endpoint tests
- Add course registration tests
- Add admin functionality tests
- Add capacity and prerequisite validation tests"

git push origin feature/integration-tests

# 7. Create Pull Request
# Title: [Tests] Add integration tests
```

---

## Member 6: Usman Muhammad Onimisi
**Registration:** CST/20/SWE/00513

### Your Assignment: Server Tests (Unit & Property)

**Files to Copy:**
```
source-code/server/__tests__/
├── unit/
│   ├── models/
│   │   ├── User.test.js
│   │   └── Course.test.js
│   ├── middleware/
│   │   ├── authMiddleware.test.js
│   │   └── errorHandler.test.js
│   └── prerequisites.test.js
└── property/
    ├── databaseErrorResilience.test.js
    ├── errorStatusCodeMapping.test.js
    └── invalidInputErrors.test.js
```

### Step-by-Step Instructions:

```bash
# 1. Sync with upstream
cd university-course-registration
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feature/unit-property-tests

# 3. Create test directories
mkdir -p server/__tests__/unit/models
mkdir -p server/__tests__/unit/middleware
mkdir -p server/__tests__/property

# 4. Copy unit test files
cp ../source-code/server/__tests__/unit/models/User.test.js server/__tests__/unit/models/
cp ../source-code/server/__tests__/unit/models/Course.test.js server/__tests__/unit/models/
cp ../source-code/server/__tests__/unit/middleware/authMiddleware.test.js server/__tests__/unit/middleware/
cp ../source-code/server/__tests__/unit/middleware/errorHandler.test.js server/__tests__/unit/middleware/
cp ../source-code/server/__tests__/unit/prerequisites.test.js server/__tests__/unit/

# 5. Copy property-based test files
cp ../source-code/server/__tests__/property/databaseErrorResilience.test.js server/__tests__/property/
cp ../source-code/server/__tests__/property/errorStatusCodeMapping.test.js server/__tests__/property/
cp ../source-code/server/__tests__/property/invalidInputErrors.test.js server/__tests__/property/

# 6. Stage, commit, and push
git add .
git commit -m "test: add unit and property-based tests

- Add unit tests for User and Course models
- Add unit tests for middleware
- Add property-based tests for error handling
- Add property-based tests for input validation
- Add property-based tests for database resilience"

git push origin feature/unit-property-tests

# 7. Create Pull Request
# Title: [Tests] Add unit and property-based tests
```

---

## Member 7: Samaila Aliyu
**Registration:** CST/22/SWE/00922

### Your Assignment: Server Scripts & Documentation

**Files to Copy:**
```
source-code/server/
├── scripts/
│   ├── seedDatabase.js
│   ├── seedUsers.js
│   ├── testAdminEndpoints.js
│   └── testSmokeEndpoints.js
├── README.md
└── COURSE_MANAGEMENT.md
```

### Step-by-Step Instructions:

```bash
# 1. Sync with upstream
cd university-course-registration
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feature/server-scripts-docs

# 3. Create scripts directory
mkdir -p server/scripts

# 4. Copy script files
cp ../source-code/server/scripts/seedDatabase.js server/scripts/
cp ../source-code/server/scripts/seedUsers.js server/scripts/
cp ../source-code/server/scripts/testAdminEndpoints.js server/scripts/
cp ../source-code/server/scripts/testSmokeEndpoints.js server/scripts/

# 5. Copy documentation
cp ../source-code/server/README.md server/
cp ../source-code/COURSE_MANAGEMENT.md .

# 6. Stage, commit, and push
git add .
git commit -m "feat: add server scripts and documentation

- Add database seeding scripts
- Add user seeding script
- Add endpoint testing scripts
- Add server README with setup instructions
- Add course management documentation"

git push origin feature/server-scripts-docs

# 7. Create Pull Request
# Title: [Server] Add scripts and documentation
```

---

## Member 8: Achimugu Amina
**Registration:** CST/20/SWE/00483

### Your Assignment: Client Configuration & Setup

**Files to Copy:**
```
source-code/client/
├── package.json
├── package-lock.json
├── .gitignore
├── index.html
├── vite.config.js
├── vitest.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── .env.example
└── README.md
```

### Step-by-Step Instructions:

```bash
# 1. Sync with upstream
cd university-course-registration
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feature/client-setup

# 3. Create client directory
mkdir -p client

# 4. Copy configuration files
cp ../source-code/client/package.json client/
cp ../source-code/client/package-lock.json client/
cp ../source-code/client/.gitignore client/
cp ../source-code/client/index.html client/
cp ../source-code/client/vite.config.js client/
cp ../source-code/client/vitest.config.js client/
cp ../source-code/client/tailwind.config.js client/
cp ../source-code/client/postcss.config.js client/
cp ../source-code/client/eslint.config.js client/
cp ../source-code/client/README.md client/

# 5. Create .env.example
cat > client/.env.example << 'EOF'
VITE_API_BASE_URL=http://localhost:5000/api
EOF

# 6. Stage, commit, and push
git add .
git commit -m "feat: add client configuration and build setup

- Add package.json with React and Vite dependencies
- Add Vite configuration for development
- Add Tailwind CSS configuration
- Add ESLint configuration
- Add Vitest configuration for testing
- Add client README with setup instructions"

git push origin feature/client-setup

# 7. Create Pull Request
# Title: [Client] Add client configuration and build setup
```

---

## Member 9: Usman Alamin Umar
**Registration:** CST/20/SWE/00512

### Your Assignment: Client Source Files (Part 1)

**Files to Copy:**
```
source-code/client/src/
├── main.jsx
├── App.jsx
├── App.css
├── index.css
├── lib/
│   └── api.js
├── constants/
│   ├── adminNavItems.js
│   ├── catalog.js
│   ├── icons.jsx
│   ├── levels.js
│   └── storageKeys.js
└── layouts/
    └── AuthLayout.jsx
```

### Step-by-Step Instructions:

```bash
# 1. Sync with upstream
cd university-course-registration
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feature/client-core

# 3. Create directories
mkdir -p client/src/lib
mkdir -p client/src/constants
mkdir -p client/src/layouts

# 4. Copy core files
cp ../source-code/client/src/main.jsx client/src/
cp ../source-code/client/src/App.jsx client/src/
cp ../source-code/client/src/App.css client/src/
cp ../source-code/client/src/index.css client/src/

# 5. Copy lib files
cp ../source-code/client/src/lib/api.js client/src/lib/

# 6. Copy constants
cp ../source-code/client/src/constants/adminNavItems.js client/src/constants/
cp ../source-code/client/src/constants/catalog.js client/src/constants/
cp ../source-code/client/src/constants/icons.jsx client/src/constants/
cp ../source-code/client/src/constants/levels.js client/src/constants/
cp ../source-code/client/src/constants/storageKeys.js client/src/constants/

# 7. Copy layouts
cp ../source-code/client/src/layouts/AuthLayout.jsx client/src/layouts/

# 8. Copy public assets
mkdir -p client/public
cp -r ../source-code/client/public/* client/public/

# 9. Stage, commit, and push
git add .
git commit -m "feat: add client core files and utilities

- Add React entry point (main.jsx)
- Add App component with routing
- Add global styles
- Add API client utility
- Add constants for app configuration
- Add authentication layout
- Add public assets"

git push origin feature/client-core

# 10. Create Pull Request
# Title: [Client] Add core files and utilities
```

---

## Member 10: Tahir Musa Tahir
**Registration:** CST/21/SWE/00683

### Your Assignment: Client Components, Pages, Hooks & Tests

**Files to Copy:**
```
source-code/client/src/
├── components/
│   └── (all component files)
├── pages/
│   └── (all page files)
├── hooks/
│   └── (all hook files)
└── __tests__/
    └── (all test files)
```

### Step-by-Step Instructions:

```bash
# 1. Sync with upstream
cd university-course-registration
git checkout main
git pull upstream main

# 2. Create your feature branch
git checkout -b feature/client-components-pages

# 3. Create directories
mkdir -p client/src/components
mkdir -p client/src/pages
mkdir -p client/src/hooks
mkdir -p client/src/__tests__

# 4. Copy all components
cp -r ../source-code/client/src/components/* client/src/components/

# 5. Copy all pages
cp -r ../source-code/client/src/pages/* client/src/pages/

# 6. Copy all hooks
cp -r ../source-code/client/src/hooks/* client/src/hooks/

# 7. Copy all tests
cp -r ../source-code/client/src/__tests__/* client/src/__tests__/

# 8. Copy assets if any
mkdir -p client/src/assets
cp -r ../source-code/client/src/assets/* client/src/assets/ 2>/dev/null || true

# 9. Stage, commit, and push
git add .
git commit -m "feat: add client components, pages, hooks and tests

- Add all React components (UI elements)
- Add all page components (routes)
- Add custom React hooks for state management
- Add client-side tests (unit, integration, property)
- Add assets (images, icons)"

git push origin feature/client-components-pages

# 10. Create Pull Request
# Title: [Client] Add components, pages, hooks and tests
```

---

## After Creating Your Pull Request

### What to Include in Your PR

1. **Title Format:**
   ```
   [Category] Brief description
   
   Examples:
   [Setup] Add project configuration and CI/CD
   [Server] Add database models
   [Client] Add React components
   [Tests] Add integration tests
   [Docs] Add server documentation
   ```

2. **Description Template:**
   ```markdown
   ## What This PR Does
   This PR adds [brief description of what you added]
   
   ## Files Added
   - `path/to/file1` - Description
   - `path/to/file2` - Description
   - `folder/` - Description of folder contents
   
   ## Assignment
   This is my assigned contribution as [Your Role] (Member [Number])
   
   ## Checklist
   - [x] All assigned files copied correctly
   - [x] Files are in correct locations
   - [x] No merge conflicts
   - [x] Commit message follows conventions
   - [x] Ready for review
   
   ## Reviewers
   @reviewer1 @reviewer2
   
   Closes #[issue-number] (if applicable)
   ```

### Requesting Reviews

After creating your PR:

1. **Assign reviewers** - Check the "Code Review Assignments" section below to see who should review your PR
2. **Add labels** - Add appropriate labels (e.g., `enhancement`, `documentation`)
3. **Link issues** - If there's a related issue, link it in the description
4. **Be patient** - Give reviewers 24-48 hours to respond

### Responding to Review Feedback

When reviewers leave comments:

1. **Read carefully** - Understand what they're asking
2. **Ask questions** - If something is unclear, ask for clarification
3. **Make changes** - Address the feedback in new commits
4. **Reply to comments** - Let reviewers know you've addressed their concerns
5. **Request re-review** - After making changes, request another review

**Example responses:**
- "Good catch! Fixed in commit abc123"
- "I moved the file to the correct location as suggested"
- "Can you clarify what you mean by...?"
- "All feedback addressed. Ready for another review"

### What NOT to Do

- Don't merge your own PR (only tutor can merge)
- Don't force push after creating PR (unless specifically needed for conflicts)
- Don't ignore review comments
- Don't get defensive about feedback
- Don't add files outside your assignment without discussion

---

## Code Review Assignments

Each member must review PRs from two other members. This ensures everyone participates in code review.

| Your Name | Member # | Review PRs from | Their Member # |
|-----------|----------|----------------|----------------|
| Suleiman Abdulkadir | 1 | Usman Dayyabu (2), Abdulhalim (3) | 2, 3 |
| Usman Dayyabu Usman | 2 | Abdulhalim (3), Suhaibu (4) | 3, 4 |
| Abdulhalim Muhammad Yaro | 3 | Suhaibu (4), Maryam (5) | 4, 5 |
| Suhaibu Salihu Musa | 4 | Maryam (5), Usman M. (6) | 5, 6 |
| Maryam Muhammad Bello | 5 | Usman M. (6), Samaila (7) | 6, 7 |
| Usman Muhammad Onimisi | 6 | Samaila (7), Achimugu (8) | 7, 8 |
| Samaila Aliyu | 7 | Achimugu (8), Usman A. (9) | 8, 9 |
| Achimugu Amina | 8 | Usman A. (9), Tahir (10) | 9, 10 |
| Usman Alamin Umar | 9 | Tahir (10), Suleiman (1) | 10, 1 |
| Tahir Musa Tahir | 10 | Suleiman (1), Usman D. (2) | 1, 2 |

### How to Review a PR

1. **Go to the PR page** on GitHub
2. **Click "Files changed"** tab to see the code
3. **Review each file:**
   - Check if files are in correct locations
   - Verify file names match the assignment
   - Look for any obvious issues
4. **Leave comments** if you find issues:
   - Click the line number to add a comment
   - Be specific and constructive
   - Suggest improvements
5. **Submit your review:**
   - Click "Review changes" button
   - Choose: "Approve" (if good) or "Request changes" (if issues found)
   - Add summary comment
   - Click "Submit review"

### Review Checklist

Use this checklist when reviewing:

- [ ] All assigned files are present
- [ ] Files are in correct directory structure
- [ ] No extra/unrelated files included
- [ ] Commit message follows conventions (feat:, fix:, docs:, etc.)
- [ ] PR description is complete and clear
- [ ] No merge conflicts
- [ ] File paths match the assignment

### Example Review Comments

**Good comments:**
- "LGTM! All files are in the correct locations"
- "Great work! The commit message is clear and follows conventions"
- "Suggestion: The file `server/models/User.js` should be in `server/models/` not `server/model/`"
- "Question: Why is `package-lock.json` not included? It should be part of your assignment"
- "Please update the commit message to follow the format: `feat: add server models`"

**Bad comments:**
- "Looks good" (too vague)
- "This is wrong" (not specific)
- "I don't like this" (not constructive)
- "Why did you do it this way?" (without context)

### Approval Guidelines

**Approve when:**
- All assigned files are present and correct
- Files are in proper locations
- Commit message is clear
- No obvious issues

**Request changes when:**
- Files are missing
- Files are in wrong locations
- Extra unrelated files included
- Commit message doesn't follow conventions
- Merge conflicts exist

---

## Common Issues and Solutions

### Issue 1: "Permission denied" when cloning

**Problem:** Can't clone the repository

**Solution:**
```bash
# Make sure you're cloning YOUR fork, not the main repository
git clone https://github.com/YOUR-USERNAME/university-course-registration.git

# If using SSH and it fails, try HTTPS instead
git clone https://github.com/YOUR-USERNAME/university-course-registration.git
```

### Issue 2: Merge Conflicts

**Problem:** Your PR has merge conflicts

**Solution:**
```bash
# 1. Make sure you're on your feature branch
git checkout your-feature-branch

# 2. Fetch latest changes from upstream
git fetch upstream

# 3. Merge upstream main into your branch
git merge upstream/main

# 4. Git will show which files have conflicts
# Open each conflicted file and look for:
# <<<<<<< HEAD
# your changes
# =======
# their changes
# >>>>>>> upstream/main

# 5. Edit the file to keep the correct version
# Remove the conflict markers (<<<<<<<, =======, >>>>>>>)

# 6. After fixing all conflicts, stage the files
git add .

# 7. Commit the merge
git commit -m "fix: resolve merge conflicts with upstream main"

# 8. Push to your fork
git push origin your-feature-branch
```

### Issue 3: Wrong Files Copied

**Problem:** You copied the wrong files or put them in wrong location

**Solution:**
```bash
# 1. Remove the wrong files
git rm path/to/wrong/file
# Or for a directory:
git rm -r path/to/wrong/directory

# 2. Copy the correct files
cp ../source-code/correct/path/file correct/destination/

# 3. Stage the changes
git add .

# 4. Amend your previous commit (if you haven't pushed yet)
git commit --amend

# 5. If you already pushed, make a new commit
git commit -m "fix: correct file locations"

# 6. Push (use --force only if you amended)
git push origin your-feature-branch --force
```

### Issue 4: Forgot to Create a Branch

**Problem:** You made changes directly on main branch

**Solution:**
```bash
# 1. Create a new branch from your current state
git checkout -b feature/your-feature-name

# 2. Your changes are now on the new branch

# 3. Reset your main branch to match upstream
git checkout main
git reset --hard upstream/main

# 4. Go back to your feature branch
git checkout feature/your-feature-name

# 5. Push your feature branch
git push origin feature/your-feature-name
```

### Issue 5: Can't Push to Repository

**Problem:** `git push` fails with permission error

**Solution:**
```bash
# Make sure you're pushing to YOUR fork (origin), not upstream
git push origin your-feature-branch

# NOT this (you don't have permission):
# git push upstream your-feature-branch

# Verify your remotes
git remote -v
# origin should point to YOUR fork
# upstream should point to the main repository
```

### Issue 6: Lost or Confused About Changes

**Problem:** Not sure what changes you've made

**Solution:**
```bash
# See what files have changed
git status

# See the actual changes in files
git diff

# See your commit history
git log --oneline

# If you want to start over (WARNING: loses all changes)
git checkout main
git reset --hard upstream/main
git checkout -b feature/new-attempt
```

### Issue 7: Accidentally Committed .env or Sensitive Files

**Problem:** You committed files that shouldn't be in the repository

**Solution:**
```bash
# 1. Remove the file from Git (but keep it locally)
git rm --cached path/to/sensitive/file

# 2. Add it to .gitignore
echo "path/to/sensitive/file" >> .gitignore

# 3. Commit the removal
git add .gitignore
git commit -m "fix: remove sensitive file from repository"

# 4. Push
git push origin your-feature-branch --force
```

### Issue 8: Need to Update PR After Review

**Problem:** Reviewers requested changes

**Solution:**
```bash
# 1. Make sure you're on your feature branch
git checkout your-feature-branch

# 2. Make the requested changes to your files

# 3. Stage and commit the changes
git add .
git commit -m "fix: address review feedback"

# 4. Push to your fork (this automatically updates the PR)
git push origin your-feature-branch

# 5. Reply to review comments on GitHub
# Let reviewers know you've addressed their feedback
```

---

## Getting Help

### Before Creating Your PR

- [ ] Forked the target repository
- [ ] Cloned your fork locally
- [ ] Downloaded source code
- [ ] Created a feature branch (not working on main)
- [ ] Copied all assigned files correctly
- [ ] Files are in correct locations
- [ ] No extra files included
- [ ] Verified file structure matches assignment

### When Creating Your PR

- [ ] Committed with meaningful message following conventions
- [ ] Pushed to your fork (origin)
- [ ] Created pull request on GitHub
- [ ] Added complete PR description
- [ ] Linked related issues (if any)
- [ ] Requested reviews from assigned reviewers
- [ ] Added appropriate labels

### During Code Review

- [ ] Reviewed 2 other members' PRs
- [ ] Left constructive comments
- [ ] Approved or requested changes appropriately
- [ ] Responded to feedback on your PR
- [ ] Made requested changes
- [ ] Re-requested review after changes

### After PR is Merged

- [ ] Pulled latest changes from upstream
- [ ] Tested application locally
- [ ] Deleted feature branch (optional)
- [ ] Documented your contribution
- [ ] Helped teammates if needed

### For Final Submission

- [ ] All team members have merged PRs
- [ ] Application runs without errors
- [ ] All tests pass
- [ ] Documentation is complete
- [ ] Project report is ready
- [ ] Contribution statistics compiled
- [ ] Screenshots and evidence gathered

---

## Contribution Statistics

Track your contributions for the project report:

### Individual Stats to Record

- **Number of commits:** `git log --author="Your Name" --oneline | wc -l`
- **Lines added/removed:** `git log --author="Your Name" --stat`
- **Files changed:** Count from your PR
- **PRs created:** 1 (your main contribution)
- **PRs reviewed:** 2 (assigned reviews)
- **Issues created:** Track on GitHub
- **Comments made:** Track on GitHub

### How to Get Your Stats

```bash
# Navigate to the repository after all PRs are merged
cd university-course-registration

# Get your commit count
git log --author="Your Name" --oneline | wc -l

# Get detailed stats
git log --author="Your Name" --stat

# Get commits by all authors (for comparison)
git shortlog -sn

# Get file changes
git log --author="Your Name" --name-only --pretty=format: | sort | uniq
```

### Team Stats to Record

- Total commits by all members
- Total lines of code
- Total files in project
- Number of PRs merged
- Number of issues created and closed
- Code review participation rate

---

## Visual Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTRIBUTION WORKFLOW                         │
└─────────────────────────────────────────────────────────────────┘

Step 1: FORK
┌──────────────────────────────────────────────────────────────┐
│  Main Repo (university-course-registration)                   │
│  https://github.com/university-course-registration/...        │
└────────────────────┬─────────────────────────────────────────┘
                     │ Click "Fork" button
                     ▼
┌──────────────────────────────────────────────────────────────┐
│  Your Fork (YOUR-USERNAME/university-course-registration)     │
│  https://github.com/YOUR-USERNAME/...                         │
└──────────────────────────────────────────────────────────────┘

Step 2: CLONE
┌──────────────────────────────────────────────────────────────┐
│  Your Computer                                                │
│  ├── university-course-registration/  (your working copy)    │
│  └── source-code/                     (complete app)          │
└──────────────────────────────────────────────────────────────┘

Step 3: BRANCH
┌──────────────────────────────────────────────────────────────┐
│  main branch                                                  │
│    └── feature/your-feature-name  (your work here)           │
└──────────────────────────────────────────────────────────────┘

Step 4: COPY FILES
┌──────────────────────────────────────────────────────────────┐
│  source-code/                                                 │
│    └── your-assigned-files  ──────┐                          │
│                                    │ copy                     │
│  university-course-registration/   │                          │
│    └── correct-location  <─────────┘                          │
└──────────────────────────────────────────────────────────────┘

Step 5: COMMIT & PUSH
┌──────────────────────────────────────────────────────────────┐
│  git add .                                                    │
│  git commit -m "feat: add your contribution"                 │
│  git push origin feature/your-feature-name                   │
└──────────────────────────────────────────────────────────────┘

Step 6: PULL REQUEST
┌──────────────────────────────────────────────────────────────┐
│  Your Fork  ──────────────────────────────────────────────┐  │
│                                                            │  │
│                                                            ▼  │
│  Main Repo  ◄──── Pull Request (waiting for review)          │
└──────────────────────────────────────────────────────────────┘

Step 7: CODE REVIEW
┌──────────────────────────────────────────────────────────────┐
│  Reviewer 1: ✓ Approved                                      │
│  Reviewer 2: ✓ Approved                                      │
└──────────────────────────────────────────────────────────────┘

Step 8: MERGE (by Tutor)
┌──────────────────────────────────────────────────────────────┐
│  Main Repo (main branch)                                      │
│    └── Your contribution is now part of the project!         │
└──────────────────────────────────────────────────────────────┘
```

---

## Getting Help

### When You're Stuck

**1. Check Documentation First**
- Read this guide thoroughly
- Check ASSIGNMENT.md for general guidelines
- Review CONTRIBUTING.md for detailed processes
- Look at README.md for project overview

**2. Search for Similar Issues**
- Check "Common Issues and Solutions" section above
- Search GitHub Issues for similar problems
- Look at closed PRs for examples

**3. Ask Your Team**
- Post in group chat/WhatsApp
- Tag specific members who might know
- Share screenshots of errors
- Describe what you've already tried

**4. Contact Leadership**

| Role | Name | When to Contact |
|------|------|----------------|
| **Project Lead** | Suleiman Abdulkadir | Overall coordination, major decisions, conflicts |
| **Repository Manager** | Usman Dayyabu Usman | Repository access, permissions, technical setup |
| **Maintainer** | Abdulhalim Muhammad Yaro | Code quality, PR issues, review questions |

**5. Ask Your Assigned Reviewers**
- They're responsible for reviewing your work
- They can help with questions about your assignment
- Tag them in PR comments

### How to Ask for Help Effectively

**Bad way:**
> "It's not working. Help!"

**Good way:**
> "I'm trying to push my branch but getting this error: [paste error]. I've already tried [what you tried]. My setup: [your OS, Git version]. Can someone help?"

**Include:**
- What you're trying to do
- What error you're getting (exact message)
- What you've already tried
- Your environment (OS, Git version, etc.)
- Screenshots if relevant

### Common Questions

**Q: What if I can't access the repository?**  
A: Make sure you've forked it first. You can't push directly to the main repository.

**Q: What if the source repository is updated?**  
A: Pull the latest changes: `cd source-code && git pull origin main`

**Q: Can I add extra files not in my assignment?**  
A: Stick to your assigned files. Extra contributions should be in a separate PR after discussing with the team.

**Q: What if my PR has conflicts?**  
A: See "Issue 2: Merge Conflicts" in the Common Issues section above.

**Q: How long should I wait for reviews?**  
A: Give reviewers 24-48 hours. If no response, ping them in PR comments or group chat.

**Q: What if I disagree with review feedback?**  
A: Discuss politely in the PR comments. Explain your reasoning. If you can't agree, ask the Maintainer or Project Lead to mediate.

**Q: Can I work on multiple features?**  
A: Complete your assigned contribution first. Additional work should be coordinated with the team.

**Q: What if I make a mistake after creating the PR?**  
A: You can push additional commits to the same branch. They'll automatically appear in the PR.

**Q: What if I accidentally committed to main?**  
A: See "Issue 4: Forgot to Create a Branch" in the Common Issues section.

**Q: What if tests fail in my PR?**  
A: Don't worry! You're just copying files. If tests fail, it might be an integration issue that will be fixed when all PRs are merged.

### Emergency Contacts

If you have urgent issues:

1. **Group Chat:** Post in the team WhatsApp/Telegram group
2. **GitHub:** Create an issue with the `help wanted` label
3. **Email:** Contact the Project Lead or Repository Manager
4. **Office Hours:** Check if the course tutor has office hours

### Resources

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **Git Cheat Sheet:** https://education.github.com/git-cheat-sheet-education.pdf
- **Markdown Guide:** https://www.markdownguide.org/
- **Conventional Commits:** https://www.conventionalcommits.org/

---

## Important Reminders

### DO's

1. Always work on a feature branch (never directly on main)
2. Follow the exact file structure in your assignment
3. Write clear commit messages following conventions
4. Review your assigned teammates' PRs thoroughly
5. Respond to review feedback promptly and politely
6. Test locally before pushing (if possible)
7. Ask for help when stuck
8. Communicate with your team regularly
9. Document your work for the project report
10. Be patient with the review process

### DON'Ts

1. Don't commit directly to main branch
2. Don't merge your own PR (only tutor can merge)
3. Don't copy files not assigned to you without discussion
4. Don't ignore review comments
5. Don't force push unless absolutely necessary
6. Don't commit sensitive files (.env, passwords, API keys)
7. Don't plagiarize or copy code without attribution
8. Don't work in isolation - communicate with team
9. Don't leave PRs unreviewed - review your assigned PRs
10. Don't panic - mistakes can be fixed!

### Remember

- **This is a learning experience** - mistakes are okay
- **Collaboration is key** - help each other
- **Communication matters** - ask questions, share updates
- **Quality over speed** - take time to do it right
- **Everyone contributes** - balanced participation is required
- **Have fun!** - Enjoy learning Git and GitHub

---

## Final Checklist Before Submission

### Individual Checklist

- [ ] My PR has been created and submitted
- [ ] My PR has been reviewed by 2 teammates
- [ ] I have reviewed 2 other PRs
- [ ] I have addressed all review feedback
- [ ] My PR has been approved
- [ ] I have documented my contribution statistics
- [ ] I have screenshots of my PR and reviews
- [ ] I understand what I contributed

### Team Checklist

- [ ] All 10 members have submitted PRs
- [ ] All PRs have been reviewed
- [ ] All PRs have been approved
- [ ] Tutor has merged all PRs
- [ ] Application runs without errors
- [ ] All tests pass
- [ ] Minimum 5 issues created
- [ ] CI/CD pipeline is working
- [ ] All documentation is complete
- [ ] Project report is ready (5-8 pages)
- [ ] Contribution statistics compiled
- [ ] Repository link shared with tutor

---

**Good luck with your contributions!**

Remember: Every commit counts towards your grade. Take your time, follow the instructions, ask for help when needed, and most importantly - learn from the experience!

**This is your chance to practice real-world open-source development. Make it count!**

---

*Last Updated: February 2026*  
*Guide Version: 1.0*
