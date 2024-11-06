import Image from "next/image";

export const BannerSection = () => {
  return (
    <div className="p-5 max-w-lg">
      <div className="relative mt-6 h-[150px] w-full">
        <Image
          src="/banner.png"
          fill
          className="rounded-xl object-cover"
          alt="Agende nos melhores estabelecimentos"
        />
      </div>
    </div>
  );
};
