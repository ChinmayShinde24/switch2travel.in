import { cn } from "@/lib/utils"

type TripRichHtmlProps = {
  html: string
  className?: string
  emptyMessage?: string
}

/** Renders TipTap / admin HTML for public trip sections. */
export function TripRichHtml({
  html,
  className,
  emptyMessage = "Details coming soon.",
}: TripRichHtmlProps) {
  const content = html?.trim()
  if (!content) {
    return (
      <p className="font-lato text-sm text-slate-500">{emptyMessage}</p>
    )
  }

  return (
    <div
      className={cn(
        "font-lato trip-rich-html text-[0.95rem] leading-relaxed text-slate-600",
        "[&_h1]:font-display [&_h2]:font-display [&_h3]:font-display",
        "[&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-slate-900",
        "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900",
        "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-900",
        "[&_p:not(:last-child)]:mb-3",
        "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5",
        "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5",
        "[&_strong]:font-semibold [&_strong]:text-slate-800",
        "[&_a]:text-sky-700 [&_a]:underline [&_a]:underline-offset-2",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
