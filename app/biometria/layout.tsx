
export default function BiometriaLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Hello Root Layout Biometria</h1>
      <div>{children}</div>
    </div>
  );
}