'use client'
import Search from "./Search";
import RightButton from "./right-button";
import InfoTable from "./Info-Table";


export default function TopContent() {


return (
    <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between gap-3 items-end">
            <Search placeholder="busca por nombre..."/>
            <RightButton />
        </div>
        <InfoTable />
    </div>
)

}