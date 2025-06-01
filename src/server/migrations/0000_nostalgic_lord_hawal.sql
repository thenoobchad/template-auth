CREATE TABLE `user_table` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_table_email_unique` ON `user_table` (`email`);