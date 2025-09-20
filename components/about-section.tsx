import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Zap } from "lucide-react"

export function AboutSection() {
  const skills = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Backend Development",
      description: "Node.js, Python, PostgreSQL, MongoDB",
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "UI/UX Design",
      description: "Figma, Adobe Creative Suite, Responsive Design",
    },
  ]

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            I'm a passionate full-stack developer with 5+ years of experience creating digital solutions that make a
            difference. I love combining technical expertise with creative problem-solving to build applications that
            users love.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Started as a curious student who fell in love with coding, I've evolved into a versatile developer who
              thrives on learning new technologies and solving complex challenges.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new frameworks, contributing to open source projects, or
              mentoring aspiring developers in my community.
            </p>
          </div>
          <div>
            <img src="/developer-workspace-with-multiple-monitors-and-cod.jpg" alt="Developer workspace" className="rounded-lg shadow-lg w-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">{skill.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
