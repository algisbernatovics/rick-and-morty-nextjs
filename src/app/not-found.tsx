import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-4xl font-black text-primary">WRONG DIMENSION</h1>
            <p className="max-w-md text-muted-foreground">
                The Rick and Morty page you requested does not exist in this universe.
            </p>
            <Link
                href="/"
                className="rounded-xl bg-primary px-8 py-4 font-black text-black hover:scale-105 transition-transform"
            >
                RETURN TO REALITY
            </Link>
        </div>
    );
}
