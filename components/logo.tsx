"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function Logo({ className }: { className?: string }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const logoSrc = theme === "dark" ? "/logowhite.png" : "/logo.png"

  return (
    <img
      src={logoSrc}
      alt="Potlock"
      className={className}
    />
  )
}
