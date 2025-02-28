import { Avatar, Badge, Card, Flex, Tag, Typography } from "antd";
import Image from "next/image";
import { IHeart } from "@/icons/IHeart";
import { formatPrice } from "@/helpers/common";
import styles from "./style.module.scss";
import { IOnline } from "@/icons/IOnline";
import { TProduct } from "@/types/product";
import { IOffline } from "@/icons/IOffline";

const IconEthereum = () => (
  <Image
    src="/assets/icons/ethereum.svg"
    alt="icon-ethereum"
    quality={100}
    width={8}
    height={12}
  />
);

export const ProductCart = ({ data }: { data: TProduct }) => {
  return (
    <>
      <Card className={styles["card-product-container"]}>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "100%",
            overflow: "hidden",
          }}
        >
          <div className={styles["image-product"]}>
            <Image
              src={
                data.backgroundItem
                  ? `/assets/images/${data.backgroundItem}.png`
                  : `/assets/images/bg-item-1.png`
              }
              fill
              alt="item-nft"
              quality={100}
            />
            <div className={styles["image-product-item"]}>
              <Image
                src={
                  data.item
                    ? `/assets/images/${data.item}.png`
                    : `/assets/images/item-1.png`
                }
                fill
                alt="item-nft"
                quality={100}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles["icon-heart"]}>
          <IHeart />
        </div>

        {data.category && (
          <Tag className={styles["tag-product-category"]}>{data.category}</Tag>
        )}

        <Flex
          className={styles["product-info"]}
          align="flex-start"
          justify="space-between"
          gap={12}
        >
          <div className={styles["product-name"]}>{data?.nameItem}</div>
          <Flex className={styles["product-price"]} gap={8} align="center">
            <IconEthereum />
            <span>{formatPrice(data.price)}</span>
          </Flex>
        </Flex>
        <Flex align="center" gap={12}>
          <Badge
            className={styles["creator-avatar-container"]}
            count={
              <Avatar
                className={styles["creator-avatar-status"]}
                size={12}
                icon={data.statusOnline ? <IOnline /> : <IOffline />}
              />
            }
          >
            <Avatar src={"/assets/images/avt-creator.png"} size={32} />
          </Badge>
          <Typography.Text ellipsis className={styles["creator-name"]}>
            {data.nameCreator}
          </Typography.Text>
        </Flex>
      </Card>
    </>
  );
};
