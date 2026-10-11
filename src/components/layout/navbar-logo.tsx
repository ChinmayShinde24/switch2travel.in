import Image from "next/image"
import Link from "next/link"

export function NavbarLogo() {
  return (
    <Link
      href="/"
      aria-label="Switch2Travel home"
      className="relative z-10 flex shrink-0 items-center outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Image
        src="/final.png"
        alt="Switch2Travel — Travel made easier"
        width={160}
        height={80}
        priority
        className="h-11 w-auto object-contain md:h-12"
      />
    </Link>
  )
}
