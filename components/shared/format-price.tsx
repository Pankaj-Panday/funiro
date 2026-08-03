type Props = {
  price: number;
  className?: string;
};

export default function FormatPrice({ price, className }: Props) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);
  return <span className={className}>{formattedPrice}</span>;
}
