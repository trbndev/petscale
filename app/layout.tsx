import Header from "@/components/header";
import "./globals.css";

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
	const { children } = props;

	return (
		<html lang="de">
			<body className="w-dvw min-h-dvh flex flex-col bg-stone-100">
				<Header />
				<main className="flex flex-col flex-grow px-8 py-4">{children}</main>
			</body>
		</html>
	);
}
