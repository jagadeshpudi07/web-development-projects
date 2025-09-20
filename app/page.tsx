import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { TodoApp } from "@/components/todo-app"
import { ProductShowcase } from "@/components/product-showcase"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TodoApp />
      <ProductShowcase />
    </main>
  )
}
