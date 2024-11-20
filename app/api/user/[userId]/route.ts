import { prisma } from "@/lib/prisma";

interface UserParams {
	params: {
		userId: string;
	};
}

interface UpdateUserBody {
	name: string;
	email: string;
}
export async function PUT(request: Request, { params }: UserParams) {
	const body = (await request.json()) as UpdateUserBody;
	const userId = params.userId;

	const user = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			...body,
		},
	});

	if (!user) {
		return Response.json(
			{ message: "No user with that ID has been found.", data: {} },
			{ status: 404 },
		);
	}

	return Response.json(
		{
			message: "Successfully updated user data.",
			data: user,
		},
		{ status: 200 },
	);
}

export async function GET(_: Request, { params }: UserParams) {
	const userId = params.userId;

	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return Response.json(
			{ message: "No user with that ID has been found.", data: {} },
			{ status: 404 },
		);
	}

	return Response.json(
		{
			message: "Successfully queried user data.",
			data: user,
		},
		{ status: 200 },
	);
}

export async function DELETE(_: Request, { params }: UserParams) {
	const userId = params.userId;

	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return Response.json(
			{ message: "No user with that ID has been found.", data: {} },
			{ status: 404 },
		);
	}

	await prisma.user.delete({ where: { id: userId } });

	return Response.json(
		{
			message: "Successfully deleted user.",
			data: {},
		},
		{ status: 200 },
	);
}
