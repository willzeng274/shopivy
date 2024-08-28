'use client';

import { useContext } from "react";
import { useFormStatus } from "react-dom";
import { FormCtx } from "./frmCtx";

export default function FormBtn({ children, afterSubmit = false, ...props } : React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    afterSubmit?: boolean
}) {
    const { pending } = useFormStatus();

    const submitted = useContext(FormCtx);
    
    return (
        <button
            {...props}
            disabled={afterSubmit ? pending || submitted : pending}
        >
            {children}
        </button>
    );
}