import { Layout } from "antd";
import { Button } from "@/components/Button";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { MobileNavigation } from "./MobileNavigation";
import { NavigationMenu } from "./NavigationMenu";
import styles from "./style.module.scss";

export const HeaderLayout = () => {
  const { isCollapsed } = useBreakpoint();

  return (
    <Layout.Header className={styles["container-header"]}>
      <nav className={styles["container-header-inner"]}>
        {isCollapsed ? <MobileNavigation /> : <NavigationMenu />}

        <Button type="primary" size="large">
          Connect Wallet
        </Button>
      </nav>
    </Layout.Header>
  );
};
