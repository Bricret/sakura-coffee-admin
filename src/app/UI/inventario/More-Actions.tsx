import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Icons } from "@/app/plugins/Icons";

const { VerticalDotsIcon } = Icons;


export const Action = (
    <div className="relative flex justify-center items-center gap-2">
    <Dropdown className="bg-background border-1 border-default-200" aria-label="Menú de opciones">
      <DropdownTrigger aria-label="Menú de opciones">
        <Button isIconOnly radius="full" size="lg" variant="light" aria-label="Menú de opciones">
          <VerticalDotsIcon className="text-default-400" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Menú de opciones">
        <DropdownItem aria-label="Ver mas">Ver mas</DropdownItem>
        <DropdownItem aria-label="Editar">Editar</DropdownItem>
        <DropdownItem aria-label="Borrar">Borrar</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>  
  )
