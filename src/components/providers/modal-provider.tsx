"use client";

import { useEffect, useState } from "react";
import { CreateSensorModal } from "@/components/common/modals/create-sensor-modal";
import { CreateKandangModal } from "@/components/common/modals/create-kandang-modal";
import { EditKandangModal } from "../common/modals/edit-kandang-modal";


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateSensorModal />
            <CreateKandangModal />
            <EditKandangModal />
        </>
    )
}