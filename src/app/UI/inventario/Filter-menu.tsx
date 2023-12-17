import { DropdownContent } from "./dropdown-content"


export default function FilterMenu() {

    const selectedColor = "solid";
    const variant = 'solid'
    return (
        <div className="flex flex-col  md:items-end md:justify-end">
        <DropdownContent color={selectedColor} variant={variant} />
        </div>
    )
}