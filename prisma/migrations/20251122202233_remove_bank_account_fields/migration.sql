-- AlterTable
ALTER TABLE "CourseRegistration" ADD COLUMN     "paymentReceiptUrl" TEXT,
ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'pending_payment';

-- CreateTable
CREATE TABLE "CourseSchedule" (
    "id" SERIAL NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "schedule" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseSchedule_courseId_key" ON "CourseSchedule"("courseId");
