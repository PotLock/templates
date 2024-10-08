"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search } from "lucide-react"
import { useState } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Sample data for featured templates
const featuredTemplates = [
  {
    id: 1,
    title: "Next.js Blog",
    description: "A statically generated blog example using Next.js and Markdown",
    image: "/placeholder.svg?height=400&width=600",
    frameworks: ["Next.js", "Tailwind CSS", "React"],
    blockchain: ["NEAR"],
  },
  {
    id: 2,
    title: "Next.js E-commerce",
    description: "A fully-functional e-commerce website built with Next.js and Stripe",
    image: "/placeholder.svg?height=400&width=600",
    frameworks: ["Next.js", "Tailwind CSS", "Shadcn/UI"],
    blockchain: ["NEAR"],
  },
  {
    id: 3,
    title: "Next.js Portfolio",
    description: "A clean, minimalist portfolio template for developers",
    image: "/placeholder.svg?height=400&width=600",
    frameworks: ["Next.js", "Tailwind CSS", "Shadcn/UI"],
    blockchain: ["NEAR"],
  },
  {
    id: 3,
    title: "Next.js Portfolio",
    description: "A clean, minimalist portfolio template for developers",
    image: "/placeholder.svg?height=400&width=600",
    frameworks: ["Next.js", "Tailwind CSS", "Shadcn/UI"],blockchain: ["NEAR"],
  }
]

export default function IndexPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFrameworks, setSelectedFrameworks] = useState([])
  const [selectedBlockchains, setSelectedBlockchains] = useState([])

  const allFrameworks = [...new Set(featuredTemplates.flatMap(t => t.frameworks))]
  const allBlockchains = [...new Set(featuredTemplates.flatMap(t => t.blockchain))]

  const filteredTemplates = featuredTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFrameworks = selectedFrameworks.length === 0 || 
                              selectedFrameworks.every(f => template.frameworks.includes(f))
    const matchesBlockchains = selectedBlockchains.length === 0 || 
                               selectedBlockchains.every(b => template.blockchain.includes(b))
    return matchesSearch && matchesFrameworks && matchesBlockchains
  })

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Potlock Templates
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Discover and deploy boilerplate example Next.js projects for easy deployment of open funding stack.
            </p>
            <div className="space-x-4">
              <Link href="/templates" className={buttonVariants({ size: "lg" })}>
                Browse Templates
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                GitHub
              </Link>
            </div>
          </div>
        </section>
        <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Featured Templates
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Explore our curated selection of popular templates to kickstart your next project.
            </p>
          </div>
          <div className="flex gap-8">
            <div className="w-1/4">
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="frameworks">
                  <AccordionTrigger>Frameworks</AccordionTrigger>
                  <AccordionContent>
                    {allFrameworks.map((framework) => (
                      <div key={framework} className="flex items-center space-x-2">
                        <Checkbox
                          id={`framework-${framework}`}
                          checked={selectedFrameworks.includes(framework)}
                          onCheckedChange={(checked) => {
                            setSelectedFrameworks(
                              checked
                                ? [...selectedFrameworks, framework]
                                : selectedFrameworks.filter((f) => f !== framework)
                            )
                          }}
                        />
                        <label htmlFor={`framework-${framework}`}>{framework}</label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="blockchains">
                  <AccordionTrigger>Blockchains</AccordionTrigger>
                  <AccordionContent>
                    {allBlockchains.map((blockchain) => (
                      <div key={blockchain} className="flex items-center space-x-2">
                        <Checkbox
                          id={`blockchain-${blockchain}`}
                          checked={selectedBlockchains.includes(blockchain)}
                          onCheckedChange={(checked) => {
                            setSelectedBlockchains(
                              checked
                                ? [...selectedBlockchains, blockchain]
                                : selectedBlockchains.filter((b) => b !== blockchain)
                            )
                          }}
                        />
                        <label htmlFor={`blockchain-${blockchain}`}>{blockchain}</label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="w-3/4 grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4">
                    <Image
                      src={template.image}
                      alt={template.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-48"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{template.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{template.description}</p>
                  </div>
                  <div className="p-4 border-t">
                    <Link href={`/templates/${template.id}`} className={buttonVariants({ variant: "outline" })}>
                      View Template <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
