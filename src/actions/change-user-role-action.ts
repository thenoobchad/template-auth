"use server"
import { findUserByEmail } from "@/resources/user-queries"
import { db } from "@/server/db"
import { users } from "@/server/schema"
import { eq } from "drizzle-orm"

export async function changeUserRoleAction(email: string, newRole: (typeof users.$inferSelect["role"])) {
    const existingUser = await findUserByEmail(email)

    if (existingUser?.id && existingUser.role !== newRole) {
        await db.update(users).set({role: newRole}).where(eq(users.id, existingUser.id))
    }
}