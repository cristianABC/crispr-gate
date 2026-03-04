
export default function GenomaLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Hello Root Layout Genoma</h1>
      <div>{children}</div>
    </div>
  );
}