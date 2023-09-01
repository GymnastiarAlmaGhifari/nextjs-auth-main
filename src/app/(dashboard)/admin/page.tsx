import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
const page = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div>
            <h2 className="text-2xl">
                hai {session?.user.username || session?.user.name}
            </h2>
        </div>
    )
}

export default page
