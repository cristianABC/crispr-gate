import Link from "next/link"

export const Navbar = () => {
  return (
    <div>
      <Link href="/vigilancia">Navbar</Link>

      <p>Vigilancia</p>

      <div className="flex gap-4 text-2xl">
        <Link href="/vigilancia/registro">Registro de Infracciones</Link>
        <Link href="/vigilancia/Listar">Listar Infracciones</Link>
      </div>
    </div>
  )
}