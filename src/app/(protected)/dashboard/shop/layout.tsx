export default function ShopLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
	return (
		<>
			{children}
			{modal}
		</>
	);
}
