import { prisma } from "@/lib/prisma";

interface PetParams {
	params: {
		petId: string;
	};
}

interface UpdatePetBody {
	name: string;
	species: string;
	breed?: string;
	birthDate: string;
}

export async function PUT(request: Request, { params }: PetParams) {
	const body = (await request.json()) as UpdatePetBody;
	const petId = params.petId;

	const pet = await prisma.pet.update({
		where: {
			id: petId,
		},
		data: {
			name: body.name,
			species: body.species,
			breed: body.breed,
			birthDate: new Date(body.birthDate),
		},
	});

	if (!pet) {
		return Response.json(
			{ message: "No pet with that ID has been found.", data: {} },
			{ status: 404 },
		);
	}

	return Response.json(
		{
			message: "Successfully updated pet data.",
			data: pet,
		},
		{ status: 200 },
	);
}

export async function GET(_: Request, { params }: PetParams) {
	const petId = params.petId;

	const pet = await prisma.pet.findFirst({
		where: {
			id: petId,
		},
	});

	if (!pet) {
		return Response.json(
			{ message: "No pet with that ID has been found.", data: {} },
			{ status: 404 },
		);
	}

	return Response.json(
		{
			message: "Successfully queried pet data.",
			data: pet,
		},
		{ status: 200 },
	);
}

export async function DELETE(_: Request, { params }: PetParams) {
	const petId = params.petId;

	const pet = await prisma.pet.findFirst({
		where: {
			id: petId,
		},
	});

	if (!pet) {
		return Response.json(
			{ message: "No pet with that ID has been found.", data: {} },
			{ status: 404 },
		);
	}

	await prisma.pet.delete({ where: { id: petId } });

	return Response.json(
		{
			message: "Successfully deleted pet.",
			data: {},
		},
		{ status: 200 },
	);
}
