export type Experience = {
  experienceId: string;
  title: string;
  tourType: string;
  destination: string;
  duration: {
    total: string;
  };
  images: string[];
  priceRange: {
    currency: string;
    adult: number;
  };
  rating: {
    score: number;
  };
  cancellationPolicy: {
    type: string;
  };
};
