import { Star, StarHalf } from "lucide-react";

type Props = {
  rating: number;
};

export default function Rating({ rating }: Props) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <span className="text-star inline-flex">
      {Array.from({ length: 5 }, (_, index) => {
        if (index < fullStars) {
          return <Star key={index} className="size-4.5 fill-current" />;
        }

        return (
          <span key={index} className="relative size-4.5">
            <Star className="size-4.5" />
            {index === fullStars && hasHalfStar && (
              <StarHalf className="absolute inset-0 size-4.5 fill-current" />
            )}
          </span>
        );
      })}
    </span>
  );
}
