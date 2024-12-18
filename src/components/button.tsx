import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, ReactNode } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
}

export const Button = ({children, className, ...props} : ButtonProps) => {

    return <button {...props} className={cn('text-white px-4 py-2 rounded-lg hover:brightness-90 w-full bg-primary', className)}>
        {children}
    </button>
}