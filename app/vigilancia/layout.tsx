
export default function VigilanciaLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Hello Root Layout Vigilancia</h1>
      <div>{children}</div>
    </div>
  );
}