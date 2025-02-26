import { Button as ButtonAntd, ButtonProps } from "antd";
import styles from "./style.module.scss";

export const Button = (props: ButtonProps) => {
  return (
    <ButtonAntd
      {...props}
      className={`${styles["ant-btn"]} ${props.className}`}
    >
      {props.children}
    </ButtonAntd>
  );
};
