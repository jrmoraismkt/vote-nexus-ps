import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const psButtonVariants = cva(
  "relative inline-flex items-center justify-center font-bold transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-ps-blue to-ps-cyan text-white",
          "shadow-[0_0_20px_rgba(59,130,246,0.5)]",
          "hover:shadow-[0_0_30px_rgba(59,130,246,0.8),0_0_60px_rgba(6,182,212,0.4)]",
          "hover:scale-105",
          "border-2 border-ps-cyan/50",
        ],
        secondary: [
          "bg-gradient-to-r from-ps-purple to-secondary text-white",
          "shadow-[0_0_20px_rgba(168,85,247,0.5)]",
          "hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]",
          "hover:scale-105",
          "border-2 border-ps-purple/50",
        ],
        glass: [
          "glass-morphism text-foreground",
          "hover:bg-white/10",
          "border-2 border-white/20",
        ],
        danger: [
          "bg-gradient-to-r from-red-500 to-red-600 text-white",
          "shadow-[0_0_20px_rgba(239,68,68,0.5)]",
          "hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]",
          "hover:scale-105",
        ],
      },
      size: {
        sm: "px-6 py-2 text-sm rounded-lg",
        md: "px-8 py-3 text-base rounded-xl",
        lg: "px-12 py-4 text-lg rounded-2xl",
        xl: "px-16 py-6 text-2xl rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface PsButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof psButtonVariants> {}

const PsButton = forwardRef<HTMLButtonElement, PsButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(psButtonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>
    );
  }
);

PsButton.displayName = "PsButton";

export { PsButton, psButtonVariants };
