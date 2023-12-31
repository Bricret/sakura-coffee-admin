'use client';

import { Icons } from "@/app/plugins/Icons";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import ModalChangeTable from "./Modal-ChangeTables";

const { ChangeIcon } = Icons;

export default function ChangeTables({ tables, infoOrder }: { tables : any, infoOrder : any }) {


    const [isOpen, setIsOpen] = useState(false);
    const onOpen  = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <div>
          <Tooltip closeDelay={2} delay={500} content="Cambiar Mesa">
            <span onClick={onOpen} className="text-2xl text-black/70 cursor-pointer active:opacity-50">
              <ChangeIcon />
            </span>
          </Tooltip>
          <ModalChangeTable 
            isOpen={ isOpen } 
            onClose={ onClose }
            tables={ tables }
            infoOrder={ infoOrder }
          />
        </div>
    )
}