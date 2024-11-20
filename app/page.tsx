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
			weights: true,
		},
	});
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
									<CardTitle>Weight Range</CardTitle>
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
		</div>
	);
}
