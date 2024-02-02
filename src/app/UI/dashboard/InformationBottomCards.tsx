'use client'

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";




export default function InformationBottomCards({ title, data, money, icon } : { title : string, data : any, money : boolean, icon : any }) {

    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, data, { duration: 1.2 });
    
        return animation.stop;
      }, []);

    return (
        <motion.article 
            className={`w-1/4 h-16 bg-white rounded-lg shadow-md p-4 flex justify-between items-center`}
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <footer>
            <h2 className="text-xs font-semibold text-gray-500 uppercase">{title}</h2>
            <div className="flex items-center">
            {
                money ? (
                    <span className="text-xl font-bold text-gray-500/60 pr-2">C$</span>
                ) : (
                    icon
                )
            }
            <motion.h1 className="text-2xl font-bold text-black">
                {
                    data === data.toString() ? data : rounded
                }
            </motion.h1>
            </div>
            </footer>
        </motion.article>
    )
}