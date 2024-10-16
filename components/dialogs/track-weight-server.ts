"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
