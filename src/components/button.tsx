import { ButtonHTMLAttributes, ReactNode } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export const Button = ({children, className, ...props} : ButtonProps) => {

    return <button {...props} className={`bg-primary text-white px-4 py-2 rounded-lg hover:brightness-90 w-full ${className}`}>
        {children}
    </button>
}