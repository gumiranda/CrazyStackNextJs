import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Molecules
interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  disabled: boolean;
  register: any;
  error?: string;
}

export const FormField = ({
  label,
  id,
  type,
  placeholder,
  disabled,
  register,
  error,
}: FormFieldProps) => (
  <div className="grid gap-3">
    <Label htmlFor={id} className="sr-only">
      {label}
    </Label>
    <Input
      id={id}
      placeholder={placeholder}
      type={type}
      autoCapitalize="none"
      autoComplete={type}
      autoCorrect="off"
      disabled={disabled}
      {...register(id)}
    />
    {error && <p className="text-destructive text-sm">{error}</p>}
  </div>
);
