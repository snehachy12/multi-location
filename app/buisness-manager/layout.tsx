import React from "react";
import Sidebar, { MobileTabBar } from "@/components/buisnessidebar";

export default function BusinessManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-bg-main overflow-hidden">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
                {children}
            </main>

            {/* Mobile Bottom Tab Bar */}
            <MobileTabBar />
        </div>
    );
}
