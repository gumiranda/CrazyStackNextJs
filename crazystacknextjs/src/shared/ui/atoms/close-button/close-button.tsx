import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const CloseButton = ({ onClose }: any) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <Button onClick={onClose}>
      {t("PAGES:MESSAGES.okUnderstand", {
        defaultValue: "Ok, entendi",
      })}
    </Button>
  );
};
