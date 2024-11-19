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
