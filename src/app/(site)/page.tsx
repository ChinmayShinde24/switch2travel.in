import { CategoryRail } from "@/components/home/category-rail"
import { HeroSection } from "@/components/home/hero-section"
import { connectDB } from "@/lib/db"
import {
  listActiveCategories,
  toRailCategory,
} from "@/lib/category-server"

export default async function HomePage() {
  await connectDB()
  const categories = (await listActiveCategories()).map(toRailCategory)

  return (
    <>
      <HeroSection />
      <CategoryRail categories={categories} />
    </>
  )
}
