export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-8">
                <div className="h-16 w-2/3 rounded-2xl bg-white/5" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="h-72 rounded-2xl bg-white/5" />
                    ))}
                </div>
            </div>
        </div>
    );
}
