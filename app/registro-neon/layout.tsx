
export default function NeonLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Hello Root Layout Neon</h1>
      <div>{children}</div>
    </div>
  );
}