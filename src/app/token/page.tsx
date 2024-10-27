import {auth} from "@clerk/nextjs/server";
import {getAllEvents} from "@/_actions/getAllEvents";

const TokenPage = async () => {

    const { getToken } = await auth()
    const token = await getToken({template:"httpie-testing"})

    const events = await getAllEvents()

    return(
        <div className={"w-full p-5 max-w-screen"}>
            {token}
            {
                events.map((event)=>{
                    return(
                        <div key={event.id}>
                            {event.title}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TokenPage;