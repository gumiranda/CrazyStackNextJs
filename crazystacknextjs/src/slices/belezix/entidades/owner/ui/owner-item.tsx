import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OwnerItemProps {
  item: any;
}

export const OwnerItem = ({ item }: OwnerItemProps) => {
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        <div
          className={`relative h-[159px] w-full ${
            !item?.place?.profilephoto ? "bg-secondary rounded-2xl" : ""
          }`}
        >
          {item?.place?.profilephoto && (
            <Image
              fill
              alt={item?.name}
              className="rounded-2xl object-cover"
              src={
                item?.place?.profilephoto
                //  "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          )}

          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">4,7</p>
          </Badge>
        </div>
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{item?.name}</h3>
          <p className="truncate text-sm text-gray-400">
            {item?.place?.address ?? "Sem endereço"}
          </p>
          <Button variant="secondary" asChild className="mt-3 w-full">
            <Link href={`/owners/${item?._id}`}>Agendar</Link>
          </Button>
        </div>
      </CardContent>{" "}
    </Card>
  );
};
