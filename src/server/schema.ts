import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {v4 as uuidv4} from "uuid"

export const users = sqliteTable("user_table", {
  id: text("id",{length: 36}).primaryKey().$defaultFn(() => uuidv4()),
  username: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull()
})

