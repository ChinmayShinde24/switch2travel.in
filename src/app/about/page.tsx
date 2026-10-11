import { BentoCell } from "@/components/bento/bento-cell"

export default function AboutPage() {
  return (
    <BentoCell className="flex flex-1 flex-col justify-center px-6 py-16 md:px-10">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-3 text-muted-foreground">
        Learn more about Switch2Travel.
      </p>
    </BentoCell>
  )
}
