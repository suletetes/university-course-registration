function AuthLayout({ children, heroImage, badgeText, badgePill }) {
  return (
    <div className="page-bg min-h-screen w-full text-ink-900">
      <div className="flex min-h-screen w-full items-stretch">
        <div className="grid w-full overflow-hidden bg-white/80 md:grid-cols-[1.05fr_1.2fr]">
          <div className="flex flex-col justify-center bg-white px-7 py-10 md:px-12 md:py-14">
            {children}
          </div>

          <div className="relative min-h-screen">
            <img
              alt="Campus architecture"
              className="h-screen w-full object-cover"
              src={heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            {badgeText ? (
              <div className="absolute bottom-10 left-10 fade-up delay-2 flex flex-wrap items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 shadow-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {badgeText}
                {badgePill ? (
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {badgePill}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
