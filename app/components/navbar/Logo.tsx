"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      width="50"
      height="50"
      className="hidden md:block cursor-pointer "
      src="/images/logo.svg"
    />
  );
};

export default Logo;
