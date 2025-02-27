import React from "react";
import Link from "next/link";
import { Result, Typography } from "antd";
import { NAVIGATION_ITEMS } from "@/constants/common";
import { Button } from "@/components/Button";

const Page404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle={
        <Typography.Title level={5}>
          Sorry, the page you visited does not exist.
        </Typography.Title>
      }
      extra={
        <Link href={NAVIGATION_ITEMS.MARKETPLACE.path}>
          <Button size="large" type="primary">
            Go to Marketplace Page
          </Button>
        </Link>
      }
    />
  );
};

export default Page404;
