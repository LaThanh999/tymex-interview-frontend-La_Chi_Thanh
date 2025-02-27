import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

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
        <div className={styles.spinner}></div>
        <div className={styles.pulse}></div>
      </div>
    </div>
  );
};

export default LoadingPage;
