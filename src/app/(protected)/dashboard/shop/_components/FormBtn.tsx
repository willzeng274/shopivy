'use client';

import { useFormStatus } from "react-dom";

export default function FormBtn({ children, ...props } : React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const { pending } = useFormStatus();
    
    return (
        <button
            {...props}
            disabled={pending}
        >
            {children}
        </button>
    );
}