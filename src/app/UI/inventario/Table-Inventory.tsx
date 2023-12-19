'use client'
import { TableColumns } from "@/app/lib/data/Local-Data";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

export default function TableInventory({ products } : { products: any } ) {

  if (!products) return <div>cargando...</div>; // TODO: add a loading component

  console.log(products);

  return (
    <div className="flex flex-col gap-3">
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
        <TableHeader columns={TableColumns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={products}>
          {(item : any) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
