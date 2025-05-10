import { Listing, Reservation, User } from "@/app/generated/prisma";

export type SafeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type safeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "enddate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  enddate: string;
  listing: SafeListings;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
