export default function ImplanteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black text-gold-400 min-h-screen p-6">
      {children}
    </div>
  );
}