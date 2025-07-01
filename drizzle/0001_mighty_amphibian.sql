CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`phone` text NOT NULL,
	`bank` text NOT NULL,
	`identification` text NOT NULL,
	`bank_reference` text NOT NULL,
	`amount` real NOT NULL,
	`concept` text NOT NULL,
	`student_id` text NOT NULL,
	`representative_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`representative_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payments_id_unique` ON `payments` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `payments_bank_reference_unique` ON `payments` (`bank_reference`);--> statement-breakpoint
CREATE TABLE `students` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`gender` text NOT NULL,
	`status` text NOT NULL,
	`course` numeric NOT NULL,
	`created_at` text NOT NULL,
	`representative_id` text NOT NULL,
	FOREIGN KEY (`representative_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `students_id_unique` ON `students` (`id`);--> statement-breakpoint
ALTER TABLE `users` ADD `gender` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_identification_unique` ON `users` (`identification`);