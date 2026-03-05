import NavBar from "./components/NavBar"
export default function BioseguridadLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar></NavBar>
      <div>{children}</div>
    </div>
  );
}