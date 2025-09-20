"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary">Portfolio</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline gap-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("todo-app")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Todo App
              </button>
              <button
                onClick={() => scrollToSection("product-showcase")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2">
              <button
                onClick={() => scrollToSection("about")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 w-full text-left"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("todo-app")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 w-full text-left"
              >
                Todo App
              </button>
              <button
                onClick={() => scrollToSection("product-showcase")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 w-full text-left"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 w-full text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
