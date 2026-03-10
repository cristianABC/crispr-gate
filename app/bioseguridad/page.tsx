import { redirect } from "next/navigation";
import Listar from "./listarCarpeta/Listar";

export default function NamePage() {
  return (
    <div>
      <Listar></Listar>
    </div>
  );
}