-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "preferredAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Lead_preferredAt_idx" ON "Lead"("preferredAt");
