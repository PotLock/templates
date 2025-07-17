"use client"
import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
// Change this import
import { MobileLink } from "./mobile-link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetRoot,
} from "./ui/sheet"
import { Logo } from "./logo"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="flex items-center justify-between w-full">
      <Link href="/" className="flex items-center">
        <Logo className="h-full w-auto max-h-12" />
        {/* <span className="inline-block font-bold">🫕 {siteConfig.name}</span> */}
      </Link>
      <SheetRoot onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            className="px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4">
            {items?.map((item, index) => (
              <MobileLink
                key={index}
                href={item.href ?? '#'}
                onOpenChange={setIsOpen}
                className="text-muted-foreground"
              >
                {item.title}
              </MobileLink>
            ))}
          </nav>
        </SheetContent>
      </SheetRoot>
      {items?.length ? (
        <nav className="hidden md:flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
