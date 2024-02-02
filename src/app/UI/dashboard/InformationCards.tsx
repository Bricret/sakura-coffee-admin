'use client'
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";


export default function InformationCards({title, data, style1, style2} : {title : string, data : any, style1: string, style2 : string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, data, { duration: 1.2 });
    
        return animation.stop;
      }, []);

    return (
    <motion.article 
    className={`w-1/4 bg-white rounded-lg shadow-md p-4 flex justify-between items-center border-b-large ${style1}`}
    initial={{ y: "-100vh" }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
    >
        <header>
            <h2 className="text-xs font-semibold text-gray-500 uppercase">{title}</h2>
            <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M5 15l7-7 7 7" />
            </svg>
            <motion.h1 className="text-3xl font-bold text-black/80">{rounded}</motion.h1>
            </div>
        </header>
        <figure className={` ${style2} rounded-full h-10 w-10 flex items-center justify-center`}></figure>
    </motion.article>
    )
}
