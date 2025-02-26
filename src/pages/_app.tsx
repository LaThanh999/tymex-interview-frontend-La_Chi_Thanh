import 'antd/dist/reset.css';
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import theme from "../theme/themeConfig";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
