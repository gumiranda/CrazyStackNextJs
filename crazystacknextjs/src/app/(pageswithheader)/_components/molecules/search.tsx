"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "Digite algo para buscar" }),
});

export const Search = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/owners?title=${data.title}`);
  };
  return (
    <Form {...form}>
      <form className="flex gap-3" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Faça sua busca..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
};

export const SearchSection = () => {
  return (
    <div className="p-5 max-w-lg">
      <Search />
    </div>
  );
};
