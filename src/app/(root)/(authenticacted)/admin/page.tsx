"use client"
import AreaChartWithGradient from "@/components/common/chart/Ram";
import Ram from "@/components/common/chart/Ram";
import { useSession } from "next-auth/react";
import { useState } from "react";


interface Props {
    username: string;
    name: string;
    role: string;
}

// gunakan interface
const Page = () => {
    const { data: session } = useSession()

    return (
        <div className="w-full h-full">
            <h2 className="text-2xl flex justify-center items-center mt-14 text-white">
                hai {session?.user.username || session?.user.name}
                <br />
                hai {session?.user.role}
            </h2>

            {/* Render the RamChart component with sample data */}
            {/* <Ram /> */}
            <AreaChartWithGradient />
        </div>
    );
};

export default Page;
