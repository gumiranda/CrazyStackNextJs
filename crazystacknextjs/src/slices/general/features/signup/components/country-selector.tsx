/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Check, Search } from "lucide-react";
export type Country = {
  name: string;
  code: string;
  phone: string;
  flag: string;
  format: string;
  mask: string;
};

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  setValue: (field: string, value: any) => void;
  setPhone: (value: string) => void;
}

export const CountrySelector = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  setSearchTerm,
  searchTerm,
  setValue,
  setPhone,
}: CountrySelectorProps) => {
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[140px] justify-between bg-background"
        >
          <span className="flex items-center gap-2 truncate">
            <img
              src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
              width="20"
              alt={selectedCountry.name}
              className="mr-2"
            />
            (+{selectedCountry.code})
          </span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] bg-background">
        <div className="flex items-center border-b px-3 py-2">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <Input
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 bg-transparent"
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
                setPhone("");
              }}
              className="flex items-center gap-2"
            >
              <span className="flex items-center">
                <img
                  src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                  width="20"
                  alt={country.name}
                  className="mr-2"
                />
                (+{country.code}) {country.name}
              </span>
              {selectedCountry.code === country.code && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
