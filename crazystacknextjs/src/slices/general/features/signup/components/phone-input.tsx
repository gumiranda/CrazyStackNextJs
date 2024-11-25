import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  parsePhoneNumberFromString,
  AsYouType,
  isValidPhoneNumber,
  CountryCode,
} from "libphonenumber-js";
import { useEffect, useState } from "react";
import { AlertCircle, Check, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InputMask, useMask, format } from "@react-input/mask";

// Opções de configuração para a máscara do input
// const options = {
//   mask: "+0 (___) ___-__-__", // Define o formato da máscara
//   replacement: { _: /\d/ }, // Define que _ deve ser substituído por dígitos
// };

// Componente de exemplo do input com máscara
// export default function App() {
//   const inputRef = useMask(options); // Hook para aplicar a máscara
//   const defaultValue = format("1234567890", options); // Formata o valor inicial

//   return <input ref={inputRef} defaultValue={defaultValue} />; // Renderiza o input com a máscara
// }
type Country = {
  name: string;
  code: string;
  phone: string;
  flag: string;
  format: string;
  mask: string;
};

const countries = [
  {
    name: "Brazil",
    code: "BR",
    phone: "55",
    flag: "🇧🇷",
    format: "(99) 99999-9999",
    mask: "(__) _____-____",
  },
  {
    name: "United States",
    code: "US",
    phone: "1",
    flag: "🇺🇸",
    format: "(999) 999-9999",
    mask: "(__) _____-____",
  },
  {
    name: "Afghanistan",
    code: "AF",
    phone: "93",
    flag: "🇦🇫",
    format: "999 999 999",
    mask: "____ _____",
  },
  {
    name: "Albania",
    code: "AL",
    phone: "355",
    flag: "🇦🇱",
    format: "999 999 999",
    mask: "_________",
  },
  {
    name: "Algeria",
    code: "DZ",
    phone: "213",
    flag: "🇩🇿",
    format: "999 999 999",
    mask: "____ _____",
  },
  {
    name: "Argentina",
    code: "AR",
    phone: "54",
    flag: "🇦🇷",
    format: "(999) 999-9999",
    mask: "(__) _____-____",
  },
  {
    name: "Australia",
    code: "AU",
    phone: "61",
    flag: "🇦🇺",
    format: "999 999 999",
    mask: "(__) _____-____",
  },
  {
    name: "Austria",
    code: "AT",
    phone: "43",
    flag: "🇦🇹",
    format: "999 999 999",
    mask: "(__) _____-____",
  },
  {
    name: "Belgium",
    code: "BE",
    phone: "32",
    flag: "🇧🇪",
    format: "999 999 999",
    mask: "(__) _____-____",
  },
  {
    name: "Canada",
    code: "CA",
    phone: "1",
    flag: "🇨🇦",
    format: "(999) 999-9999",
    mask: "(__) _____-____",
  },
  {
    name: "China",
    code: "CN",
    phone: "86",
    flag: "🇨🇳",
    format: "999 999 9999",
    mask: "____ _____",
  },
  {
    name: "Colombia",
    code: "CO",
    phone: "57",
    flag: "🇨🇴",
    format: "999 999 9999",
    mask: "____ _____",
  },
  {
    name: "France",
    code: "FR",
    phone: "33",
    flag: "🇫🇷",
    format: "99 99 99 99 99",
    mask: "____ _____",
  },
  {
    name: "Germany",
    code: "DE",
    phone: "49",
    flag: "🇩🇪",
    format: "999 999 9999",
    mask: "(__) _____-____",
  },
  {
    name: "India",
    code: "IN",
    phone: "91",
    flag: "🇮🇳",
    format: "99999 99999",
    mask: "____ _____",
  },
  {
    name: "Italy",
    code: "IT",
    phone: "39",
    flag: "🇮🇹",
    format: "999 999 9999",
    mask: "(__) _____-____",
  },
  {
    name: "Japan",
    code: "JP",
    phone: "81",
    flag: "🇯🇵",
    format: "999 999 9999",
    mask: "(__) _____-____",
  },
  {
    name: "Mexico",
    code: "MX",
    phone: "52",
    flag: "🇲🇽",
    format: "999 999 9999",
    mask: "(__) _____-____",
  },
  {
    name: "Portugal",
    code: "PT",
    phone: "351",
    flag: "🇵🇹",
    format: "999 999 999",
    mask: "(__) _____-____",
  },
  {
    name: "Spain",
    code: "ES",
    phone: "34",
    flag: "🇪🇸",
    format: "999 999 999",
    mask: "(__) _____-____",
  },
  {
    name: "United Kingdom",
    code: "GB",
    phone: "44",
    flag: "🇬🇧",
    format: "9999 999999",
    mask: "____ _____",
  },
] as const as Country[];

interface PhoneInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  disabled: boolean;
  register: any;
  error?: string;
  formProps: any;
}

export const PhoneInput = ({
  label,
  id,
  type,
  placeholder,
  disabled,
  register,
  error,
  formProps,
}: PhoneInputProps) => {
  const { setValue, watch } = formProps;
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const phone = watch("phone");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const validateAndFormatPhone = (value: string, country: Country) => {
    try {
      const digitsOnly = value.replace(/\D/g, "");
      const formatter = new AsYouType(country.code as CountryCode);
      const formattedNumber = formatter.input(digitsOnly);
      const fullNumber = `+${country.phone}${digitsOnly}`;
      const isValid = isValidPhoneNumber(
        fullNumber,
        country.code as CountryCode,
      );

      const phoneNumber = parsePhoneNumberFromString(
        fullNumber,
        country.code as CountryCode,
      );

      setIsPhoneValid(isValid);
      setPhoneError(isValid ? "" : "Número de telefone inválido");

      return {
        formatted: formattedNumber,
        isValid,
        phoneNumber,
      };
    } catch (error) {
      setIsPhoneValid(false);
      setPhoneError("Formato inválido");
      return {
        formatted: value,
        isValid: false,
        phoneNumber: null,
      };
    }
  };

  // useEffect(() => {
  //  if (phone) {
  //    const { formatted } = validateAndFormatPhone(phone, selectedCountry);
  //   setValue("phone", formatted, { shouldValidate: true });
  //  }
  //  }, [phone, selectedCountry, setValue]);
  console.log(selectedCountry);
  return (
    <div className="space-y-2">
      <Label htmlFor="phone" className="text-sm text-gray-400">
        {label}
      </Label>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-[140px] justify-between bg-background text-muted-foreground hover:bg-background"
            >
              <span className="flex items-center gap-2 truncate">
                <span className="flex items-center">
                  <img
                    src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                    width="20"
                    height="15"
                    alt={selectedCountry.name}
                    className="mr-2"
                  />
                  (+{selectedCountry.code})
                </span>
              </span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] bg-background">
            <div className="flex items-center border-b px-3 py-2">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <Input
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 bg-transparent text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <ScrollArea className="h-[200px]">
              {filteredCountries.map((country) => (
                <DropdownMenuItem
                  key={country.code}
                  onClick={() => {
                    setValue("country", {
                      code: country.code,
                      phone: country.phone,
                    });
                    setSelectedCountry(country);
                    setValue("phone", "");
                    setPhoneError("");
                    setIsPhoneValid(false);
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:bg-background"
                >
                  <span className="flex items-center">
                    <img
                      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                      width="20"
                      height="15"
                      alt={country.name}
                      className="mr-2"
                    />
                    (+{country.code}) {country.name}
                  </span>
                  <span className="ml-auto text-gray-400">
                    +{country.phone}
                  </span>
                  {selectedCountry.code === country.code && (
                    <Check className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex-1 space-y-2">
          <InputMask
            id="phone"
            type={type}
            className={`bg-background text-muted-foreground ${
              phoneError
                ? "border-red-500 focus-visible:ring-red-500"
                : isPhoneValid
                ? "border-green-500 focus-visible:ring-green-500"
                : ""
            }`}
            placeholder={selectedCountry.format}
            required
            component={Input}
            mask={selectedCountry.mask}
            label={label}
            onMask={(e) => {
              console.log(e.target.value);
              //setValue("phone", e.target.value);
            }}
            replacement={
              //   selectedCountry?.mask?.includes?.("(")
              //   ? { _: /\d/, A: /[a-zA-Z0-9]/, X: /[a-zA-Z]/ }
              // :
              { _: /\d/ }
            }
            defaultValue={""}
            {...register("phone")}
          />
          {phoneError && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{phoneError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
