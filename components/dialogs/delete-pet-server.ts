"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
