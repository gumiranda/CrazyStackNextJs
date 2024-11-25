import { InputMask } from "@react-input/mask";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PhoneInputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  phoneError: string;
  isPhoneValid: boolean;
  mask: string;
  onChange: (value: string) => void;
}

export const PhoneInputField = ({
  id,
  type,
  placeholder,
  phoneError,
  isPhoneValid,
  mask,
  onChange,
}: PhoneInputFieldProps) => {
  return (
    <div className="flex-1 space-y-2">
      <InputMask
        id={id}
        type={type}
        className={`bg-background ${
          phoneError ? "border-red-500" : isPhoneValid ? "border-green-500" : ""
        }`}
        placeholder={placeholder}
        mask={mask}
        onChange={(e) => onChange(e.target.value)}
        replacement={{ _: /\d/ }}
        component={Input}
      />
      {phoneError && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{phoneError}</span>
        </div>
      )}
    </div>
  );
};
