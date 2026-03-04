
export default function AduanaLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Navbar Group View</h1>
      <div>{children}</div>
    </div>
  );
}