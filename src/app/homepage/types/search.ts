export type SearchType = "Tour" | "Hotel" | "Flight" | "Transfer"| "Visa" |"Restaurant"| "Cruise";
export interface SearchQuery {
  type: SearchType;
  destination: string;
}


