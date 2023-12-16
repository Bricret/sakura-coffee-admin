import Image from "next/image";


export default function SakuraLogo() {
  return (
    <div className={`hidden md:flex w-full h-full items-center leading-none text-white `} >
        <Image
            alt="Sakura Logo"
            src="/logo.png" 
            width={300} 
            height={300}
            priority
            className="object-cover flex-grow-0 flex-shrink-0"
        />
    </div>
  );
}
