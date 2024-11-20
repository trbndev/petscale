import {
	CreatePetDialog,
	DeletePetDialog,
	TrackWeightDialog,
} from "@/components/dialogs";

export default function Header() {
	return (
		<header className="w-dvw px-8 py-4 border-b-2 border-stone-200 flex flex-row justify-between items-center bg-white">
			<h1 className="font-bold text-lg">petscale.</h1>
			<div className="flex gap-4 justify-center items-center h-auto">
				<TrackWeightDialog />
				<CreatePetDialog />
				<DeletePetDialog />
			</div>
		</header>
	);
}
