import { fonts } from "../Fonts";


export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
        className={`rounded-md text-center h-10 px-4 py-2 w-full bg-third text-white font-bold hover:bg-secundary ${fonts.merriweather.className}`}
        type="submit"
    >
        { children }
    </button>
  )
}