import {LoaderCircle} from "lucide-react";

const NewEventLoadingPage = () => {
    return(
        <div className="flex flex-col gap-4 w-full h-[90vh] justify-center items-center">
                <LoaderCircle className={"animate-spin size-20"}/>
        </div>
    )
}

export default NewEventLoadingPage