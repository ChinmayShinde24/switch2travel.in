import Image from "next/image"
import Link from "next/link"
import { CityTripLink } from "@/components/city-trip-link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Facebook02Icon,
  InstagramIcon,
  Mail01Icon,
  PhoneCallIcon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons"
import {
  SITE_CONTACT_NAME,
  SITE_CONTACT_ROLE,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_FACEBOOK_HREF,
  SITE_HOURS,
  SITE_INSTAGRAM_HREF,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/site-contact"

const COMPANY_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/trips", label: "All destinations" },
  { href: "/contact", label: "Plan a trip" },
] as const

const REGION_LINKS = [
  { href: "/trips?city=himachal", label: "Himachal" },
  { href: "/trips?city=kashmir", label: "Kashmir" },
  { href: "/trips?city=ladakh", label: "Ladakh" },
  { href: "/trips?city=uttarakhand", label: "Uttarakhand" },
  { href: "/trips?city=rajasthan", label: "Rajasthan" },
  { href: "/trips?city=kerala", label: "Kerala" },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto border-t border-sky-100 bg-sky-50/80 text-slate-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(14,165,233,0.12),transparent_48%),radial-gradient(ellipse_at_90%_100%,rgba(56,189,248,0.08),transparent_42%)]"
      />

      <div className="page-padding-x relative py-12 sm:py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Switch2Travel home"
              className="inline-flex outline-none focus-visible:ring-[3px] focus-visible:ring-sky-400/50"
            >
              <Image
                src="/final.png"
                alt="Switch2Travel — Travel made easier"
                width={168}
                height={84}
                className="h-11 w-auto object-contain sm:h-12"
              />
            </Link>
            <p className="font-lato mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Flip a switch and you are on your way. India holidays with clear
              prices, region-first routes, and a desk that stays reachable.
            </p>
            <p className="font-open-sans mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                strokeWidth={1.75}
                className="size-3.5 shrink-0 text-sky-600"
              />
              Secure payments · UPI, cards, netbanking
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={SITE_INSTAGRAM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Switch2Travel on Instagram"
                className="inline-flex size-10 items-center justify-center rounded-full border border-sky-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700"
              >
                <HugeiconsIcon icon={InstagramIcon} strokeWidth={1.75} className="size-5" />
              </a>
              <a
                href={SITE_FACEBOOK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Switch2Travel on Facebook"
                className="inline-flex size-10 items-center justify-center rounded-full border border-sky-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700"
              >
                <HugeiconsIcon icon={Facebook02Icon} strokeWidth={1.75} className="size-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-sm font-medium tracking-tight text-slate-600 transition-colors hover:text-sky-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h3 className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
              Popular regions
            </h3>
            <ul className="mt-4 space-y-2.5">
              {REGION_LINKS.map((link) => (
                <li key={link.href}>
                  <CityTripLink
                    href={link.href}
                    className="font-display text-sm font-medium tracking-tight text-slate-600 transition-colors hover:text-sky-700"
                  >
                    {link.label}
                  </CityTripLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
              Talk to us
            </h3>
            <p className="font-display mt-4 text-base font-semibold tracking-tight text-slate-900">
              {SITE_CONTACT_NAME}
            </p>
            <p className="font-open-sans mt-1 text-[11px] font-semibold tracking-[0.14em] text-sky-700 uppercase">
              {SITE_CONTACT_ROLE}
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={SITE_PHONE_TEL}
                  className="font-lato inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-sky-700"
                >
                  <HugeiconsIcon
                    icon={PhoneCallIcon}
                    strokeWidth={1.75}
                    className="size-3.5 text-sky-600"
                  />
                  {SITE_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={SITE_EMAIL_HREF}
                  className="font-lato inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-sky-700"
                >
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    strokeWidth={1.75}
                    className="size-3.5 text-sky-600"
                  />
                  {SITE_EMAIL}
                </a>
              </li>
            </ul>
            <p className="font-lato mt-3 text-xs text-slate-500">{SITE_HOURS}</p>
            <p className="font-lato mt-1 text-xs text-slate-500">
              Pan-India departures
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sky-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-lato text-xs text-slate-500">
            © {year} Switch2Travel. All rights reserved.
          </p>
          <p className="font-open-sans text-[10px] font-semibold tracking-[0.18em] text-sky-700/70 uppercase">
            Travel made easier
          </p>
        </div>
      </div>
    </footer>
  )
}
