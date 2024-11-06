import Image from "next/image";

interface ServiceImageProps {
  src: string;
  alt: string;
}

export const ServiceImage = ({ src, alt }: ServiceImageProps) => {
  return (
    <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
      <Image src={src} alt={alt} fill className="rounded-lg object-cover" />
    </div>
  );
};
