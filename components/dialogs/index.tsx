import { CreatePetForm } from "@/components/dialogs/forms/create-pet";
import { DeletePetForm } from "@/components/dialogs/forms/delete-pet";
import { TrackWeightForm } from "@/components/dialogs/forms/track-weight";
import { prisma } from "@/lib/prisma";

export async function CreatePetDialog() {
	return <CreatePetForm />;
}

export async function DeletePetDialog() {
	const pets = await prisma.pet.findMany();

	return <DeletePetForm pets={pets} />;
}

export async function TrackWeightDialog() {
	const pets = await prisma.pet.findMany();

	return <TrackWeightForm pets={pets} />;
}
