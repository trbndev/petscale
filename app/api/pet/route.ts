import { prisma } from "@/lib/prisma";

export async function GET() {
	const pets = await prisma.pet.findMany();

	return Response.json({
		message: "Successfully queried pets data.",
		data: pets,
	});
}

interface CreatePetBody {
	userId: string;
	name: string;
	species: string;
	breed?: string;
	birthDate: string;
}
export async function POST(request: Request) {
	const body = (await request.json()) as CreatePetBody;

	try {
		const pet = await prisma.pet.create({
			data: {
				userId: body.userId,
				name: body.name,
				species: body.species,
				breed: body.breed,
				birthDate: new Date(body.birthDate),
			},
		});

		return Response.json({
			message: "Pet has been successfully created.",
			data: pet,
		});
	} catch (error) {
		return Response.json(
			{
				message: "An unknown error occured.",
				data: error,
			},
			{ status: 500 },
		);
	}
}
