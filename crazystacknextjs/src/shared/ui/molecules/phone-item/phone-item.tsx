"use client";

import { Button } from "@/components/ui/button";
import { SmartphoneIcon } from "lucide-react";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Telefone copiado com sucesso!");
  };

  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  );
};
