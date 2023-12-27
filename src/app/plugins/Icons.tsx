import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine, RiDoorClosedLine } from "react-icons/ri";
import { FaPowerOff, FaCashRegister, FaSearch, FaFilter, FaAngleLeft, FaAngleRight, FaClipboardList } from "react-icons/fa";
import { MdDashboard, MdOutlineInventory, MdMoreHoriz  } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { FaEllipsisVertical, FaPlus  } from "react-icons/fa6";
import Image from "next/image";

const UserIcon = FaUserAlt;
const PasswordIcon = RiLockPasswordLine;
const PowerIcon = FaPowerOff;
const CashRegisterIcon = FaCashRegister;
const DashBoardIcon = MdDashboard;
const InventoryIcon = MdOutlineInventory;
const ReportIcon = TbReportSearch;
const SearchIcon = FaSearch;
const FilterIcon = FaFilter;
const VerticalDotsIcon = FaEllipsisVertical;
const ArrowLeftIcon = FaAngleLeft;
const ArrowRightIcon = FaAngleRight;
const PlusIcon = FaPlus;
const OrderIcon = FaClipboardList;
const CloseIcon = RiDoorClosedLine;
const MoreIcon = MdMoreHoriz;
const TableIcon = () => <Image src="/iconTable.svg" width={25} height={25} alt="" />;


export const Icons = {
    UserIcon,
    PasswordIcon,
    PowerIcon,
    CashRegisterIcon,
    DashBoardIcon,
    InventoryIcon,
    ReportIcon,
    SearchIcon,
    FilterIcon,
    VerticalDotsIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    PlusIcon,
    OrderIcon,
    CloseIcon,
    TableIcon,
    MoreIcon,
};