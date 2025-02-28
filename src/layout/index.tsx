import { Layout } from "antd";
import { HeaderLayout } from "./header";
import { FooterLayout } from "./footer";
import Image from "next/image";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout
        className="layout-container"
        style={{ backgroundImage: "url('/assets/images/background.png')" }}
      >
        <HeaderLayout />
        {children}
        <Image
          src="/assets/images/section-frame.png"
          layout="responsive"
          width={100}
          height={100}
          alt="footer-frame"
          priority
        />
        <FooterLayout />
      </Layout>
    </>
  );
};
