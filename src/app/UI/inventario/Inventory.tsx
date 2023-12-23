import { FetchFilteredInventory, FetchInventoryPageCount } from "@/app/lib/data";
import { Action, Disponibilidad } from "./More-Actions";
import Paginations from "./Pagination";
import TableInventory from "./Table-Inventory";

export default async function Inventory({ itemsForPage, query, currentPage } : { itemsForPage: number, query: string, currentPage: number }) {

  const products = await FetchFilteredInventory(query, itemsForPage, currentPage);
  const TotalPage = await FetchInventoryPageCount(itemsForPage);

  const NewProducts = products.map((product: any) => {
    return {
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      preparado_en: product.preparado_en,
      disponibilidad: <Disponibilidad disponibilidad={product.disponibilidad} />,
      action: <Action id={product.id} product={product} />,
    };
  });

  return (
    <div className="flex flex-col gap-3">

      <TableInventory NewProducts={ NewProducts } />

      <Paginations totalPages={TotalPage} />
    </div>
  );
}