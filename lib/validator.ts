import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(100, "The description must be less than 100 characters."),
  location: z.string().min(3, "Location must be at least 3 characters."),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
