import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string
}

export const Input = ({ type, ...props }: InputProps) => {

    return <input {...props} type={type} 
    className="input" />
}