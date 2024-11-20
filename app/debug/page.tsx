import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function DebugPage() {
	const pets = await prisma.pet.findMany({
		include: {
			weights: true, // Include weights for each pet
		},
	});
	const users = await prisma.user.findMany();
	const weights = await prisma.weight.findMany();
	return (
		<div className="flex flex-col gap-4">
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
