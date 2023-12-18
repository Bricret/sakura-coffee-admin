'use client'
import { TableColumns } from "@/app/lib/data/Local-Data";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { Action } from "./More-Actions";



const rows = [
  {
    key: "1",
    Nombre: "Empanadas",
    Precio: "200",
    Disponibilidad: "Disponible",
    Categoria: "Postres",
    Preparado_en: "Cocina",
    action: Action,
  },
  {
    key: "2",
    Nombre: "Empanadas",
    Precio: "200",
    Disponibilidad: "Disponible",
    Categoria: "Postres",
    Preparado_en: "Cocina",
    action: Action,
  },
  {
    key: "3",
    Nombre: "Empanadas",
    Precio: "200",
    Disponibilidad: "Disponible",
    Categoria: "Postres",
    Preparado_en: "Cocina",
    action: Action,
  },
  {
    key: "4",
    Nombre: "Empanadas",
    Precio: "200",
    Disponibilidad: "Disponible",
    Categoria: "Postres",
    Preparado_en: "Cocina",
    action: Action,
  },
  {
    key: "5",
    Nombre: "Empanadas",
    Precio: "200",
    Disponibilidad: "Disponible",
    Categoria: "Postres",
    Preparado_en: "Cocina",
    action: Action,
  },
  {
    key: "6",
    Nombre: "Empanadas",
    Precio: "200",
    Disponibilidad: "Disponible",
    Categoria: "Postres",
    Preparado_en: "Cocina",
    action: Action,
  },
];

export default function TableInventory() {

  return (
    <div className="flex flex-col gap-3">
      <Table 
        aria-label="Table of inventory"
        selectionMode="multiple"
        selectionBehavior={'replace'}
        classNames={{
          wrapper: "",
          th: "bg-secundary text-white font-bold",
          tr: "hover:bg-secundary/80 focus:bg-secundary/80 focus:text-white",
        }}
      >
        <TableHeader columns={TableColumns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
