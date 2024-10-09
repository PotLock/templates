import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"

export interface MobileLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  onOpenChange?: (open: boolean) => void
}

export function MobileLink({ href, onOpenChange, ...props }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      {...props}
    />
  )
}
