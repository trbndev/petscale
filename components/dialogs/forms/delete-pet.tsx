"use client";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TrashIcon } from "lucide-react";
import { type SetStateAction, useState } from "react";

import { deletePet } from "@/components/dialogs/server-actions";
import { DialogClose } from "@radix-ui/react-dialog";

interface DeletePetFormProps {
	pets: {
		id: string;
		name: string;
		species: string;
		breed: string | null;
	}[];
}

export function DeletePetForm({ pets }: DeletePetFormProps) {
	const [selectedPetId, setSelectedPetId] = useState<string>("");

	return (
		<form>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="destructive" className="gap-x-2">
						<TrashIcon className="w-4 h-4" />
						Delete pet
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Delete pet</DialogTitle>
						<DialogDescription>
							Select a pet to delete. This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Select
								required
								value={selectedPetId}
								onValueChange={(value: SetStateAction<string>) =>
									setSelectedPetId(value)
								}
							>
								<SelectTrigger className="col-span-4">
									<SelectValue placeholder="Select a pet to delete" />
								</SelectTrigger>
								<SelectContent>
									{pets.map((pet) => (
										<SelectItem key={pet.id} value={pet.id}>
											{pet.name} ({pet.species} - {pet.breed || "Unknown breed"}
											)
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<DialogClose>
							<Button
								type="button"
								variant="destructive"
								onClick={async () => {
									if (selectedPetId) {
										await deletePet(selectedPetId);
									}
								}}
								className="gap-x-2"
							>
								<TrashIcon className="w-4 h-4" />
								<span>Delete pet</span>
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</form>
	);
}
