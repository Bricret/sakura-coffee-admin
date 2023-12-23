'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import { TableColumns } from "@/app/lib/data/Local-Data";

export default function TableInventory({ NewProducts } : { NewProducts?: any }) {
    return (
        <Table 
        aria-label="Table of inventory"
        selectionMode="multiple"
        selectionBehavior={'replace'}
        classNames={{
          wrapper: "",
          th: "bg-secundary text-white font-bold",
          tr: "hover:bg-secundary/80 focus:bg-secundary/80",
        }}
      >
        <TableHeader columns={ TableColumns }>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={ NewProducts }> 
          {(item : any) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
}