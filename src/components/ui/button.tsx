import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:shadow-[0_0_28px_rgba(0,229,255,0.6)]",
        secondary:
          "bg-slate-900 border border-slate-700/80 text-slate-200 hover:bg-slate-800/90 hover:text-white hover:border-cyan-500/40",
        outline:
          "border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-950/50 hover:border-cyan-400",
        ghost:
          "text-slate-300 hover:bg-slate-800/60 hover:text-white",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-900/30",
        glow:
          "relative overflow-hidden bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.5)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base tracking-wide",
        icon: "h-10 w-10 p-0",
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
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
