'use client'

import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const GoBackButton = () => {

    const router = useRouter()

    return (
        <Button onClick={() => {
            router.back()
        }}><ArrowLeft/>Back</Button>
    )
}

export default GoBackButton