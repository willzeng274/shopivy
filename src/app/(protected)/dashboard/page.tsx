

export default function Page() {
	return (
		<main className="w-full p-6 bg-gradient-to-br from-purple-100 to-pink-100">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome back, Student!</h2>

			<section className="mb-8">
				<h3 className="text-xl font-semibold text-gray-700 mb-4">Featured Deals</h3>
				<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
					<h4 className="text-2xl font-bold mb-2">Summer Sale!</h4>
					<p className="mb-4">Get 20% off on all textbooks and study materials.</p>
					<button className="bg-white text-purple-600 hover:bg-gray-100 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
						Shop Now
					</button>
				</div>
			</section>

			<section className="mb-8">
				<h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Purchases</h3>
				<div className="space-y-4">
					{[
						{ name: "Introduction to Psychology Textbook", date: "2023-05-15", price: "$59.99" },
						{ name: "Wireless Noise-Cancelling Headphones", date: "2023-05-10", price: "$149.99" },
						{ name: "1-Month Subscription to Online Tutoring", date: "2023-05-05", price: "$29.99" },
					].map((item, index) => (
						<div key={index} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
							<div>
								<h4 className="font-semibold text-gray-800">{item.name}</h4>
								<p className="text-sm text-gray-500">Purchased on {item.date}</p>
							</div>
							<p className="font-semibold text-green-600">{item.price}</p>
						</div>
					))}
				</div>
			</section>

			<section>
				<h3 className="text-xl font-semibold text-gray-700 mb-4">Recommended for You</h3>
				<div className="flex space-x-4 overflow-x-auto pb-4 max-w-full">
					{[
						{ name: "Scientific Calculator", price: "$24.99", color: "bg-pink-100" },
						{ name: "Ergonomic Desk Chair", price: "$129.99", color: "bg-blue-100" },
						{ name: "Annual Planner", price: "$19.99", color: "bg-green-100" },
						{ name: "Laptop Stand", price: "$34.99", color: "bg-yellow-100" },
					].map((item, index) => (
						<div key={index} className={`flex-shrink-0 w-64 ${item.color} rounded-lg shadow-md p-4`}>
							<div className="w-full h-32 bg-gray-300 rounded-md mb-4"></div>
							<h4 className="font-semibold text-gray-800">{item.name}</h4>
							<p className="text-sm text-gray-600 mb-2">{item.price}</p>
							<button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
								Add to Cart
							</button>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}