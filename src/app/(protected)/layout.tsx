import { Suspense } from "react";
import LoadUI from "./LoadUI";
import FadeOut from "./FadeOut";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const ui = <LoadUI />
	return (
		<Suspense
			fallback={
				<div className="absolute w-full h-full">
					{ui}
				</div>
			}
		>
			<FadeOut>
				{ui}
            </FadeOut>
			{children}
		</Suspense>
	);
}
