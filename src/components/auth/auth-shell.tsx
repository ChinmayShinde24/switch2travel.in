import Image from "next/image"
import Link from "next/link"

const AUTH_HERO_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80"

type AuthShellProps = {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden lg:block">
        <Image
          src={AUTH_HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/25" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white xl:p-14">
          <Link
            href="/"
            aria-label="Switch2Travel home"
            className="inline-flex w-fit items-center"
          >
            <Image
              src="/final.png"
              alt="Switch2Travel — Travel made easier"
              width={160}
              height={80}
              priority
              className="h-12 w-auto object-contain xl:h-14"
            />
          </Link>

          <div className="max-w-lg">
            <span className="font-open-sans inline-flex rounded-full bg-sky-600 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-white uppercase">
              India&apos;s social travel community
            </span>
            <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight xl:text-5xl">
              Adventure awaits you
            </h1>
            <p className="font-lato mt-4 text-base leading-relaxed text-white/80">
              Browse trips freely as a guest — create an account only when you
              want saved plans and faster booking.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
              {[
                { value: "120+", label: "Routes" },
                { value: "48", label: "Cities" },
                { value: "4.9", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-open-sans text-[0.65rem] tracking-[0.18em] text-white/55 uppercase">
                    {stat.label}
                  </dt>
                  <dd className="roboto-condensed mt-1 text-2xl font-bold">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </aside>

      <section className="relative flex items-center justify-center bg-[linear-gradient(180deg,#f8fafc_0%,#eef6ff_100%)] px-4 py-10 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link
              href="/"
              aria-label="Switch2Travel home"
              className="inline-flex items-center"
            >
              <Image
                src="/final.png"
                alt="Switch2Travel — Travel made easier"
                width={140}
                height={70}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>
            <Link
              href="/"
              className="font-open-sans text-sm text-sky-700 hover:underline"
            >
              Continue as guest
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h2>
            <p className="font-lato mt-2 text-sm text-sky-700 sm:text-base">
              {subtitle}
            </p>
            <div className="mt-6">{children}</div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="font-open-sans">Secure login</span>
            <span className="font-open-sans">Guest browsing always open</span>
          </div>
        </div>
      </section>
    </div>
  )
}
