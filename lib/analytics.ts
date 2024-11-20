export interface Weight {
	weight: number;
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	date?: Date;
	petId?: string;
}

export function calculateStats(weights: Weight[]) {
	if (!weights.length)
		return {
			min: 0,
			max: 0,
			avg: 0,
			variation: 0,
			recommendation: "No data available",
		};

	const values = weights.map((w) => w.weight);
	const min = Math.min(...values);
	const max = Math.max(...values);
	const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
	const variation = max - min;

	let recommendation = "Maintain the current trend.";
	if (variation > 5) {
		recommendation = "Monitor closely; high weight fluctuations detected.";
	} else if (avg <= min + 1 && variation > 2) {
		recommendation = "Consider increasing the pet's nutrition.";
	} else if (avg >= max - 1 && variation > 1) {
		recommendation = "Consider reducing the pet's nutrition.";
	}

	return { min, max, avg, variation, recommendation };
}
