"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function onCreatePetDialogSubmit(
	userId: string,
	name: string,
	species: string,
	breed: string | null,
	birthDate: string,
) {
	await prisma.pet.create({
		data: {
			userId,
			name,
			species,
			breed,
			birthDate: new Date(birthDate),
		},
	});

	revalidatePath("/");
}

export async function deletePet(petId: string) {
	await prisma.weight.deleteMany({
		where: {
			petId: petId,
		},
	});

	await prisma.pet.delete({
		where: {
			id: petId,
		},
	});

	revalidatePath("/");
}

export async function onTrackWeightDialogSubmit(
	pet: string,
	weight: number,
	date: string,
) {
	await prisma.weight.create({
		data: {
			weight,
			petId: pet,
			date: new Date(date),
		},
	});

	revalidatePath("/");
}
