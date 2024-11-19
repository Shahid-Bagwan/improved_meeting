import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center  border-b">
      <div className="flex items-center gap-2">
        <Image
          src="/spread-main-logo.png"
          alt="Google Meet"
          width={400}
          height={400}
          quality={100}
          className="w-52 h-14"
        />
      </div>
    </header>
  );
}
