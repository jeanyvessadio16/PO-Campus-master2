"use client";

import { Bell, Search } from "lucide-react";
import { ModeToggle } from "../theme/modeToggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function AdminHeader() {
    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6">
            <SidebarTrigger className="-ml-2" />
            <Separator orientation="vertical" className="h-6" />
            <div className="flex-1">
                <form className="relative w-full max-w-[300px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Rechercher..."
                        className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
                    />
                </form>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/admin.png" alt="Admin" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Administrateur</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Gestion Utilisateurs</DropdownMenuItem>
                        <DropdownMenuItem>Paramètres Système</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Déconnexion</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
