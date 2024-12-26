CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL,
	`role_user` text NOT NULL,
	`full_name` text NOT NULL,
	`identification` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`adress` text NOT NULL,
	`status` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_adress_unique` ON `users` (`adress`);