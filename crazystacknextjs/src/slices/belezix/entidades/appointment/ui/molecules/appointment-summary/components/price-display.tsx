interface PriceDisplayProps {
  name: string;
  price: number;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  name,
  price = 0.99,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-bold">{name}</h2>
      {price && (
        <p className="text-md font-bold">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </p>
      )}
    </div>
  );
};
