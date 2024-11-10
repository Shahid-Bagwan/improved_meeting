import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center p-4 border-b">
      <div className="flex items-center gap-2">
        <Image
          src="/placeholder.svg"
          alt="Google Meet"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <span className="text-xl font-medium">Google Meet</span>
      </div>
    </header>
  );
}
