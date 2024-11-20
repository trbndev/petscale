import { prisma } from "@/lib/prisma";

interface WeightParams {
	params: {
		weightId: string;
	};
}

interface UpdateWeightBody {
	weight: number;
	date: Date;
}

export async function PUT(request: Request, { params }: WeightParams) {
	const body = (await request.json()) as UpdateWeightBody;
	const weightId = params.weightId;

	try {
		// Update the weight entry
		const weight = await prisma.weight.update({
			where: {
				id: weightId,
			},
			data: {
				weight: body.weight,
				date: new Date(body.date), // Ensure date is properly handled
			},
		});

		if (!weight) {
			return Response.json(
				{ message: "No weight entry with that ID has been found.", data: {} },
				{ status: 404 },
			);
		}

		if (body.weight <= 0) {
			return Response.json(
				{ message: "Negative weight not allowed.", data: {} },
				{ status: 400 },
			);
		}

		return Response.json(
			{
				message: "Successfully updated weight data.",
				data: weight,
			},
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{
				message: "An unknown error occurred.",
				data: error,
			},
			{ status: 500 },
		);
	}
}

export async function GET(_: Request, { params }: WeightParams) {
	const weightId = params.weightId;

	try {
		// Query the weight entry by weightId
		const weight = await prisma.weight.findFirst({
			where: {
				id: weightId,
			},
		});

		if (!weight) {
			return Response.json(
				{ message: "No weight entry with that ID has been found.", data: {} },
				{ status: 404 },
			);
		}

		return Response.json(
			{
				message: "Successfully queried weight data.",
				data: weight,
			},
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{
				message: "An unknown error occurred.",
				data: error,
			},
			{ status: 500 },
		);
	}
}

export async function DELETE(_: Request, { params }: WeightParams) {
	const weightId = params.weightId;

	try {
		// Check if the weight entry exists
		const weight = await prisma.weight.findFirst({
			where: {
				id: weightId,
			},
		});

		if (!weight) {
			return Response.json(
				{ message: "No weight entry with that ID has been found.", data: {} },
				{ status: 404 },
			);
		}

		// Delete the weight entry
		await prisma.weight.delete({
			where: { id: weightId },
		});

		return Response.json(
			{
				message: "Successfully deleted weight entry.",
				data: {},
			},
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{
				message: "An unknown error occurred.",
				data: error,
			},
			{ status: 500 },
		);
	}
}
