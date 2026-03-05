import Link from "next/dist/client/link"

export const Navbar = () => {
  return (
    <div className="flex justify-between bg-white font-bold p-5 text-red-500"> 

    <Link href= "/"> Navbar </Link>
    <p> Vigilancia </p>
    <div className="flex gap-4 text-2xl"> 
    <Link href="/registro"> Registro de Infracciones </Link>
    <Link href="/tripulacion"> Tripulación </Link>
    <Link href="/especies"> Especies </Link>

      </div>
    </div>
    )
}
