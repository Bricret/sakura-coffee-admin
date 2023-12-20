'use client'
import { TableColumns } from "@/app/lib/data/Local-Data";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { Action, Disponibilidad } from "./More-Actions";
import Paginations from "./Pagination";

export default function TableInventory({ products, TotalPage } : { products: any, TotalPage: number } ) {

  if (!products) return <div>cargando...</div>; // TODO: add a loading component
  if (!TotalPage) return <div>cargando...</div>; // TODO: add a loading component

  const NewProducts = products.map((product: any) => {
    return {
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      preparado_en: product.preparado_en,
      disponibilidad: Disponibilidad({disponibilidad: product.disponibilidad}),
      action: Action,
    };
  });

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

      <Paginations totalPages={TotalPage} />
    </div>
  );
}