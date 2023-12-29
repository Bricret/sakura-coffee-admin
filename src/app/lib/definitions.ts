// Definiciones para todos los datos que se ingresan y se mueven por el sistema


export type User = {
    id: string;
    userName: string;
    password: string;
    rol: number;
    status: boolean;
  };


export interface DropdownContentProps {
  variant: any;
  color: any;
}


export interface HandleParamsProps {
  term: string;
  searchParams: any;
  paramsName: string;
  pathname: string;
  replace: any;
}


export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: any;
  type: string;
  id: string;
  by: string;
  orderId?: string;
  idTable?: string;
}
