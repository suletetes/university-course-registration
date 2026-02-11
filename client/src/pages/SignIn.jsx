import { useState } from 'react'
import { Link } from 'react-router-dom'
import FieldInput from '../components/FieldInput.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  UserIcon,
} from '../constants/icons.jsx'

function SignIn() {
  const heroImage =
    'https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&w=1200&q=80'
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AuthLayout heroImage={heroImage} badgeText="Spring intake opens Feb 20" badgePill="12 seats left">
      <div className="space-y-7">
        <div className="fade-up text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            CourseReg
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-slate-900 md:text-4xl">
            Welcome back
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Sign in to manage your courses, schedules, and updates.
          </p>
        </div>

        <form
          className="fade-up delay-3 flex flex-col items-center space-y-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <FieldInput icon={<UserIcon />} placeholder="Full name" type="text" />

          <FieldInput
            icon={<LockIcon />}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            onToggle={() => setShowPassword((value) => !value)}
            toggleLabel="Toggle password visibility"
            value={showPassword ? <EyeOffIcon /> : <EyeIcon />}
          />

          <div className="flex w-2/3 flex-col items-center gap-3 text-center text-xs text-slate-500 sm:flex-row sm:justify-between">
            <label className="flex items-center gap-2">
              <input
                className="h-4 w-4 rounded border-slate-300 text-accent-500 focus:ring-accent-200"
                type="checkbox"
              />
              Remember me
            </label>
            <a className="font-medium text-slate-700 hover:text-accent-500" href="#">
              Forgot password?
            </a>
          </div>

          <PrimaryButton>Sign in</PrimaryButton>

          <p className="text-center text-xs text-slate-500">
            Don&apos;t have an account?{' '}
            <Link className="font-semibold text-slate-800 hover:text-accent-500" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignIn
