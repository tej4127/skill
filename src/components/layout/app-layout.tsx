
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { LayoutGrid, ArrowRightLeft, User, Shield, Briefcase } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Browse', icon: LayoutGrid },
  { href: '/swaps', label: 'My Swaps', icon: ArrowRightLeft },
  { href: '/profile', label: 'My Profile', icon: User },
  { href: '/admin', label: 'Admin', icon: Shield },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader className="p-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Briefcase className="w-7 h-7 text-primary" />
              <h2 className="text-xl font-bold tracking-tight text-foreground font-headline">SkillDock</h2>
            </Link>
          </SidebarHeader>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
             {/* Header content can go here if needed */}
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
