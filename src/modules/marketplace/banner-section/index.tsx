import styles from "./style.module.scss";
import Image from "next/image";

export const BannerSection = () => {
  return (
    <>
      <div className={styles["banner-section-container"]}>
        <Image
          loading="lazy"
          src="/assets/images/bg-banner-section.jpeg"
          fill
          alt="bg-banner-section"
        />
        <div className={styles["item_new_arrival"]}>
          <Image
            loading="lazy"
            src="/assets/images/new_arrival.png"
            layout="responsive"
            width={100}
            height={100}
            alt="new_arrival"
          />
        </div>
        <div className={styles["list-item-banner-section"]}>
          <Image
            loading="lazy"
            src="/assets/images/list-item-banner-section.png"
            layout="responsive"
            width={100}
            height={100}
            alt="list-item-banner-section"
          />
        </div>
        <div className={styles["item-banner-section-container"]}>
          <div className={styles["item-banner-section-inner"]}>
            <Image
              loading="lazy"
              src="/assets/images/item-banner-section.png"
              layout="responsive"
              width={100}
              height={100}
              quality={100}
              alt="item-banner-section"
              className={styles["item-banner-section"]}
            />
            <Image
              loading="lazy"
              src="/assets/images/bg-text-the-DJ.png"
              layout="responsive"
              width={100}
              height={100}
              quality={100}
              alt="bg-text-the-DJ"
              className={styles["bg-text-the-DJ"]}
            />
            <div className={styles["text-the-DJ-container"]}>
              <Image
                loading="lazy"
                src="/assets/images/text-the-DJ.png"
                layout="responsive"
                width={100}
                height={100}
                alt="text-the-DJ"
                className={styles["text-the-DJ"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
