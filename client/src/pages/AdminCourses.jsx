import { useState } from 'react'
import CoursesTable from '../components/CoursesTable.jsx'
import { PlusIcon } from '../constants/icons.jsx'
import levels from '../constants/levels.js'
import useAdminCourses from '../hooks/useAdminCourses.js'

const initialForm = {
  courseCode: '',
  courseName: '',
  semester: '1',
  creditUnit: '2',
  level: levels[0],
}

function AdminCourses() {
  const { courses, loading, status, createCourse } = useAdminCourses()
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = {
      courseCode: form.courseCode.trim(),
      courseName: form.courseName.trim(),
      semester: Number(form.semester),
      creditUnit: Number(form.creditUnit),
      level: form.level,
    }

    const result = await createCourse(payload)
    if (result.ok) {
      setForm(initialForm)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          Courses
        </p>
        <h1 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
          Course catalog
        </h1>
        <p className="text-sm text-slate-500">
          Manage the courses students can register for.
        </p>
      </header>

      <section className="grid gap-6 rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-soft md:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Add course
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Add new course details to the catalog.
          </p>
          <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Course code
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-accent-400 focus:outline-none focus:ring-4 focus:ring-accent-100"
                name="courseCode"
                value={form.courseCode}
                onChange={handleChange}
                placeholder="CSC 101"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Course title
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-accent-400 focus:outline-none focus:ring-4 focus:ring-accent-100"
                name="courseName"
                value={form.courseName}
                onChange={handleChange}
                placeholder="Introduction to Computer Science"
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Semester
                </label>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-accent-400 focus:outline-none focus:ring-4 focus:ring-accent-100"
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Credit unit
                </label>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-accent-400 focus:outline-none focus:ring-4 focus:ring-accent-100"
                  name="creditUnit"
                  value={form.creditUnit}
                  onChange={handleChange}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Level
                </label>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-accent-400 focus:outline-none focus:ring-4 focus:ring-accent-100"
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {status ? (
              <div
                className={`rounded-2xl px-4 py-3 text-xs ${
                  status.type === 'error'
                    ? 'bg-rose-50 text-rose-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {status.message}
              </div>
            ) : null}

            <button
              className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
              type="submit"
              disabled={loading}
            >
              <PlusIcon className="h-4 w-4" />
              {loading ? 'Adding course...' : 'Add course'}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Course tips
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>Use unique course codes (e.g., CSC 201).</li>
            <li>Match the level to the student year.</li>
            <li>Credit units can be 2 or 3.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6">
        <CoursesTable title="All courses" courses={courses} />
      </section>
    </div>
  )
}

export default AdminCourses
