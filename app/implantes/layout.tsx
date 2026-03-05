export default function ImplanteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            ⚖️ Sector 7: Auditoría de Implantes
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Control fiscal de activos de Aumento Humano — CRISPR-GATE
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}