"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, ChevronDown, X, Check, Star, GitFork, Users } from "lucide-react"
import { useState, useEffect } from "react"
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
    image: "/githubmeta.png",
    frameworks: ["Next.js", "Tailwind CSS", "React"],
    contracts: ["Donate"],
    createdAt: "2024-02-14",
    blockchain: ["NEAR"],
    soon: true,
    display: false,
    githubUrl: "https://github.com/PotLock/donate-script",
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
    soon: false,
    display: false,
    githubUrl: "https://github.com/PotLock/potlock-nextjs-app",
  },
  {
    id: 3,
    title: "Donation Linktree",
    description: "NEAR Social Linktree with relevant donation modal",
    image: "/linktreemeta.png",
    frameworks: ["Next.js", "Tailwind CSS", "Shadcn/UI"],
    contracts: ["Donate"],
    createdAt: "2024-05-14",
    blockchain: ["NEAR"],
    soon: true,
    display: false,
    githubUrl: "https://github.com/PotLock/potlock-nextjs-app",
  },
  {
    id: 4,
    title: "Project Feeds",
    description: "Configure social feed based on previous lists",
    image: "/feedmeta.png",
    frameworks: ["Next.js"],
    contracts: ["Social.near"],
    createdAt: "2024-05-14",
    blockchain: ["NEAR"],
    soon: true,
    display: false,
    githubUrl: "https://github.com/PotLock/potlock-nextjs-app",
  },
  {
    id: 5,
    title: "Nadabot Stamps",
    description: "Configure social feed based on previous lists",
    image: "/nadabotmeta.png",
    frameworks: ["Next.js"],
    contracts: ["Nadabot", "Social.near"],
    createdAt: "2024-10-07",
    blockchain: ["NEAR"],
    soon: true,
    display: false,
    githubUrl: "https://github.com/PotLock/nadabot-app",
  },
  {
    id: 6,
    title: "Potlock Bitte Agent",
    description: "Configure social feed based on previous lists",
    image: "/bittemeta.jpg",
    frameworks: ["Next.js"],
    contracts: ["Donate"],
    createdAt: "2024-10-07",
    blockchain: ["NEAR"],
    soon: true,
    display: true,
    githubUrl: "https://github.com/PotLock/potlock-agent-mintbase",
  },

  {
    id: 4,
    title: "BOS App Whitelabel",
    description: "Whitelabel version of the BOS App for Potlock",
    image: "/bosmeta.webp",
    frameworks: ["Next.js", "BOS"],
    contracts: ["Pot", "Lists", "Social.near"],
    createdAt: "2024-05-14",
    blockchain: ["NEAR"],
    soon: true,
    display: false,
    githubUrl: "https://github.com/PotLock/bos-app",
  }
]

export default function IndexPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([])
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([])
  const [selectedContracts, setSelectedContracts] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "mostStars" | "leastStars" | "mostForks" | "leastForks">("newest")
  const [showSoonOnly, setShowSoonOnly] = useState(false)
  const [repoStats, setRepoStats] = useState<{ [key: string]: { stars: number, forks: number, contributors: number } }>({})

  const allFrameworks = Array.from(new Set(featuredTemplates.flatMap(t => t.frameworks)))
  const allBlockchains = Array.from(new Set(featuredTemplates.flatMap(t => t.blockchain)))
  const allContracts = Array.from(new Set(featuredTemplates.flatMap(t => t.contracts)))

  useEffect(() => {
    fetchRepoStats()
  }, [])

  const fetchRepoStats = async () => {
    const stats: { [key: string]: { stars: number, forks: number, contributors: number } } = {}
    for (const template of featuredTemplates) {
      if (template.githubUrl) {
        try {
          const repoPath = new URL(template.githubUrl).pathname.slice(1)
          const response = await fetch(`https://api.github.com/repos/${repoPath}`)
          const contributorsResponse = await fetch(`https://api.github.com/repos/${repoPath}/contributors?per_page=1`)
          if (response.ok && contributorsResponse.ok) {
            const data = await response.json()
            const contributorsCount = parseInt(contributorsResponse.headers.get('Link')?.match(/page=(\d+)>; rel="last"/)?.[1] || '1')
            stats[template.id] = {
              stars: data.stargazers_count,
              forks: data.forks_count,
              contributors: contributorsCount
            }
          }
        } catch (error) {
          console.error(`Error fetching repo stats for ${template.title}:`, error)
        }
      }
    }
    setRepoStats(stats)
  }

  const filteredTemplates = featuredTemplates.filter(template => {
    const matchesSearch = searchTerm === "" || 
                          template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFrameworks = selectedFrameworks.length === 0 || 
                              selectedFrameworks.every(f => template.frameworks.includes(f))
    const matchesBlockchains = selectedBlockchains.length === 0 || 
                               selectedBlockchains.every(b => template.blockchain.includes(b))
    const matchesContracts = selectedContracts.length === 0 ||
                             selectedContracts.every(c => template.contracts.includes(c))
    const matchesSoonStatus = !showSoonOnly || template.soon === true

    return matchesSearch && matchesFrameworks && matchesBlockchains && matchesContracts && matchesSoonStatus
  })

  const availableFrameworks = Array.from(new Set(filteredTemplates.flatMap(t => t.frameworks)))
  const availableBlockchains = Array.from(new Set(filteredTemplates.flatMap(t => t.blockchain)))
  const availableContracts = Array.from(new Set(filteredTemplates.flatMap(t => t.contracts)))

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedFrameworks([])
    setSelectedBlockchains([])
    setSelectedContracts([])
    setShowSoonOnly(false)
  }

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "mostStars":
        return (repoStats[b.id]?.stars || 0) - (repoStats[a.id]?.stars || 0);
      case "leastStars":
        return (repoStats[a.id]?.stars || 0) - (repoStats[b.id]?.stars || 0);
      case "mostForks":
        return (repoStats[b.id]?.forks || 0) - (repoStats[a.id]?.forks || 0);
      case "leastForks":
        return (repoStats[a.id]?.forks || 0) - (repoStats[b.id]?.forks || 0);
      default:
        return 0;
    }
  });

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
                  <DropdownMenuItem onClick={() => setSortOrder("mostStars")}>
                    Most Stars {sortOrder === "mostStars" && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("leastStars")}>
                    Least Stars {sortOrder === "leastStars" && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("mostForks")}>
                    Most Forks {sortOrder === "mostForks" && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("leastForks")}>
                    Least Forks {sortOrder === "leastForks" && <Check className="ml-2 h-4 w-4" />}
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="soon-toggle"
                  checked={showSoonOnly}
                  onCheckedChange={(checked) => setShowSoonOnly(checked as boolean)}
                />
                <label
                  htmlFor="soon-toggle"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Show Soon Only
                </label>
              </div>
            </div>
            <div className="w-3/4 grid justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
              {sortedTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 relative">
                    <Image
                      src={template.image}
                      alt={template.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-48 rounded"
                    />
                    {template.soon && (
                      <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                        Soon
                      </div>
                    )}
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
                      {template.githubUrl && repoStats[template.id] && (
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{repoStats[template.id].stars}</span>
                          </div>
                          <div className="flex items-center">
                            <GitFork className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm font-medium">{repoStats[template.id].forks}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm font-medium">{repoStats[template.id].contributors}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 border-t">
                  <Link 
                      href={template.githubUrl} 
                      target="_blank"
                      className={buttonVariants({ 
                        variant: "outline",
                        className: "w-full justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                      })}
                    >
                      View Template <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    {/* <Link 
                      href={`/templates/${template.id}`} 
                      className={buttonVariants({ 
                        variant: "outline",
                        className: "w-full justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                      })}
                    >
                      View Template <ArrowRight className="ml-2 h-4 w-4" />
                    </Link> */}
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