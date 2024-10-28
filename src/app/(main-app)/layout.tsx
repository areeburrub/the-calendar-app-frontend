import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
    UserButton
} from '@clerk/nextjs'
import {Button} from "@/components/ui/button";
import {Bell, Plus} from "lucide-react";
import Link from "next/link";
import {Toaster} from "@/components/ui/toaster";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className={"w-full h-full"}>
                <nav className={"flex flex-row p-4 items-center justify-between w-full shadow"}>
                    <SidebarTrigger/>
                    <div className={"flex flex-row items-center gap-4"}>
                        <Link href={"/events/new"} passHref={true}>
                            <Button>Create Event <Plus/></Button>
                        </Link>
                        <UserButton/>
                    </div>
                </nav>
                {children}
                <Toaster />
            </main>
        </SidebarProvider>
    )
}

export default Layout