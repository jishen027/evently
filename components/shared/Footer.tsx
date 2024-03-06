import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="felx-center wrapper flex-between flex felx-col gap-5 p5 text-center sm:flex-row">
        <Link href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            alt="Evently"
            width={128}
            height={38}
          />
        </Link>

        <p>2024 Evently. All Right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
