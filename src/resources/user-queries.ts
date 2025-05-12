import "server-only"

import { db } from "@/server/db";
import { lower, users } from "@/server/schema";
import { eq, getTableColumns } from "drizzle-orm";

export const findUserByEmail = async (email: string): Promise<typeof users.$inferSelect | null > => {
  const user = await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()))
    .then((res) => res[0] ?? null);

  return user;
};

type UserWithoutPassword = Omit<typeof users.$inferSelect,"password">

export const findUserById = async (id: string): Promise<UserWithoutPassword> => {
  const { password, ...rest } = getTableColumns(users);

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0] ?? null);

  if (!user) throw new Error("User not found");

  return user;
};
