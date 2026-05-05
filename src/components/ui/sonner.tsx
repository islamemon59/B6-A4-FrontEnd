"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--error-bg": "color-mix(in oklab, var(--destructive) 16%, white)",
          "--error-text": "var(--foreground)",
          "--error-border": "color-mix(in oklab, var(--destructive) 32%, var(--border))",
          "--success-bg": "color-mix(in oklab, var(--chart-3) 16%, white)",
          "--success-text": "var(--foreground)",
          "--success-border": "color-mix(in oklab, var(--chart-3) 28%, var(--border))",
          "--warning-bg": "color-mix(in oklab, var(--accent) 22%, white)",
          "--warning-text": "var(--foreground)",
          "--warning-border": "color-mix(in oklab, var(--accent) 36%, var(--border))",
          "--info-bg": "color-mix(in oklab, var(--primary) 14%, white)",
          "--info-text": "var(--foreground)",
          "--info-border": "color-mix(in oklab, var(--primary) 26%, var(--border))",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
