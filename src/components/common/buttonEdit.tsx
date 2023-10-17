"use client"
import { useModal } from "@/hooks/use-modal-store";
import React from 'react'


interface Props {
    kandang: {
        id_kandang: string;
        nama_kandang: string | null;
        gambar_kandang: string | null;
    }
}


const ButtonEdit = ({ kandang }: Props) => {
    const { onOpen } = useModal();

    return (
        <button className='text-white' onClick={() => onOpen("editKandang", { kandang })}>Open Modal</button>
    )
}

export default ButtonEdit