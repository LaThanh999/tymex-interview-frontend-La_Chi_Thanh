import {
  Button,
  Col,
  Divider,
  Flex,
  Input,
  Layout,
  Row,
  Typography,
} from "antd";

import { NAVIGATION_ITEMS } from "@/constants/common";
import Link from "next/link";
import styles from "./style.module.scss";

const renderItem = ({ path, label }: { path: string; label: string }) => (
  <Link href={path} key={path}>
    <Typography.Text>{label}</Typography.Text>
  </Link>
);

export const FooterLayout = () => (
  <Layout.Footer className={styles["footer-container"]}>
    <div className={styles["footer-container-inner"]}>
      <Row gutter={[0, 48]}>
        <Col xl={8} md={14} xs={24}>
          <Typography.Title level={4}>Navigation</Typography.Title>
          <Flex gap={32}>
            <Flex vertical gap={12}>
              {[
                NAVIGATION_ITEMS.HOME,
                NAVIGATION_ITEMS.ABOUT_US,
                NAVIGATION_ITEMS.OUR_TEAMS,
              ].map((el) => renderItem(el))}
            </Flex>
            <Flex vertical gap={12}>
              {[
                NAVIGATION_ITEMS.WHITEPAPER,
                NAVIGATION_ITEMS.MARKETPLACE,
                NAVIGATION_ITEMS.ROADMAP,
              ].map((el) => renderItem(el))}
            </Flex>
            <Flex vertical gap={12}>
              {[
                NAVIGATION_ITEMS.FAQS,
                NAVIGATION_ITEMS.NEWS,
                NAVIGATION_ITEMS.COMMUNITY,
              ].map((el) => renderItem(el))}
            </Flex>
          </Flex>
        </Col>
        <Col xl={6} md={10} xs={24}>
          <Typography.Title level={4}>Contact Us</Typography.Title>
          <Flex vertical gap={24}>
            <a href="tel:+01234568910" target="_blank" rel="noreferrer">
              <Flex gap={8}>
                <Typography.Text>01234568910</Typography.Text>
              </Flex>
            </a>
            <a
              href="mailto:tymex-talent@tyme.com"
              target="_blank"
              rel="noreferrer"
            >
              <Flex gap={8}>
                <Typography.Text>tymex-talent@tyme.com</Typography.Text>
              </Flex>
            </a>
          </Flex>
        </Col>
        <Col xl={10} xs={24}>
          <Typography.Title level={4}>
            Subcribe to receive our latest update
          </Typography.Title>
          <Flex gap={20}>
            <Input size="large" placeholder="Your email address" />
            <Button size="large" type="primary">
              Subcribe
            </Button>
          </Flex>
        </Col>
      </Row>
      <Divider />
      <Row justify="space-between" gutter={[0, 24]}>
        <Col xs={24} md={12}>
          <Typography.Text>
            ©2023 Tyme - Edit. All Rights reserved.
          </Typography.Text>
        </Col>
        <Col xs={24} md={12}>
          <Flex gap={60} justify="flex-end" align="center">
            {[
              NAVIGATION_ITEMS.SECURITY,
              NAVIGATION_ITEMS.LEGAL,
              NAVIGATION_ITEMS.PRIVACY,
            ].map(renderItem)}
          </Flex>
        </Col>
      </Row>
    </div>
  </Layout.Footer>
);
