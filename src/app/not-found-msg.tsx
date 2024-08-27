"use client";

import { useState } from "react";

export default function NotFoundMsg({ isWaterloo, children }: { isWaterloo: 0 | 1, children: React.ReactNode }) {
    const [isOver, setIsOver] = useState(false);
    return (
        <p className="text-3xl font-semibold text-gray-700 mb-8" onMouseOver={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>{isWaterloo ? isOver ? "Deferred to Geomatics 😱" : children : children}</p>
    );
}