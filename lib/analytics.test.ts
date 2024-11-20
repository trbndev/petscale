import { describe, expect, it } from "vitest";
import { calculateStats } from "./analytics";

describe("calculateStats", () => {
	it("should return default values when weights array is empty", () => {
		const result = calculateStats([]);
		expect(result).toEqual({
			min: 0,
			max: 0,
			avg: 0,
			variation: 0,
			recommendation: "No data available",
		});
	});

	it("should calculate correct stats for a single weight", () => {
		const result = calculateStats([{ weight: 10 }]);
		expect(result).toEqual({
			min: 10,
			max: 10,
			avg: 10,
			variation: 0,
			recommendation: "Maintain the current trend.",
		});
	});

	it("should calculate correct stats for multiple weights", () => {
		const result = calculateStats([
			{ weight: 5 },
			{ weight: 10 },
			{ weight: 15 },
		]);
		expect(result).toEqual(
			expect.objectContaining({
				min: 5,
				max: 15,
				avg: 10,
				variation: 10,
			}),
		);
	});

	it("should calculate stats ignoring recommendation when avg is close to min", () => {
		const result = calculateStats([
			{ weight: 10 },
			{ weight: 11 },
			{ weight: 12 },
		]);
		expect(result).toEqual(
			expect.objectContaining({
				min: 10,
				max: 12,
				avg: 11,
				variation: 2,
			}),
		);
	});

	it("should calculate stats ignoring recommendation when avg is close to max", () => {
		const result = calculateStats([
			{ weight: 10 },
			{ weight: 12 },
			{ weight: 13 },
		]);
		expect(result).toEqual(
			expect.objectContaining({
				min: 10,
				max: 13,
				avg: 11.666666666666666,
				variation: 3,
			}),
		);
	});

	it("should calculate stats ignoring recommendation for moderate weight variations", () => {
		const result = calculateStats([
			{ weight: 8 },
			{ weight: 9 },
			{ weight: 10 },
		]);
		expect(result).toEqual(
			expect.objectContaining({
				min: 8,
				max: 10,
				avg: 9,
				variation: 2,
			}),
		);
	});
});
