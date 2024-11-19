import { calculateStats } from "@/app/page";

function testCalculateStats() {
	// Test 1: Keine Gewichte vorhanden
	let weights: {
		weight: number;
		id: string;
		createdAt: Date;
		updatedAt: Date;
		date: Date;
		petId: string;
	}[] = [];
	let result = calculateStats(weights);
	console.log(
		"Test 1:",
		result.min === 0 &&
			result.max === 0 &&
			result.avg === 0 &&
			result.variation === 0 &&
			result.recommendation === "No data available"
			? "Passed"
			: "Failed",
	);

	// Test 2: Ein Gewicht
	weights = [
		{
			weight: 5,
			id: "1",
			createdAt: new Date(),
			updatedAt: new Date(),
			date: new Date(),
			petId: "pet1",
		},
	];
	result = calculateStats(weights);
	console.log(
		"Test 2:",
		result.min === 5 &&
			result.max === 5 &&
			result.avg === 5 &&
			result.variation === 0 &&
			result.recommendation === "Maintain the current trend."
			? "Passed"
			: "Failed",
	);

	// Test 3: Mehrere Gewichte mit kleiner Variation
	weights = [
		{
			weight: 4,
			id: "1",
			createdAt: new Date(),
			updatedAt: new Date(),
			date: new Date(),
			petId: "pet1",
		},
		{
			weight: 5,
			id: "2",
			createdAt: new Date(),
			updatedAt: new Date(),
			date: new Date(),
			petId: "pet1",
		},
		{
			weight: 6,
			id: "3",
			createdAt: new Date(),
			updatedAt: new Date(),
			date: new Date(),
			petId: "pet1",
		},
	];
	result = calculateStats(weights);
	console.log(
		"Test 3:",
		result.min === 4 &&
			result.max === 6 &&
			result.avg === 5 &&
			result.variation === 2 &&
			result.recommendation === "Maintain the current trend."
			? "Passed"
			: "Failed",
	);

	// Test 4: Mehrere Gewichte mit hoher Variation
	weights = [
		{
			weight: 2,
			id: "1",
			createdAt: new Date(),
			updatedAt: new Date(),
			date: new Date(),
			petId: "pet1",
		},
		{
			weight: 7,
			id: "2",
			createdAt: new Date(),
			updatedAt: new Date(),
			date: new Date(),
			petId: "pet1",
		},
	];
	result = calculateStats(weights);
	console.log(
		"Test 4:",
		result.min === 2 &&
			result.max === 7 &&
			result.avg === 4.5 &&
			result.variation === 5 &&
			result.recommendation ===
				"Monitor closely; high weight fluctuations detected."
			? "Passed"
			: "Failed",
	);

	// Test 5: Durchschnitt nahe am Minimum
	weights = [
		{
			weight: 3,
			id: "1",
			createdAt: new Date(),
			updatedAt: new Date(),
			date: new Date(),
			petId: "pet1",
		},
		{
			weight: 4,
			id: "2",
			createdAt: new Date(),
			updatedAt: new Date(),
			date: new Date(),
			petId: "pet1",
		},
	];
	result = calculateStats(weights);
	console.log(
		"Test 5:",
		result.min === 3 &&
			result.max === 4 &&
			result.avg === 3.5 &&
			result.variation === 1 &&
			result.recommendation === "Consider increasing the pet's nutrition."
			? "Passed"
			: "Failed",
	);
}

// Run the tests
testCalculateStats();
