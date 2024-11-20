"use client";

import { onTrackWeightDialogSubmit } from "@/components/dialogs/server-actions";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { PlusCircleIcon, WeightIcon } from "lucide-react";
import { useState } from "react";

interface TrackWeightFormProps {
	pets: {
		id: string;
		name: string;
		species: string;
		breed: string | null;
		birthDate: Date;
		createdAt: Date;
		updatedAt: Date;
		userId: string;
	}[];
}

export function TrackWeightForm(props: TrackWeightFormProps) {
	const { pets } = props;

	const [pet, setPet] = useState<string>("");
	const [weight, setWeight] = useState<number>(0);
	const [date, setDate] = useState<string>("");

	return (
		<form>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" className="gap-x-2">
						<PlusCircleIcon className="w-4 h-4" />
						Track weight
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Track weight</DialogTitle>
						<DialogDescription>
							Track the weight of your pets.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="weight" className="text-right">
								Pet
							</Label>
							<Select
								required
								value={pet}
								onValueChange={(newPet) => setPet(newPet)}
							>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Pet" />
								</SelectTrigger>
								<SelectContent>
									{pets.map((pet) => (
										<SelectItem key={pet.id} value={pet.id}>
											{pet.name} ({pet.breed})
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="weight" className="text-right">
								Weight (kg)
							</Label>
							<Input
								id="weight"
								defaultValue=""
								value={weight}
								onInput={(event) => {
									const newWeight = Number.parseFloat(
										event.currentTarget.value,
									);

									if (newWeight <= 0) {
										setWeight(0.1);
									}

									setWeight(newWeight);
								}}
								className="col-span-3"
								type="number"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="date" className="text-right">
								Date
							</Label>
							<Input
								id="date"
								defaultValue={new Date().toISOString()}
								value={date}
								onInput={(event) => setDate(event.currentTarget.value)}
								className="col-span-3"
								type="date"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose>
							<Button
								onClick={() => {
									onTrackWeightDialogSubmit(pet, weight, date);
								}}
								className="gap-x-2"
							>
								<WeightIcon className="w-4 h-4" />
								<span>Track weight</span>
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</form>
	);
}
