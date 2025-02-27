import { Drawer, Typography } from "antd";
import { useState } from "react";
import styles from "./style.module.scss";
import { Filter } from "../filter";
import { Button } from "@/components/Button";
import { FilterOutlined } from "@ant-design/icons";

export const FilterMobile = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Button
        icon={<FilterOutlined />}
        ghost
        onClick={() => setOpenDrawer((open) => !open)}
        className={styles["filter-mobile-button"]}
      >
        Filters & Sort
      </Button>
      <Drawer
        rootClassName={styles["filter-mobile-container"]}
        placement="left"
        width="100%"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={<Typography.Title level={3}>Filters & Sort</Typography.Title>}
      >
        <Filter />
      </Drawer>
    </>
  );
};
