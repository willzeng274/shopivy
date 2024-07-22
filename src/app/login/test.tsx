'use client';

interface TestProps {
    testSession: () => Promise<void>,
    removeTestSession: () => Promise<void>
}

export default function Test({
    testSession,
    removeTestSession
}: TestProps) {
	return (
		<>
			<button onClick={() => testSession()}>Test Session</button>
			<button onClick={() => removeTestSession()}>Remove Test Session</button>
		</>
	);
}
