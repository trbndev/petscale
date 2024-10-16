import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { WeightChart } from "@/components/weight-chart";
import { prisma } from "@/lib/prisma";

export default async function Home() {
	const pets = await prisma.pet.findMany();
	const users = await prisma.user.findMany();
	const weights = await prisma.weight.findMany();

	return (
		<div className="flex flex-col gap-4">
			<WeightChart
				weights={weights}
				chartTitle="My Pet's Weight"
				description="Last 6 months"
				trendingPercentage={4.8}
			/>
			<Card>
				<CardHeader>
					<CardTitle>Users</CardTitle>
					<CardDescription>raw data</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="whitespace-pre-wrap">{JSON.stringify(users)}</pre>
				</CardContent>
			</Card>
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
		</div>
	);
}
