import { Spin } from "antd";
import styles from "./style.module.scss";

export const LoadingSpinner = () => {
  return (
    <div className={styles["loading-spinner"]}>
      <Spin size="large" />
    </div>
  );
};
