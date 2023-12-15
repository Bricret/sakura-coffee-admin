import Image from "next/image";


export default function SakuraLogo() {
  return (
    <div className={`flex flex-row w-full h-full items-center leading-none text-white`} >
        <Image
            alt="Sakura Logo"
            src="/logo.png" 
            width={300} 
            height={300}
            className="object-cover flex-grow-0 flex-shrink-0"
        />
    </div>
  );
}
