"use client";

import { onCreatePetDialogSubmit } from "@/components/dialogs/create-pet-server";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultUserID } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

export function CreatePetForm() {
	const [newPetName, setNewPetName] = useState<string>("");
	const [newPetSpecies, setNewPetSpecies] = useState<string>("");
	const [newPetBreed, setNewPetBreed] = useState<string>("");
	const [newPetBirthDate, setNewPetBirthDate] = useState<string>("");

	return (
		<form>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="default" className="gap-x-2">
						<PlusCircleIcon className="w-4 h-4" />
						Add pet
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add a new pet</DialogTitle>
						<DialogDescription>
							Provide details to create a new pet.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								value={newPetName}
								onInput={(e) => setNewPetName(e.currentTarget.value)}
								className="col-span-3"
								type="text"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="species" className="text-right">
								Species
							</Label>
							<Input
								id="species"
								value={newPetSpecies}
								onInput={(e) => setNewPetSpecies(e.currentTarget.value)}
								className="col-span-3"
								type="text"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="breed" className="text-right">
								Breed
							</Label>
							<Input
								id="breed"
								value={newPetBreed}
								onInput={(e) => setNewPetBreed(e.currentTarget.value)}
								className="col-span-3"
								type="text"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="birthDate" className="text-right">
								Birth Date
							</Label>
							<Input
								id="birthDate"
								value={newPetBirthDate}
								onInput={(e) => setNewPetBirthDate(e.currentTarget.value)}
								className="col-span-3"
								type="date"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose>
							<Button
								onClick={() =>
									onCreatePetDialogSubmit(
										defaultUserID,
										newPetName,
										newPetSpecies,
										newPetBreed,
										newPetBirthDate,
									)
								}
								className="gap-x-2"
							>
								<PlusCircleIcon className="w-4 h-4" />
								<span>Create pet</span>
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</form>
	);
}
