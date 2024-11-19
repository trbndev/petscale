import { prisma } from "@/lib/prisma";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const defaultUserID = "d0ca1671-6a95-40c0-9727-0fbd061cb637";
export async function ensureDefaultUserExists() {
	const existingUser = await prisma.user.findUnique({
		where: {
			id: defaultUserID,
		},
	});

	if (!existingUser) {
		const defaultUser = await prisma.user.create({
			data: {
				id: defaultUserID,
				name: "default-user",
				email: "default@user.system",
				createdAt: new Date("2024-11-19T10:50:05.152Z"),
				updatedAt: new Date("2024-11-19T10:50:05.152Z"),
			},
		});

		console.log("Default user created:", defaultUser);
		return defaultUser;
	}

	return existingUser;
}
