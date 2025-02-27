import "antd/dist/reset.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import theme from "../theme/themeConfig";
import { DefaultLayout } from "@/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TopProgressBar from "@/components/TopProgressBar";
import "nprogress/nprogress.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <TopProgressBar />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
