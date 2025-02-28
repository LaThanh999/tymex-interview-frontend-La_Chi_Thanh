import { render, screen } from "@testing-library/react";
import { BannerSection } from ".";
import "@testing-library/jest-dom";

describe("BannerSection", () => {
  it("renders all images correctly", () => {
    render(<BannerSection />);

    const bgBannerImage = screen.getByAltText("bg-banner-section");
    const newArrivalImage = screen.getByAltText("new_arrival");
    const listItemBannerImage = screen.getByAltText("list-item-banner-section");
    const itemBannerImage = screen.getByAltText("item-banner-section");
    const bgTextTheDJImage = screen.getByAltText("bg-text-the-DJ");
    const textTheDJImage = screen.getByAltText("text-the-DJ");

    expect(bgBannerImage).toHaveAttribute("loading", "lazy");
    expect(newArrivalImage).toHaveAttribute("loading", "lazy");
    expect(listItemBannerImage).toHaveAttribute("loading", "lazy");
    expect(itemBannerImage).toHaveAttribute("loading", "lazy");
    expect(bgTextTheDJImage).toHaveAttribute("loading", "lazy");
    expect(textTheDJImage).toHaveAttribute("loading", "lazy");
  });

  it("renders container divs correctly", () => {
    const { container } = render(<BannerSection />);

    const bannerSectionContainer = container.querySelector(
      ".banner-section-container"
    );
    const itemNewArrival = container.querySelector(".item_new_arrival");
    const listItemBannerSection = container.querySelector(
      ".list-item-banner-section"
    );
    const itemBannerSectionContainer = container.querySelector(
      ".item-banner-section-container"
    );
    const itemBannerSectionInner = container.querySelector(
      ".item-banner-section-inner"
    );

    expect(bannerSectionContainer).toBeInTheDocument();
    expect(itemNewArrival).toBeInTheDocument();
    expect(listItemBannerSection).toBeInTheDocument();
    expect(itemBannerSectionContainer).toBeInTheDocument();
    expect(itemBannerSectionInner).toBeInTheDocument();
  });
});
