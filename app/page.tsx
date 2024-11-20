import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { WeightChart } from "@/components/weight-chart";
import { calculateStats } from "@/lib/analytics";
import { prisma } from "@/lib/prisma";

export default async function Home() {
	const pets = await prisma.pet.findMany({
		include: {
			weights: true, // Include weights for each pet
		},
	});
	const users = await prisma.user.findMany();
	const weights = await prisma.weight.findMany();

	return (
		<div className="flex flex-col gap-4">
			{pets.map((pet) => {
				const stats = calculateStats(pet.weights);

				return (
					<div key={pet.id} className="flex flex-col gap-4">
						<h2 className="text-2xl font-semibold">
							{pet.name} - {pet.species}
						</h2>
						<div className="w-full h-64">
							<WeightChart
								weights={pet.weights}
								chartTitle={`${pet.name}'s Weight`}
								description="Weight over time"
							/>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
							<Card>
								<CardHeader>
									<CardTitle>Min Weight</CardTitle>
									<CardDescription>Lowest weight recorded</CardDescription>
								</CardHeader>
								<CardContent>
									<p>{stats.min} kg</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Max Weight</CardTitle>
									<CardDescription>Highest weight recorded</CardDescription>
								</CardHeader>
								<CardContent>
									<p>{stats.max} kg</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Avg Weight</CardTitle>
									<CardDescription>Average weight</CardDescription>
								</CardHeader>
								<CardContent>
									<p>{stats.avg.toFixed(2)} kg</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Weight Variation</CardTitle>
									<CardDescription>
										Difference between max and min
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p>{stats.variation} kg</p>
								</CardContent>
							</Card>
							<Card className="col-span-2 sm:col-span-4">
								<CardHeader>
									<CardTitle>Recommendations</CardTitle>
									<CardDescription>Insights and advice</CardDescription>
								</CardHeader>
								<CardContent>
									<p>{stats.recommendation}</p>
								</CardContent>
							</Card>
						</div>
					</div>
				);
			})}
			<hr />
			<h2 className="text-3xl font-mono font-semibold">Debug data</h2>
			<Card>
				<CardHeader>
					<CardTitle>Pets</CardTitle>
					<CardDescription>raw data</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="whitespace-pre-wrap">{JSON.stringify(pets)}</pre>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Weights</CardTitle>
					<CardDescription>raw data</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="whitespace-pre-wrap">{JSON.stringify(weights)}</pre>
				</CardContent>
			</Card>
			<Card className="opacity-50 border-2 border-dashed border-yellow-500">
				<CardHeader>
					<CardTitle>Users (deprecated)</CardTitle>
					<CardDescription>raw data</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="whitespace-pre-wrap">{JSON.stringify(users)}</pre>
				</CardContent>
			</Card>
		</div>
	);
}
