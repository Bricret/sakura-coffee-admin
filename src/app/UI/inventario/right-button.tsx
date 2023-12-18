import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";


export default function RightButton() {

    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
    <div className="flex gap-3">
        <Dropdown>
            <DropdownTrigger className="hidden sm:flex text-white bg-secundary/60">
                <Button color="primary">
                    Estado
                </Button>
            </DropdownTrigger>
            <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys='all'
            selectionMode="multiple"
            >
                <DropdownItem className="capitalize">
                {capitalize('david')}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    <Dropdown>
        <DropdownTrigger className="hidden sm:flex">
            <Button  variant="flat" className="text-white bg-secundary/60">
            Ver mas
            </Button>
        </DropdownTrigger>
        <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys='all'
            selectionMode="multiple"
        >
            <DropdownItem className="capitalize">
                {capitalize('metodo')}
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Button className="text-white bg-fourth">
        Nuevo
    </Button> 
    </div>
    )

}