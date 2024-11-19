import { DeletePetForm } from "@/components/dialogs/delete-pet-form";
import { prisma } from "@/lib/prisma";

export async function DeletePetDialog() {
	const pets = await prisma.pet.findMany();

	return <DeletePetForm pets={pets} />;
}
