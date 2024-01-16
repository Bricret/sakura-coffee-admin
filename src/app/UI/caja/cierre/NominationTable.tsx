import { TableNominationDolarsBanknote, TableNominationNationalBanknote, TableNominationNationalCoin } from "@/app/lib/data/Local-Data";
import NominationTableForm from "./TableNominationForm";

export default function NominationTable({ montos, setMontos } : { montos: any, setMontos: any }) {

    return (
    <>
    <NominationTableForm 
        Nomination={TableNominationNationalBanknote} 
        montos={montos} 
        setMontos={setMontos} 
        title="Billetes"
    />
    <div className="flex flex-col">
        <NominationTableForm 
            Nomination={TableNominationNationalCoin} 
            montos={montos} 
            setMontos={setMontos} 
            title="Monedas"
        />
        <NominationTableForm 
            Nomination={TableNominationDolarsBanknote} 
            montos={montos} 
            setMontos={setMontos} 
            title="Billletes "
            dolar={true}
        />
    </div>
    </>
    )
}