type Props = {
  count: number;
};

export default function CountBadge({ count }: Props) {
  if (count === 0) return null;

  return (
    <span className="bg-primary text-primary-foreground absolute -top-3 left-2.5 grid size-5.5 place-items-center rounded-full text-xs">
      {count > 99 ? "99+" : count}
    </span>
  );
}
