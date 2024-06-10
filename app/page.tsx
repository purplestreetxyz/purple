import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-10">
      <Image
        className="relative"
        src="/logo.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <h1 className="text-4xl font-bold text-center">Under construction! 🚧</h1>
    </main>
  );
}
