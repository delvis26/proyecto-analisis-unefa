DROP INDEX "payments_id_unique";--> statement-breakpoint
DROP INDEX "payments_bank_reference_unique";--> statement-breakpoint
DROP INDEX "students_id_unique";--> statement-breakpoint
DROP INDEX "users_id_unique";--> statement-breakpoint
DROP INDEX "users_identification_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
DROP INDEX "users_phone_unique";--> statement-breakpoint
DROP INDEX "users_adress_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "gender" TO "gender" text;--> statement-breakpoint
CREATE UNIQUE INDEX `payments_id_unique` ON `payments` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `payments_bank_reference_unique` ON `payments` (`bank_reference`);--> statement-breakpoint
CREATE UNIQUE INDEX `students_id_unique` ON `students` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_identification_unique` ON `users` (`identification`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_adress_unique` ON `users` (`adress`);