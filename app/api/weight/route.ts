import { prisma } from "@/lib/prisma";

export async function GET() {
	const weights = await prisma.weight.findMany();

	return Response.json({
		message: "Successfully queried weights data.",
		data: weights,
	});
}

interface CreateWeightBody {
	weight: number;
	date: string;
	petId: string;
}

export async function POST(request: Request) {
	const body = (await request.json()) as CreateWeightBody;

	try {
		// Ensure the pet exists before creating a weight entry
		const pet = await prisma.pet.findUnique({
			where: {
				id: body.petId,
			},
		});

		// Return early if no pet has been found
		if (!pet) {
			return Response.json(
				{
					message: "No pet with that ID has been found.",
					data: {},
				},
				{ status: 404 },
			);
		}

		// Create a new weight entry for the pet
		const weight = await prisma.weight.create({
			data: {
				weight: body.weight,
				date: new Date(body.date), // Ensure the date is a valid Date object
				petId: body.petId,
			},
		});

		return Response.json(
			{
				message: "Weight entry has been successfully created.",
				data: weight,
			},
			{ status: 201 },
		);
	} catch (error) {
		// If an error occures, forward the message to the client
		return Response.json(
			{
				message: "An unknown error occurred.",
				data: error,
			},
			{ status: 500 },
		);
	}
}
