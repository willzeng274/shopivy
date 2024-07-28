"use client";

import { motion } from "framer-motion";

interface IClient {
    children?: React.ReactNode;
}

export default function Client({ children }: IClient) {
    return (
        <motion.div>
            {children}
        </motion.div>
    );
}