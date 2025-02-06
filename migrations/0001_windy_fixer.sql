ALTER TABLE "user" DROP CONSTRAINT "email_unique";--> statement-breakpoint
ALTER TABLE "todo" DROP CONSTRAINT "todo_author_user_email_fk";
--> statement-breakpoint
ALTER TABLE "todo" DROP COLUMN "author";