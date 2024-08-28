export default function Item({
    params
}: {
    params: {
        id: string
    }
}) {
	return <>item {params.id}</>;
}
