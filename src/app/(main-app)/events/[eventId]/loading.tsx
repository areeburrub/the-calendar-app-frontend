import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
    return (
        <div className="container max-w-3xl mx-auto py-8 px-4">
            <Card className="shadow-lg">
                <CardHeader className="flex flex-row justify-between items-center">
                    <Skeleton className="h-10 w-24" />
                    <div className="flex space-x-2">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-20" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <Skeleton className="h-9 w-64" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                        <div className="text-center">
                            <Skeleton className="h-10 w-16" />
                            <Skeleton className="h-16 w-16" />
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-56" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-56" />
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-4 w-32" />
                </CardFooter>
            </Card>
        </div>
    )
}