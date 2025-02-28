import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Spin } from "antd";

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (!loading) return null;

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    </div>
  );
};

export default LoadingPage;
