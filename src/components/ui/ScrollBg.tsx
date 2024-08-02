"use client";

import { cn } from "@/utils/cn";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState, type ComponentPropsWithoutRef, type ElementType, type PropsWithChildren } from "react";

type PolymorphicAsProp<E extends ElementType> = {
	as?: E;
};

type PolymorphicProps<E extends ElementType> = PropsWithChildren<ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>>;

const defaultElement = "div";

type BoxProps<E extends ElementType = typeof defaultElement> = PolymorphicProps<E>;

export default function ScrollBg<E extends ElementType = typeof defaultElement>({ as, children, className, ...restProps }: BoxProps<E>) {
	const Component = as ?? defaultElement;

	const { scrollY } = useScroll();

    const [showBg, setShowBg] = useState<boolean>(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest > 30) {
            setShowBg(true);
        } else {
            setShowBg(false);
        }
	});

    useEffect(() => {
        console.log("bg changed", showBg);
    }, [showBg]);

	return (
		<Component {...restProps} className={cn(className, {
            'bg-black/55': showBg
        })}>
			{children}
		</Component>
	);
}
