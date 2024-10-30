import { SearchSection } from "@/app/(pageswithheader)/_components/molecules/search";
import { HeadingHome } from "../molecules/heading-home";
import { QuickSearchSection } from "./quick-search";
import { BannerSection } from "../molecules/banner-section";

export const SubHeader = () => {
  return (
    <div className="mx-1 justify-center flex flex-col">
      <HeadingHome />
      <SearchSection />
      <QuickSearchSection />
      <BannerSection />
    </div>
  );
};
