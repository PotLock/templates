"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, ChevronDown, X, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"

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
    title: "Potlock Github Actions Donation Agent",
    description: "Develop a donation agent triggered based on Github Actions",
    image: "/openfundingstack.png",
    frameworks: ["Next.js", "Tailwind CSS", "React"],
    contracts: ["Donate"],
    createdAt: "2024-02-14",
    blockchain: ["NEAR"],
  },
  {
    id: 2,
    title: "On-Chain Directory",
    description: "Leverage social profiles to create ecosystem registry",
    image: "/openfundingstack.png",
    contracts: ["Lists"],
    frameworks: ["Next.js", "Tailwind CSS", "Shadcn/UI"],
    createdAt: "2024-03-14",
    blockchain: ["NEAR"],
  },
  {
    id: 3,
    title: "Donation Linktree",
    description: "NEAR Social Linktree with relevant donation modal",
    image: "/openfundingstack.png",
    frameworks: ["Next.js", "Tailwind CSS", "Shadcn/UI"],
    contracts: ["Donate"],
    createdAt: "2024-05-14",
    blockchain: ["NEAR"],
  },
  {
    id: 4,
    title: "BOS App Whitelabel",
    description: "Whitelabel version of the BOS App for Potlock",
    image: "/openfundingstack.png",
    frameworks: ["Next.js", "BOS"],
    contracts: ["Pot", "Lists"],
    createdAt: "2024-05-14",
    blockchain: ["NEAR"],
  }
]

export default function IndexPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([])
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([])
  const [selectedContracts, setSelectedContracts] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  const allFrameworks = Array.from(new Set(featuredTemplates.flatMap(t => t.frameworks)))
  const allBlockchains = Array.from(new Set(featuredTemplates.flatMap(t => t.blockchain)))
  const allContracts = Array.from(new Set(featuredTemplates.flatMap(t => t.contracts)))

  const filteredTemplates = featuredTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFrameworks = selectedFrameworks.length === 0 || 
                              selectedFrameworks.every(f => template.frameworks.includes(f))
    const matchesBlockchains = selectedBlockchains.length === 0 || 
                               selectedBlockchains.every(b => template.blockchain.includes(b))
    const matchesContracts = selectedContracts.length === 0 ||
                             selectedContracts.every(c => template.contracts.includes(c))
    return matchesSearch && matchesFrameworks && matchesBlockchains && matchesContracts
  })

  const availableFrameworks = Array.from(new Set(filteredTemplates.flatMap(t => t.frameworks)))
  const availableBlockchains = Array.from(new Set(filteredTemplates.flatMap(t => t.blockchain)))
  const availableContracts = Array.from(new Set(filteredTemplates.flatMap(t => t.contracts)))

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedFrameworks([])
    setSelectedBlockchains([])
    setSelectedContracts([])
  }

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-lora text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              POTLOCK Templates
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Discover and deploy boilerplate example projects for easy development on top of the open funding stack.
            </p>
          </div>
        </section>
        <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <div className="w-full flex items-center space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    Sort by <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                    Newest First {sortOrder === "newest" && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
                    Oldest First {sortOrder === "oldest" && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="flex items-center"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="w-1/4">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="frameworks">
                  <AccordionTrigger>Frameworks</AccordionTrigger>
                  <AccordionContent>
                    {allFrameworks.map((framework) => (
                      <div key={framework} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`framework-${framework.replace(/\s+/g, '-').toLowerCase()}`}
                          checked={selectedFrameworks.includes(framework)}
                          onCheckedChange={(checked) => {
                            setSelectedFrameworks(
                              checked
                                ? [...selectedFrameworks, framework]
                                : selectedFrameworks.filter((f) => f !== framework)
                            )
                          }}
                          disabled={!availableFrameworks.includes(framework)}
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor={`framework-${framework.replace(/\s+/g, '-').toLowerCase()}`}
                          className={`text-sm font-medium leading-none ${!availableFrameworks.includes(framework) ? 'text-gray-400' : 'hover:text-blue-600 cursor-pointer'}`}
                        >
                          {framework}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="blockchains">
                  <AccordionTrigger>Blockchains</AccordionTrigger>
                  <AccordionContent>
                    {allBlockchains.map((blockchain) => (
                      <div key={blockchain} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`blockchain-${blockchain.replace(/\s+/g, '-').toLowerCase()}`}
                          checked={selectedBlockchains.includes(blockchain)}
                          onCheckedChange={(checked) => {
                            setSelectedBlockchains(
                              checked
                                ? [...selectedBlockchains, blockchain]
                                : selectedBlockchains.filter((b) => b !== blockchain)
                            )
                          }}
                          disabled={!availableBlockchains.includes(blockchain)}
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor={`blockchain-${blockchain.replace(/\s+/g, '-').toLowerCase()}`}
                          className={`text-sm font-medium leading-none ${!availableBlockchains.includes(blockchain) ? 'text-gray-400' : 'hover:text-purple-600 cursor-pointer'}`}
                        >
                          {blockchain}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="contracts">
                  <AccordionTrigger>Contracts</AccordionTrigger>
                  <AccordionContent>
                    {allContracts.map((contract) => (
                      <div key={contract} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`contract-${contract.replace(/\s+/g, '-').toLowerCase()}`}
                          checked={selectedContracts.includes(contract)}
                          onCheckedChange={(checked) => {
                            setSelectedContracts(
                              checked
                                ? [...selectedContracts, contract]
                                : selectedContracts.filter((c) => c !== contract)
                            )
                          }}
                          disabled={!availableContracts.includes(contract)}
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor={`contract-${contract.replace(/\s+/g, '-').toLowerCase()}`}
                          className={`text-sm font-medium leading-none ${!availableContracts.includes(contract) ? 'text-gray-400' : 'hover:text-green-600 cursor-pointer'}`}
                        >
                          {contract}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="w-3/4 grid justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
              {sortedTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4">
                    <Image
                      src={template.image}
                      alt={template.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-48 rounded"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {template.frameworks.map((framework) => (
                          <span key={framework} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {framework}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {template.contracts.map((contract) => (
                          <span key={contract} className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {contract}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {template.blockchain.map((chain) => (
                          <span key={chain} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                            {chain}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <Link 
                      href={`/templates/${template.id}`} 
                      className={buttonVariants({ 
                        variant: "outline",
                        className: "w-full justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                      })}
                    >
                      View Template <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {sortedTemplates.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-gray-500">No templates found matching your criteria.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}