-- AlterTable
ALTER TABLE "SubTask" ALTER COLUMN "deleted" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "deleted" DROP NOT NULL;
