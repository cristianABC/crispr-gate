
export default function ImplanteLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Hello Root Layout Implante</h1>
      <div>{children}</div>
    </div>
  );
}