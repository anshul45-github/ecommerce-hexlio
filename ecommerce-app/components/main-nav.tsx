"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav( { className, ...props } ) {
    const pathName = usePathname();
    const params = useParams();
    const routes = [
        {
            href: `/${params.storeId}`,
            name: "Dashboard",
            isActive: pathName === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/settings`,
            name: "Settings",
            isActive: pathName.includes("settings")
        }
    ];
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn("text-sm font-medium text-gray-900 hover:text-gray-900", route.isActive ? "text-gray-900" : "text-gray-500")}
                >
                    {route.name}
                </Link>
            ))}
        </nav>
    )
}