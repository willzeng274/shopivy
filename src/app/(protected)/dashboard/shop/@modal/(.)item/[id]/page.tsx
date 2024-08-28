import { Dialog, DialogOverlay } from "@/components/ui/Dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import Portal from "./portal";
import Close from "./close";

export default function Item({
    params
}: {
    params: {
        id: string
    }
}) {
	return (
		<Dialog defaultOpen>
			<Portal>
				<DialogOverlay />
				<DialogContent
					className={
						"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
					}
				>
					<h1>item {params.id} 🤡</h1>
                    <p>you already saw everything my guy</p>
					<Close />
				</DialogContent>
			</Portal>
		</Dialog>
	);
}
