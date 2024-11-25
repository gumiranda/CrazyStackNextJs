import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CountrySelector, type Country } from "./country-selector";
import { PhoneInputField } from "./phone-input-field";
import parsePhoneNumberFromString, {
  AsYouType,
  isValidPhoneNumber,
  type CountryCode,
} from "libphonenumber-js";

export const PhoneInput = ({ label, id, type, formProps }: any) => {
  const { setValue } = formProps;
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const validateAndFormatPhone = (value: string) => {
    try {
      const digitsOnly = value.replace(/\D/g, "");
      const formatter = new AsYouType(selectedCountry.code as CountryCode);
      const formattedNumber = formatter.input(digitsOnly);
      const fullNumber = `+${selectedCountry.phone}${digitsOnly}`;
      const isValid = isValidPhoneNumber(
        fullNumber,
        selectedCountry.code as CountryCode,
      );

      const phoneNumber = parsePhoneNumberFromString(
        fullNumber,
        selectedCountry.code as CountryCode,
      );

      setIsPhoneValid(isValid);
      setPhoneError(isValid ? "" : "Invalid phone number");
      setValue("phone", formattedNumber);
      return { formatted: formattedNumber, isValid, phoneNumber };
    } catch (error) {
      setIsPhoneValid(false);
      setPhoneError("Invalid format");
      setValue("phone", value);
      return { formatted: value, isValid: false, phoneNumber: null };
    }
  };
  return (
    <div className="space-y-2">
      <Label htmlFor="phone">{label}</Label>
      <div className="flex gap-2">
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          setValue={setValue}
        />
        <PhoneInputField
          id={id}
          type={type}
          placeholder={selectedCountry.format}
          phoneError={phoneError}
          isPhoneValid={isPhoneValid}
          mask={selectedCountry.mask}
          onChange={validateAndFormatPhone}
        />
      </div>
    </div>
  );
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
