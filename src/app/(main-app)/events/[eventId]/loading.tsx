import {Button} from "@/components/ui/button";
import {ArrowLeft, PenBoxIcon, Trash} from "lucide-react";
import Link from "next/link";


const SingleEventLoadingPage = () => {

    return(
        <div className={"p-4 container max-w-screen-lg mx-auto"}>
            <div className={"flex flex-row justify-between w-full py-4"}>
                <Link href={"/events"}>
                    <Button><ArrowLeft/>Back</Button>
                </Link>
                <div className={"flex flex-row gap-4"}>
                    <Button variant={"destructive"}><Trash/>Delete</Button>
                    <Button ><PenBoxIcon/>Edit</Button>
                </div>
            </div>
            <div className={"flex justify-between items-center flex-row py-4"}>
                <div>
                    <h1 className={"text-4xl font-bold my-2"}>
                        <div className={"w-full h-10 animate-pulse bg-gray-100 rounded"}></div>
                    </h1>
                    <p className="text-muted-foreground">
                        <div className={"w-40 h-5 animate-pulse bg-gray-100 rounded"}></div>
                    </p>
                </div>
                <div className={"w-24 hidden md:block border-2 border-black"}>
                    <div
                        className={"w-full p-1 uppercase text-white font-bold bg-red-500 text-xl flex items-center justify-center"}>
                        <div className={"w-6 h-6 animate-pulse rounded"}></div>
                    </div>
                    <div className={"w-24 h-16 flex items-center justify-center text-3xl font-bold"}>
                        <div className={"w-6 h-6 animate-pulse bg-gray-100 rounded"}></div>
                    </div>
                </div>
            </div>
            <h2 className={"font-bold text-xl"}>Event Description:</h2>
            <p className={"whitespace-pre-wrap text-lg"}>
                <div className={"w-full h-40 animate-pulse bg-gray-100 rounded"}></div>
            </p>
        </div>
    )
}

export default SingleEventLoadingPage