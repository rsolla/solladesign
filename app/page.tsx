"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Mail, ExternalLink, Menu, Globe, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const translations = {
  "pt-BR": {
    nav: {
      about: "Sobre",
      skills: "Habilidades",
      portfolio: "Portfólio",
      contact: "Contato",
    },
    hero: {
      greeting: "Olá, eu sou",
      title: "Designer Gráfico & UI Designer",
      subtitle: "Criando experiências visuais únicas e memoráveis através do design inovador",
      cta: "Ver Meu Trabalho",
      contactMe: "Entre em Contato",
    },
    about: {
      title: "Sobre Mim",
      description:
        "Sou um designer apaixonado por criar soluções visuais que conectam marcas com pessoas. Com experiência em design gráfico, UI e identidade visual, transformo ideias em realidade através do poder do design.",
      badges: [
        "3+ Anos de Experiência",
        "50+ Projetos de UI",
        "Designer Certificado"
      ]
    },
    skills: {
      title: "Minhas Habilidades",
      subtitle: "Ferramentas e competências que domino",
    },
    portfolio: {
      title: "Portfólio",
      subtitle: "Alguns dos meus trabalhos recentes",
      viewProject: "Ver Projeto",
      viewMore: "Ver Mais no Behance",
      items: {
        labesc: {
          title: "Labesc",
          category: "ID Visual",
          description: "Identidade visual completa para laboratório Escola da faculdade Unifil"
        },
        alice: {
          title: "Capa de livro - Alice in Wonderland",
          category: "Editorial",
          description: "Redesign editorial de capa do livro Alice in Wonderland"
        },
        chatlab: {
          title: "Chatlab",
          category: "ID Visual",
          description: "Identidade visual para o sistema de chat para suporte."
        }
      }
    },
    contact: {
      title: "Vamos Trabalhar Juntos",
      subtitle: "Pronto para dar vida ao seu próximo projeto?",
      cta: "Enviar Email",
    },
  },
  "en-US": {
    nav: {
      about: "About",
      skills: "Skills",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Graphic Designer & UI",
      subtitle: "Creating unique and memorable visual experiences through innovative design",
      cta: "View My Work",
      contactMe: "Contact Me",
    },
    about: {
      title: "About Me",
      description:
        "I'm a designer passionate about creating visual solutions that connect brands with people. With experience in graphic design, UI and visual identity, I transform ideas into reality through the power of design.",
      badges: [
        "3+ Years of Experience",
        "50+ UI Projects",
        "Certified Designer"
      ]
    },
    skills: {
      title: "My Skills",
      subtitle: "Tools and competencies I master",
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Some of my recent work",
      viewProject: "View Project",
      viewMore: "View More on Behance",
      items: {
        labesc: {
          title: "Labesc",
          category: "Visual ID",
          description: "Complete visual identity for the Unifil School Lab"
        },
        alice: {
          title: "Book Cover - Alice in Wonderland",
          category: "Editorial",
          description: "Editorial redesign of the Alice in Wonderland book cover"
        },
        chatlab: {
          title: "Chatlab",
          category: "Visual ID",
          description: "Visual identity for the support chat system."
        }
      }
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Ready to bring your next project to life?",
      cta: "Send Email",
    },
  },
}

const skills = [
  { name: "Figma", level: 75 },
  { name: "Photoshop", level: 90 },
  { name: "Illustrator", level: 85 },
  { name: "UI Design", level: 80 },
  { name: "ID Visual", level: 85 },
]

// Componente de progresso circular
const CircularProgress = ({
  percentage,
  isVisible,
  delay = 0,
}: { percentage: number; isVisible: boolean; delay?: number }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const radius = 45
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, percentage, delay])

  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  return (
    <div className="relative w-32 h-32">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#c4ff00"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">{Math.round(animatedPercentage)}%</span>
      </div>
    </div>
  )
}

export default function SollaDesign() {
  const [isDark, setIsDark] = useState(false)
  const [language, setLanguage] = useState<"pt-BR" | "en-US">("pt-BR")
  const [skillsVisible, setSkillsVisible] = useState(false)

  const t = translations[language]

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === "skills") {
            setSkillsVisible(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    const skillsSection = document.getElementById("skills")
    if (skillsSection) {
      observer.observe(skillsSection)
    }

    return () => observer.disconnect()
  }, [])

  const handleContactClick = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=contato@solladesign.com.br",
      "_blank"
    )
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleLanguage = () => {
    setLanguage(language === "pt-BR" ? "en-US" : "pt-BR")
  }

  // Array de projetos com chave, imagem e url
  const portfolioProjects = [
    {
      key: "labesc",
      image: "/placeholder.svg",
      url: "https://www.behance.net/gallery/198182671/Projeto-Labesc"
    },
    {
      key: "alice",
      image: "/placeholder.svg",
      url: "https://www.behance.net/gallery/160098689/Identidade-Visual-ChatLab"
    },
    {
      key: "chatlab",
      image: "/placeholder.svg",
      url: "https://www.behance.net/gallery/160098689/Identidade-Visual-ChatLab"
    },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark" : ""}`}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-[#000e4a] dark:text-[#c4ff00]">Solla Design</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-[#c4ff00] transition-colors text-[#000e4a] dark:text-white font-medium"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="hover:text-[#c4ff00] transition-colors text-[#000e4a] dark:text-white font-medium"
            >
              {t.nav.skills}
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="hover:text-[#c4ff00] transition-colors text-[#000e4a] dark:text-white font-medium"
            >
              {t.nav.portfolio}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[#c4ff00] transition-colors text-[#000e4a] dark:text-white font-medium"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle Button */}
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="gap-2 border-2 border-[#000e4a] text-[#000e4a] hover:bg-[#c4ff00] hover:border-[#c4ff00] hover:text-[#000e4a] dark:border-[#c4ff00] dark:text-[#c4ff00] dark:hover:bg-[#c4ff00] dark:hover:text-[#000e4a] font-semibold transition-all duration-300 bg-transparent"
            >
              <Globe className="h-4 w-4" />
              {language === "pt-BR" ? "EN" : "PT"}
            </Button>

            {/* Improved Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`relative p-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 ${
                isDark
                  ? "bg-[#000e4a] border-[#c4ff00] hover:bg-[#c4ff00] hover:border-[#000e4a]"
                  : "bg-[#c4ff00] border-[#000e4a] hover:bg-[#000e4a] hover:border-[#c4ff00]"
              }`}
            >
              {isDark ? (
                <Sun
                  className={`h-5 w-5 transition-colors duration-300 ${isDark ? "text-[#c4ff00] hover:text-[#000e4a]" : ""}`}
                />
              ) : (
                <Moon
                  className={`h-5 w-5 transition-colors duration-300 ${!isDark ? "text-[#000e4a] hover:text-[#c4ff00]" : ""}`}
                />
              )}
            </button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-[#000e4a] dark:text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-left hover:text-[#c4ff00] transition-colors font-medium"
                  >
                    {t.nav.about}
                  </button>
                  <button
                    onClick={() => scrollToSection("skills")}
                    className="text-left hover:text-[#c4ff00] transition-colors font-medium"
                  >
                    {t.nav.skills}
                  </button>
                  <button
                    onClick={() => scrollToSection("portfolio")}
                    className="text-left hover:text-[#c4ff00] transition-colors font-medium"
                  >
                    {t.nav.portfolio}
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-left hover:text-[#c4ff00] transition-colors font-medium"
                  >
                    {t.nav.contact}
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-white to-gray-50 dark:from-[#000e4a] dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{t.hero.greeting}</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-[#000e4a] dark:text-[#c4ff00]">Rafael Solla</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">{t.hero.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{t.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("portfolio")}
                size="lg"
                className="bg-[#c4ff00] hover:bg-[#a8d600] text-[#000e4a] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.hero.cta}
              </Button>
              <Button
                onClick={handleContactClick}
                variant="outline"
                size="lg"
                className="gap-2 border-2 border-[#000e4a] text-[#000e4a] hover:bg-[#000e4a] hover:text-white dark:border-[#c4ff00] dark:text-[#c4ff00] dark:hover:bg-[#c4ff00] dark:hover:text-[#000e4a] bg-transparent font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
                {t.hero.contactMe}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Photo */}
      <section id="about" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#c4ff00] dark:border-[#c4ff00]">
                    <img
                      src="/me-pic.svg"
                      alt="Rafael Solla"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#c4ff00] rounded-full opacity-20"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#000e4a] dark:bg-[#c4ff00] rounded-full opacity-30"></div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold mb-6 text-[#000e4a] dark:text-[#c4ff00]">{t.about.title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t.about.description}</p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Badge className="bg-[#c4ff00] text-[#000e4a] hover:bg-[#a8d600] px-4 py-2 text-sm font-semibold">
                    {t.about.badges[0]}
                  </Badge>
                  <Badge
                    className="
                      bg-white text-[#000e4a]
                      hover:bg-gray-100 hover:text-[#000e4a]
                      dark:bg-white dark:text-[#000e4a]
                      dark:hover:bg-[#c4ff00] dark:hover:text-[#000e4a]
                      px-4 py-2 text-sm font-semibold
                    "
                  >
                    {t.about.badges[1]}
                  </Badge>
                  <Badge className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200 px-4 py-2 text-sm font-semibold">
                    {t.about.badges[2]}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#000e4a] dark:text-[#c4ff00]">{t.skills.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{t.skills.subtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
              {skills.map((skill, index) => (
                <div key={skill.name} className="flex flex-col items-center space-y-4">
                  <CircularProgress percentage={skill.level} isVisible={skillsVisible} delay={index * 200} />
                  <h3 className="text-lg font-semibold text-[#000e4a] dark:text-white text-center">{skill.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Improved Portfolio Section */}
      <section id="portfolio" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#000e4a] dark:text-[#c4ff00]">{t.portfolio.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{t.portfolio.subtitle}</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioProjects.map((project, index) => {
                const item = t.portfolio.items[project.key]
                return (
                  <Card
                    key={index}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-lg bg-white dark:bg-gray-800"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={item.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge className="bg-[#c4ff00] text-[#000e4a] font-semibold">{item.category}</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <Button
                          size="sm"
                          className="bg-[#c4ff00] hover:bg-[#a8d600] text-[#000e4a] font-semibold w-full"
                          onClick={() => window.open(project.url, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t.portfolio.viewProject}
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#000e4a] dark:text-white mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <Button
              onClick={() => window.open("https://www.behance.net/sollamartins", "_blank")}
              size="lg"
              className="gap-3 bg-[#c4ff00] hover:bg-[#a8d600] text-[#000e4a] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ExternalLink className="h-5 w-5" />
              {t.portfolio.viewMore}
            </Button>          
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-[#000e4a]"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-[#000e4a] dark:text-[#c4ff00]">{t.contact.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{t.contact.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleContactClick}
                size="lg"
                className="bg-[#c4ff00] hover:bg-[#a8d600] text-[#000e4a] font-semibold gap-2 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
              >
                <Mail className="h-6 w-6" />
                {t.contact.cta}
              </Button>
              <Button
                onClick={() => window.open("https://www.linkedin.com/in/rafaelsolla", "_blank")}
                size="lg"
                className="bg-[#c4ff00] hover:bg-[#a8d600] text-[#000e4a] font-semibold gap-2 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
              >
                <Linkedin className="h-6 w-6" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}      <footer className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">        
          <p className="text-gray-600 dark:text-gray-300">
            © 2025 Solla Design. {language === "pt-BR" ? "Todos os direitos reservados." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  )
}
