import { TrackWeightForm } from "@/components/dialogs/track-weight-form";
import { prisma } from "@/lib/prisma";

export async function TrackWeightDialog() {
	const pets = await prisma.pet.findMany();

	return <TrackWeightForm pets={pets} />;
}
