"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Users, Tv, MapPin, Info } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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
    const shouldReduceMotion = useReducedMotion();

    const checkActive = (item: typeof navItems[0]) => {
        if (item.name === "Characters" && pathname === "/") return true;
        if (item.name === "Characters" && pathname.startsWith("/character")) return true;
        return item.activePrefixes.some(prefix =>
            prefix !== "/" && pathname.startsWith(prefix)
        );
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface-glass/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="focus-ring flex-shrink-0 rounded-lg">
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
                                        aria-current={isActive ? "page" : undefined}
                                        className={cn(
                                            "focus-ring relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors hover:text-primary",
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
                                                    type: shouldReduceMotion ? "tween" : "spring",
                                                    stiffness: 380,
                                                    damping: 30,
                                                    duration: shouldReduceMotion ? 0 : undefined,
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
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-controls="mobile-navigation"
                            aria-expanded={isOpen}
                            className="focus-ring rounded-lg p-2 text-muted-foreground transition-colors hover:text-text-strong"
                        >
                            {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        className="border-t border-border-subtle bg-surface-glass md:hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => {
                                const isActive = checkActive(item);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        aria-current={isActive ? "page" : undefined}
                                        className={cn(
                                            "focus-ring flex items-center gap-3 rounded-md px-3 py-4 text-base font-medium transition-colors",
                                            isActive ? "bg-surface-hover text-primary" : "text-muted-foreground hover:bg-surface-hover hover:text-primary"
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
