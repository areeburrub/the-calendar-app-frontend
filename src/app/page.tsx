import {Button} from "@/components/ui/button";
import {ArrowRight, CalendarCheck} from "lucide-react";
import {
    SignInButton,
    SignUpButton
} from '@clerk/nextjs'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col justify-center gap-5 items-center mx-auto max-w-3xl bg-white">
            <CalendarCheck size={50}/>
            <h1 className={"text-3xl font-bold"}>The Calendar App</h1>
            <div className={"flex flex-row gap-5"}>
                <SignInButton
                    forceRedirectUrl={"/home"}
                >
                    <Button variant={"outline"} className={"border-black"}>Login to Calendar</Button>
                </SignInButton>
                <SignUpButton
                    forceRedirectUrl={"/home"}
                >
                    <Button>Get Started <ArrowRight/></Button>
                </SignUpButton>
            </div>
            <p className={"prose text-center text-lg"}>
                Welcome to the <strong>Personal Calendar App</strong> — a simple yet powerful tool to help you manage
                your
                events and meetings efficiently.
                With our app, users can <em>create</em>, <em>view</em>, <em>edit</em>, and <em>delete</em> their
                personal
                calendar events, ensuring all your important dates
                are just a click away. After a quick and easy authentication process, gain access to a clean and
                intuitive
                calendar interface.
                Securely store your events with user-specific access, ensuring that only you can view and manage your
                calendar.
            </p>

        </main>
    );
}
