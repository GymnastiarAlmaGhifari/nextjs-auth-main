"use client"
import { SocketIndicator } from "@/components/common/Socket-indicator";
import AreaChartContainer from "@/components/common/chart/AreaChartContainer";
import SensorChart from "@/components/common/chart/SensorChart";
import Temperature from "@/components/common/chart/temperature";
import SignUp from "@/components/common/form/Signup";
import Link from "next/link";

export default function Home() {
    const data = [
        { x: 'Jan', y: 10 },
        { x: 'Feb', y: 60 },
        { x: 'Mar', y: 15 },
        // Tambahkan data sesuai dengan kebutuhan Anda
        { x: 'Apr', y: 25 },
        { x: 'May', y: 45 },
        { x: 'Jun', y: 30 },
        { x: 'Jul', y: 70 },
        { x: 'Aug', y: 55 },
        { x: 'Sep', y: 40 },
        { x: 'Oct', y: 85 },
        { x: 'Nov', y: 20 },
        { x: 'Dec', y: 75 },
        { x: 'Jan', y: 5 },
        { x: 'Feb', y: 35 },
        { x: 'Mar', y: 45 },
        { x: 'Apr', y: 60 },
        { x: 'May', y: 20 },
        { x: 'Jun', y: 90 },
        { x: 'Jul', y: 15 },
        { x: 'Aug', y: 70 },
        { x: 'Sep', y: 30 },
        { x: 'Oct', y: 80 },
        { x: 'Nov', y: 25 },
        { x: 'Dec', y: 50 },
        { x: 'Jan', y: 10 },
        { x: 'Feb', y: 40 },
        { x: 'Mar', y: 65 },
        { x: 'Apr', y: 30 },
        { x: 'May', y: 70 },
        { x: 'Jun', y: 15 },
        { x: 'Jul', y: 50 },
        { x: 'Aug', y: 20 },
        { x: 'Sep', y: 85 },
        { x: 'Oct', y: 40 },
        // Lanjutkan sampai bulan ke-30
    ];
    return (
        <div className='text-4xl flex flex-col gap-10  bg-white rounded-xl'>
            {/* <SignUp /> */}

            <h1 className="text-center">aowkoawkowak</h1>

            <SocketIndicator />
            {/* <AreaChartContainer data={data} size={{ height: 300, width: 500 }} /> */}
            <div className="mt-10 relative bg-red-500">
                {/* <SensorChart size={{ height: 300, width: 500 }} /> */}
                <AreaChartContainer data={data} size={{ height: 300, width: 500 }} />
            </div>

            <Link href="/dashboard">
                <h1 className="">dashboard</h1>
            </Link>
            <div className="mt-10">
                <Temperature
                    apiUrl="/api/sensor?date=seminggu"
                    paramKey="sensorId"
                    paramValue={""}
                    socketUrl="/api/socket/sensor"
                    socketQuery={{
                        sensorId: "",
                    }}
                />
            </div>
        </div>
    );
}
