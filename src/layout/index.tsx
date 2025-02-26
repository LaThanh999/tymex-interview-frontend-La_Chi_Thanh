import { Layout } from "antd";
import { HeaderLayout } from "./header";
import { FooterLayout } from "./footer";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout className="layout-container">
        <HeaderLayout />
        {children}
        <FooterLayout /> 
      </Layout>
    </>
  );
};
