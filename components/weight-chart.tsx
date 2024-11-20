"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

interface WeightChartProps {
	weights: {
		weight: number;
		date: Date;
		id: string;
		createdAt: Date;
		updatedAt: Date;
		petId: string;
	}[];
	chartTitle?: string;
	description?: string;
	trendingPercentage?: number;
}

const defaultChartConfig: ChartConfig = {
	weight: {
		label: "Weight",
		color: "hsl(var(--chart-1))",
	},
};

export function WeightChart({
	weights,
	chartTitle = "Pet Weight Chart",
	description = "Weight over time (kg)",
}: WeightChartProps) {
	// Transforming the weights array for recharts
	const chartData = weights
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date
		.map((entry) => ({
			weight: entry.weight,
			date: entry.date.toISOString().split("T")[0], // Format date to 'YYYY-MM-DD'
		}));

	return (
		<Card className="w-full h-64">
			<CardHeader>
				<CardTitle>{chartTitle}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="h-64 w-full">
				<ChartContainer className="h-32 w-full" config={defaultChartConfig}>
					<LineChart
						data={chartData}
						margin={{
							left: 12,
							right: 12,
							top: 16,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) =>
								new Date(value).toLocaleDateString("en-US", {
									month: "short",
									year: "numeric",
								})
							}
						/>
						<YAxis
							label={{
								value: "Weight kg",
								angle: -90,
								position: "insideLeft",
							}}
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Line
							dataKey="weight"
							type="natural"
							stroke="var(--color-weight)"
							strokeWidth={2}
							dot={{
								fill: "var(--color-weight)",
							}}
							activeDot={{
								r: 6,
							}}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
