import { updateOrderToStatusAndUpdateOrdens } from "./actions";
import { FetchMostSoldProduct, FetchTotalSoldProducts } from "./data";


export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages - 1, totalPages];
    }
  
    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
      return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }
  
    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };


export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export async function finishOrderTo( idOrderto : any ) {
  const res = await updateOrderToStatusAndUpdateOrdens(idOrderto);
  return res;
}


export const handleInputChangeMontos = (e : React.ChangeEvent<HTMLInputElement>, factor: number, name: string, setMontos : React.Dispatch<React.SetStateAction<{ [key: string]: number }>>) => {
  const value = parseFloat(e.target.value) || 0;
  let result = value * factor;
  if (name.includes("$")) {
      const conversionRate = parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string) || 1;
      result *= conversionRate; // Factor de conversión a córdobas
  }
  setMontos(prevMontos => ({ ...prevMontos, [name]: result }));
};

export const calcularTotalMonto = ( montos : any, montoInicial : any, setTotalMonto : any ) => {
  const totalCalculado = Object.values(montos).reduce((sum : any, monto) => sum + monto, 0);
  setTotalMonto(montoInicial + totalCalculado);
};


export const TotalInvoice = ( Invoice : any ) => {
  const totalinvoice = Invoice?.reduce((acc: number, item: any) => {
    return acc + item.total_C_;
  }, 0);
  return totalinvoice;
};

export const PropinaInvoice = ( Invoice : any ) => {
  const propinainvoice = Invoice?.reduce((acc: number, item: any) => {
    return acc + item.propina_C_;
  }, 0);
  return propinainvoice;
}


export async function calculatePercentage() {
  const mostSoldProduct = await FetchMostSoldProduct();
  const totalSoldProducts = await FetchTotalSoldProducts();

  const percentage = (mostSoldProduct._sum.cantidad / totalSoldProducts) * 100;

  return({
    porcentaje: percentage.toFixed(2),
    nombre: mostSoldProduct.nombreProducto
  });
}

export function buscarPropiedad(obj: any, condicion: any) {
  for (const propiedad in obj) {
     if (obj.hasOwnProperty(propiedad) && condicion(obj[propiedad])) {
       return propiedad;
     }
  }
  return null;
}