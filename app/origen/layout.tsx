export default function OrigenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-cyan-400 tracking-wider">
        SECTOR 5: LOGÍSTICA ESPACIAL
      </h1>
      <div>{children}</div>
    </div>
  );
}