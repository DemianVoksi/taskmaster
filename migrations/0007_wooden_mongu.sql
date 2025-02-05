ALTER TABLE "todo" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "todo" ALTER COLUMN "id" SET DEFAULT nextval('todo_id_seq');