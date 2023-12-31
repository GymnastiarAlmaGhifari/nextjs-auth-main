import ButtonEdit from '@/components/common/buttonEdit'
import { db } from '@/lib/db'
import React, { FC } from 'react'
// import { useModal } from "@/hooks/use-modal-store";

interface pageKandangId {
    params: {
        id: string
    }
}

const getDetailKandang = async (id: string) => {
    const response = await db.kandang.findFirst({
        where: {
            id_kandang: id
        },
        select: {
            id_kandang: true,
            nama_kandang: true,
            gambar_kandang: true
        }
    })
    return response
}

const DetailKandang: FC<pageKandangId> = async ({ params }) => {

    const detailKandang = await getDetailKandang(params.id)

    console.log(detailKandang)

    // const { isOpen, onClose, type } = useModal();

    console.log(params.id)

    return (
        <div className='text-white'>

            <h1>Detail Kandang</h1>
            <div className="text-white">
                <h1>{detailKandang?.nama_kandang}</h1>
                <h2>{detailKandang?.id_kandang}</h2>

            </div>
        </div>
    )
}

export default DetailKandang