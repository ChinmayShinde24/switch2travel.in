import { cn } from "@/lib/utils"

function BentoCell({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bento-cell"
      className={cn(
        "rounded-2xl border border-border/80 bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { BentoCell }
