import { Merriweather, Inter } from "next/font/google";

const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });



export const fonts = {
    merriweather,
    inter
};