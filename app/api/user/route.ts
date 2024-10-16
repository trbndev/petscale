import { prisma } from "@/lib/prisma";

export async function GET() {
	const users = await prisma.user.findMany();

	return Response.json({
		message: "Successfully queried users data.",
		data: users,
	});
}

interface CreateUserBody {
	email: string;
	name: string;
}
export async function POST(request: Request) {
	const body = (await request.json()) as CreateUserBody;

	try {
		const user = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
			},
		});

		return Response.json({
			message: "User has been successfully created.",
			data: user,
		});
	} catch (error) {
		return Response.json(
			{
				message: "An unknown error occured.",
				data: error,
			},
			{ status: 500 },
		);
	}
}
