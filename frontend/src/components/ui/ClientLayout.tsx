"use client";

import Link from "next/link";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { useState, useEffect } from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
  userEmail: string | undefined;
}

export function ClientLayout({ children, userEmail }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen" suppressHydrationWarning>
      {/* Mobile toggle button - visible only on small screens */}
      {isMobile && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-surface border border-border"
          aria-label="Abrir menú"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={`
          fixed lg:relative z-50 w-64 h-full min-h-screen border-r border-border flex flex-col bg-white
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo + Close button on mobile */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-border">
          <Link href="/empleados" className="text-lg font-semibold">
            Gestión
          </Link>
          {isMobile && (
            <button onClick={closeSidebar} className="p-1" aria-label="Cerrar menú">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <Link
            href="/empleados"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-text-primary hover:bg-surface-hover transition-colors"
            onClick={closeSidebar}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.12-3.57M1 14v-2a3 3 0 015.12-3.57M5 14V6a3 3 0 015.32-2.43M17 2l3 3m-3-3l-3 3" />
            </svg>
            Empleados
          </Link>
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-medium">
              {userEmail?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {userEmail?.split("@")[0] || "Usuario"}
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-border">
          <LogoutButton />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Main content */}
      <main className="flex-1 w-full lg:ml-0 p-4 lg:p-8 pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}