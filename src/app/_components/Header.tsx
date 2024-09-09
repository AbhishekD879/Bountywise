import { Button } from "@/components/ui/button";
import CONSTANT from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Modal } from "./Modal";
import AuthForm from "./AuthForm";

// Define type for the nested Cta component
interface CtaProps {
  children?: React.ReactNode;
}

interface Cta extends React.FC<CtaProps> {
  PostABountyCta?: React.FC;
  JoinAsAHunterCta?: React.FC;
}

// Define type for the Header component
interface HeaderComponent extends React.FC<React.PropsWithChildren<{}>> {
  Logo: React.FC;
  Cta?: Cta;
}

// Define the Header component
const Header: HeaderComponent = ({ children }) => {
  return (
    <header className="px-6 py-4 bg-white shadow-md rounded-r-sm rounded-l-sm flex max-xl:px-[20%]">
      {children}
    </header>
  );
};

// Add nested components
Header.Logo = function Logo() {
  return (
    <Link href="/" className="flex flex-1 items-center gap-px">
      <Image alt={CONSTANT.BRAND} width={44} height={44} src="/logo.svg" />
      <span className="text-2xl font-semibold first-letter:text-4xl first-letter:font-normal">
        {CONSTANT.BRAND}
      </span>
    </Link>
  );
};

Header.Cta = function Cta({ children }: CtaProps) {
  return <div className="flex gap-4">{children}</div>;
};

Header.Cta.PostABountyCta = function PostABountyCta() {
  "use client";
  return (
    <Modal modalComponent={<AuthForm/>}>
      <Button className="bg-accentOrange hover:bg-accentOrange/80">
        {CONSTANT.LOGIN_CTA}
      </Button>
    </Modal>
  ); // Example implementation
};

Header.Cta.JoinAsAHunterCta = function JoinAsAHunterCta() {
  "use client";
  return <Modal modalComponent={<AuthForm/>}>
    <Button>{CONSTANT.SIGNUP_CTA}</Button>
  </Modal>;
};

export default Header;
