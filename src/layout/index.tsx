import { Layout } from "antd";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
};
