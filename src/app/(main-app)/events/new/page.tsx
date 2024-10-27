import {CreateEventForm} from "./components/createEventForm";

const NewEventPage = () => {
    return (
        <div className="flex flex-col gap-4 w-full h-[90vh] justify-center items-center">

            <div className={"max-w-3xl mx-auto p-4"}>
                <h1 className={"text-3xl font-bold py-2"}>Create a New Event</h1>
                <CreateEventForm/>
            </div>
        </div>
    )
}

export default NewEventPage