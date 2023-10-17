"use client"

import AreaChartContainer from "@/components/common/chart/AreaChartContainer";
import Ram from "@/components/common/chart/Ram"

const page = () => {
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
        <div className=" overflow-hidden flex flex-col gap-20 ">
            <Ram />
            <div className="overflow-hidden bg-white rounded-lg">

                <AreaChartContainer data={data} size={{ height: 300, width: 500 }} />
            </div>
        </div>

    )
}

export default page
