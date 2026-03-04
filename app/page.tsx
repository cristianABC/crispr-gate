import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">

        <Image
          className="w-full"
          src="/bg.png"
          alt="Next.js logo"
          width={500}
          height={500}
          priority
        />
    </div>
  );
}
