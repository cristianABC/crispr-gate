import OrigenNav from "./components/OrigenNav";
export default function OrigenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-xs font-mono text-cyan-500 tracking-widest uppercase">
          Sector 5
        </h2>
        <h1 className="text-2xl font-bold tracking-tight">
          Logística Espacial — Rastreo y Rutas
        </h1>
      </div>

      <OrigenNav />

      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
