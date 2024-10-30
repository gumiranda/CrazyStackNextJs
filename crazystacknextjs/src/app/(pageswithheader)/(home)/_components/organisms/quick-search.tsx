import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const QuickSearch = () => {
  return (
    <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {quickSearchOptions.map((item) => (
        <Button className="gap-2" variant="secondary" key={item.title} asChild>
          <Link href={`/owners?service=${item.title}`}>
            <Image
              src={item.imageUrl}
              width={16}
              height={16}
              alt={item.title}
            />
            {item.title}
          </Link>
        </Button>
      ))}
    </div>
  );
};
const quickSearchOptions = [
  {
    title: "Corte de Cabelo",
    imageUrl: "/acabamento.svg",
  },
  {
    title: "Barba",
    imageUrl: "/barba.svg",
  },
  {
    title: "Coloração",
    imageUrl: "/hidratacao.svg",
  },
];
export const QuickSearchSection = () => {
  return (
    <div className="p-5 max-w-lg">
      <QuickSearch />
    </div>
  );
};
