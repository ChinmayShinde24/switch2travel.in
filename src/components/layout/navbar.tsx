import { NavbarAdminLink } from "@/components/layout/navbar-admin-link"
import { NavbarCallUs } from "@/components/layout/navbar-call-us"
import { NavbarLinks } from "@/components/layout/navbar-links"
import { NavbarLogo } from "@/components/layout/navbar-logo"
import { NavbarMobile } from "@/components/layout/navbar-mobile"
import { NavbarProfile } from "@/components/layout/navbar-profile"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/55">
      <div className="page-padding-x relative flex h-16 w-full items-center justify-between md:h-[4.5rem]">
        <NavbarLogo />

        <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <NavbarLinks />
        </div>

        <div className="flex items-center gap-3">
          <NavbarCallUs />
          <NavbarAdminLink />
          <NavbarMobile />
          <NavbarProfile />
        </div>
      </div>
    </header>
  )
}
