'use client'

import { EyeIcon } from "@/app/plugins/Icons";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import ModalViewFlowCash from "./ModalViewFlowCash";


export default function ActionFlowCash({ FlowCash } : { FlowCash : any }) {

    const [isOpen, setIsOpen] = useState(false);
    const onOpen  = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);


    return (
        <div className="relative flex items-center justify-evenly gap-2">
            <Tooltip closeDelay={2} delay={500} content="Mas Informacion">
                <span onClick={onOpen} className="text-lg text-zinc-800 cursor-pointer active:opacity-50">
                    <EyeIcon />
                </span>
            </Tooltip>
            <ModalViewFlowCash onClose={onClose} isOpen={isOpen} FLowCash={FlowCash} />
        </div>
    )
}