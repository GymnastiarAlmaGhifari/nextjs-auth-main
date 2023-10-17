"use client"
import { useModal } from "@/hooks/use-modal-store";
import React from 'react'

type Props = {}

const ButtonOpen = (props: Props) => {
    const { onOpen } = useModal();

    return (
        <button className='text-white' onClick={() => onOpen("createKandang")}>Open Modal</button>
    )
}

export default ButtonOpen