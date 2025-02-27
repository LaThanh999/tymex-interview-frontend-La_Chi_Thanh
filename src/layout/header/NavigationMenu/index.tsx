import { Menu } from "antd";
import { NAVIGATION_ITEMS } from "@/constants/common";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

export const NavigationMenu = ({
  mode = "horizontal",
}: {
  mode?: "horizontal" | "vertical";
}) => {
  const router = useRouter();
  const { pathname, push } = router;

  return (
    <>
      <Menu
        className={styles["navigation-menu-wrapper"]}
        theme="dark"
        mode={mode}
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
          onClick: () => {
            push(navigationItem.path);
          },
        }))}
      />
    </>
  );
};
