import { useCallback, useEffect, useState } from 'react'
import api from '../lib/api.js'

function useAdminCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    setStatus(null)
    try {
      const response = await api.get('/admin/courses')
      setCourses(response.data.data || [])
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.response?.data?.message || 'Failed to load courses list.',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const createCourse = async (payload) => {
    setLoading(true)
    setStatus(null)
    try {
      const response = await api.post('/admin/courses', payload)
      setCourses((prev) => [response.data.data, ...prev])
      setStatus({ type: 'success', message: response.data.message })
      return { ok: true }
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.response?.data?.message || 'Failed to create course.',
      })
      return { ok: false }
    } finally {
      setLoading(false)
    }
  }

  return {
    courses,
    loading,
    status,
    refresh: fetchCourses,
    createCourse,
  }
}

export default useAdminCourses
