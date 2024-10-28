import {MoreVertical} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {DropdownMenu, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

const DummyCard = () => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2 pb-2">
                <CardTitle className="w-full">
                    <div className={"w-full h-10 animate-pulse bg-gray-100 rounded"}></div>
                </CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <div className={"w-full h-10 animate-pulse bg-gray-100 rounded-lg"}></div>
            </CardContent>
            <CardFooter>
                <div className={"w-40 h-5 animate-pulse bg-gray-100 rounded"}></div>
            </CardFooter>
        </Card>
    )
}

const EventsPage = () => {
    return (
        <div className={"p-4"}>
            <h1 className={"text-3xl font-bold py-2"}>Your Upcoming Events</h1>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"}>
                <DummyCard/>
                <DummyCard/>
                <DummyCard/>
                <DummyCard/>
                <DummyCard/>
                <DummyCard/>
            </div>
        </div>
    )
}

export default EventsPage