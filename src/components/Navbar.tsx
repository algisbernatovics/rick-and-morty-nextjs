"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Users, Tv, MapPin, Info } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    {
        name: "Characters",
        href: "/",
        activePrefixes: ["/", "/character", "/characters"]
    },
    {
        name: "Episodes",
        href: "/episodes",
        activePrefixes: ["/episodes", "/episode"]
    },
    {
        name: "Locations",
        href: "/locations",
        activePrefixes: ["/locations", "/location"]
    },
    {
        name: "About",
        href: "/about",
        activePrefixes: ["/about"]
    },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const checkActive = (item: typeof navItems[0]) => {
        if (item.name === "Characters" && pathname === "/") return true;
        if (item.name === "Characters" && pathname.startsWith("/character")) return true;
        return item.activePrefixes.some(prefix =>
            prefix !== "/" && pathname.startsWith(prefix)
        );
    };

    return (
        <nav className="sticky top-0 z-50 w-full glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-black tracking-tighter text-primary">
                                RICK<span className="text-secondary">&</span>MORTY
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => {
                                const isActive = checkActive(item);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "relative px-3 py-2 text-sm font-bold transition-all hover:text-primary flex items-center gap-2",
                                            isActive ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {item.name === "Characters" && <Users size={18} className="shrink-0" />}
                                        {item.name === "Episodes" && <Tv size={18} className="shrink-0" />}
                                        {item.name === "Locations" && <MapPin size={18} className="shrink-0" />}
                                        {item.name === "About" && <Info size={18} className="shrink-0" />}
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-nav"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                                initial={false}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30
                                                }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-muted-foreground hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => {
                                const isActive = checkActive(item);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block px-3 py-4 rounded-md text-base font-medium transition-colors flex items-center gap-3",
                                            isActive ? "text-primary bg-white/5" : "text-muted-foreground hover:text-primary hover:bg-white/5"
                                        )}
                                    >
                                        {item.name === "Characters" && <Users size={20} className="shrink-0" />}
                                        {item.name === "Episodes" && <Tv size={20} className="shrink-0" />}
                                        {item.name === "Locations" && <MapPin size={20} className="shrink-0" />}
                                        {item.name === "About" && <Info size={20} className="shrink-0" />}
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
