import { cn } from "@/lib/utils"

function BentoGrid({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-grid"
      className={cn("grid gap-2 md:gap-3", className)}
      {...props}
    />
  )
}

export { BentoGrid }
