"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/utils/cn";
import { AnimatedBeam } from "@/components/ui/AnimatedBeam";
import { ShoppingCartIcon } from "lucide-react";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(({ className, children }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
				className
			)}
		>
			{children}
		</div>
	);
});

export function AIBeam(props: React.HTMLAttributes<HTMLDivElement>) {
	const containerRef = useRef<HTMLDivElement>(null);
	const div1Ref = useRef<HTMLDivElement>(null);
	const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);

	return (
		<div
			{...props}
			className={cn("relative flex w-full items-center justify-center overflow-hidden", props.className)}
			ref={containerRef}
		>
			<div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
				<div className="flex flex-row justify-between">
					<Circle ref={div1Ref}>
						<Icons.user />
					</Circle>
					<Circle ref={div2Ref}>
                        <Icons.cart />
					</Circle>
                    <Circle ref={div3Ref}>
                        <Icons.cohere />
                    </Circle>
				</div>
			</div>

			<AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div2Ref} startYOffset={10} endYOffset={10} curvature={-20} />
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div1Ref}
				toRef={div2Ref}
				startYOffset={-10}
				endYOffset={-10}
				curvature={20}
				reverse
			/>
            <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div3Ref} startYOffset={10} endYOffset={10} curvature={-20} />
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div2Ref}
				toRef={div3Ref}
				startYOffset={-10}
				endYOffset={-10}
				curvature={20}
				reverse
			/>
		</div>
	);
}

const Icons = {
	openai: () => (
		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
		</svg>
	),
	cohere: () => (
		<svg width="24" height="24" viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M24.3 44.7c2 0 6-.1 11.6-2.4 6.5-2.7 19.3-7.5 28.6-12.5 6.5-3.5 9.3-8.1 9.3-14.3C73.8 7 66.9 0 58.3 0h-36C10 0 0 10 0 22.3s9.4 22.4 24.3 22.4z"
				fillRule="evenodd"
                clipRule="evenodd"
                fill="#39594d"
			/>
			<path
				d="M30.4 60c0-6 3.6-11.5 9.2-13.8l11.3-4.7C62.4 36.8 75 45.2 75 57.6 75 67.2 67.2 75 57.6 75H45.3c-8.2 0-14.9-6.7-14.9-15z"
				fillRule="evenodd"
                clipRule="evenodd"
                fill="#d18ee2"
			/>
			<path
				d="M12.9 47.6C5.8 47.6 0 53.4 0 60.5v1.7C0 69.2 5.8 75 12.9 75c7.1 0 12.9-5.8 12.9-12.9v-1.7c-.1-7-5.8-12.8-12.9-12.8z"
                fill="#ff7759"
			/>
		</svg>
	),
	user: () => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	),
    cart: ShoppingCartIcon
};
