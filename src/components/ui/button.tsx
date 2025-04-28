
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#3498DB] text-white hover:bg-[#3498DB]/90",
        destructive: "bg-[#E74C3C] text-white hover:bg-[#E74C3C]/90",
        outline: "border border-[#BDC3C7] bg-[#ECF0F1] text-[#2C3E50] hover:bg-[#ECF0F1]/80",
        secondary: "bg-[#ECF0F1] text-[#2C3E50] hover:bg-[#ECF0F1]/80",
        ghost: "hover:bg-[#ECF0F1] hover:text-[#2C3E50]",
        link: "text-[#3498DB] underline-offset-4 hover:underline",
        success: "bg-[#27AE60] text-white hover:bg-[#27AE60]/90",
        warning: "bg-[#F39C12] text-white hover:bg-[#F39C12]/90",
        filter: "bg-[#ECF0F1] text-[#7F8C8D] hover:bg-[#ECF0F1]/80 border border-[#BDC3C7]",
        inactive: "bg-[#BDC3C7] text-[#7F8C8D] cursor-default",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 py-2",
        lg: "h-11 rounded-md px-8 py-2.5",
        icon: "h-10 w-10",
        pill: "h-9 px-5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
