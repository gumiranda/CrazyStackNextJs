interface ServiceDetailsProps {
  name: string;
  description: string;
  price: number;
  children: React.ReactNode;
}

export const ServiceDetails = ({
  name,
  description,
  price,
  children,
}: ServiceDetailsProps) => {
  return (
    <>
      <h3 className="text-sm font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{description}</p>

      <div className="lg:flex-row flex-col flex lg:items-center justify-between min-w-40">
        <p className="lg:mb-0 mb-2 text-md font-bold dark:text-lime-400 text-primary mr-3">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </p>
        {children}
      </div>
    </>
  );
};
