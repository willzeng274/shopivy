"use client";

import { Button, ButtonProps } from "@/components/ui/Button";
import { CartItemFormat } from "@/utils/state";
import { MinusIcon, PlusIcon } from "lucide-react";
import { decrementAction, incrementAction, inputAction } from "../actions";
import { startTransition, useEffect, useState } from "react";
// import { useAuthStore } from "@/utils/stores/authStore";
import { useFormStatus } from "react-dom";
import { useUser } from "@/utils/stores/userCtx";
import { useQuantEdit, useQuantItem, useQuantStore } from "../quantStore";

export default function Quantity({ item }: { item: CartItemFormat }) {
	const user = useUser();
	// const [quantity, setQuantity] = useState(item.quantity);
	const quantity = useQuantItem(item.id, item.quantity);
	const setQuantity = useQuantEdit(item.id);

	return (
		<>
			<form
				action={async function () {
					const qt = await decrementAction(item.id, quantity);
					setQuantity(qt);
				}}
			>
				<FormBtn
					variant="ghost"
					size="sm"
					aria-label="Decrease quantity"
					className="h-8 w-8 p-0 disabled:cursor-not-allowed hover:bg-gray-200"
					disabled={quantity <= 1}
				>
					<MinusIcon className="h-3 w-3" />
				</FormBtn>
			</form>
			<QuantityInput item={item} quantity={quantity} setQuantity={setQuantity} />
			<form
				action={async function () {
					if (!user) return;
					const qt = await incrementAction(item.id, quantity);
					setQuantity(qt);
				}}
			>
				<FormBtn
					variant="ghost"
					size="sm"
					aria-label="Increase quantity"
					className="h-8 w-8 p-0 disabled:cursor-not-allowed hover:bg-gray-200"
					disabled={quantity >= 9999}
				>
					<PlusIcon className="h-3 w-3" />
				</FormBtn>
			</form>
		</>
	);
}

function FormBtn({ children, ...props }: ButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button {...props} disabled={pending || props.disabled}>
			{children}
		</Button>
	);
}

interface QuantityInputProps {
	quantity: number;
	setQuantity: (value: number) => void;
	item: CartItemFormat;
}

function QuantityInput({ item, quantity, setQuantity }: QuantityInputProps) {
	const user = useUser();
	const [inputValue, setInputValue] = useState(quantity.toString());

	useEffect(() => {
		setInputValue(quantity.toString());
	}, [quantity]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			updateQuantity(e.currentTarget.value);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		updateQuantity(e.currentTarget.value);
	};

	const updateQuantity = (value: string) => {
		const parsedValue = parseInt(value, 10);
		// console.log("update quant", parsedValue);
		if (!isNaN(parsedValue)) {
			startTransition(async () => {
				const qt = await inputAction(item.id, parsedValue);
				setQuantity(qt);
			});
		} else {
			setInputValue(quantity.toString());
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// because the user sohuld be able to enter when it's blank
		if (!e.target.value) return setInputValue("");

		let value = +e.target.value;

		value = Math.min(9999, Math.max(1, value));

		setInputValue(value.toString());
	};

	return (
		<input
			className="w-10 text-center text-sm bg-transparent py-1 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			value={inputValue}
			type="number"
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}
		/>
	);
}
