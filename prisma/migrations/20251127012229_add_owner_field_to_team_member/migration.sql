-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "owner" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "TeamMember_owner_idx" ON "TeamMember"("owner");
