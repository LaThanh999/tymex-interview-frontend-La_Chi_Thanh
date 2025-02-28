import { Flex, Layout } from "antd";
import { Button } from "@/components/Button";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { MobileNavigation } from "./MobileNavigation";
import { NavigationMenu } from "./NavigationMenu";
import styles from "./style.module.scss";
import { IGlobe } from "@/icons/IGlobe";
import { ICaretDown } from "@/icons/ICaretDown";

export const HeaderLayout = () => {
  const { isCollapsed } = useBreakpoint();

  return (
    <Layout.Header className={styles["container-header"]}>
      <nav className={styles["container-header-inner"]}>
        {isCollapsed ? <MobileNavigation /> : <NavigationMenu />}

        <Flex gap={12}>
          <Button type="primary" size="large">
            Connect Wallet
          </Button>
          <Flex className={styles["region-menu"]} align="center" gap={8}>
            <IGlobe />
            <ICaretDown />
          </Flex>
        </Flex>
      </nav>
    </Layout.Header>
  );
};
