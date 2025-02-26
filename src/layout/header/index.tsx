import { NAVIGATION_ITEMS } from "@/constants/common";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { Button } from "@/components/Button";

export const HeaderLayout = () => {
  const router = useRouter();

  const { pathname } = router;

  return (
    <Layout.Header className={styles["container-header"]}>
      <nav className={styles["container-header-inner"]}>
        <Menu
          className={styles["navigation-menu-wrapper"]}
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={[
            NAVIGATION_ITEMS.HOME,
            NAVIGATION_ITEMS.ABOUT_US,
            NAVIGATION_ITEMS.OUR_TEAMS,
            NAVIGATION_ITEMS.MARKETPLACE,
            NAVIGATION_ITEMS.ROADMAP,
            NAVIGATION_ITEMS.WHITEPAPER,
          ].map((navigationItem) => ({
            key: navigationItem.path,
            label: navigationItem.label,
          }))}
        />
        <Button type="primary" size="large">
          Connect Wallet
        </Button>
      </nav>
    </Layout.Header>
  );
};
