
export default function OrigenLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Hello Root Layout Origen</h1>
      <div>{children}</div>
    </div>
  );
}