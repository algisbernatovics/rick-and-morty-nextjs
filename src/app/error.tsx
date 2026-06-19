"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-4xl font-black text-red-500">INTERDIMENSIONAL ERROR</h1>
            <p className="max-w-md text-muted-foreground">
                Something went wrong while loading this page. Try again before the portal closes.
            </p>
            <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-primary px-8 py-4 font-black text-black hover:scale-105 transition-transform"
            >
                TRY AGAIN
            </button>
        </div>
    );
}
