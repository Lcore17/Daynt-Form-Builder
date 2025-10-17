-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Field" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "options" TEXT,
    "minLength" INTEGER,
    "maxLength" INTEGER,
    "minValue" INTEGER,
    "maxValue" INTEGER,
    "pattern" TEXT,
    "conditionalFieldId" TEXT,
    "conditionalValue" TEXT,
    "conditionalOperator" TEXT,
    "showWhenMatch" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Field_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Field" ("formId", "id", "label", "maxLength", "maxValue", "minLength", "minValue", "options", "order", "required", "type") SELECT "formId", "id", "label", "maxLength", "maxValue", "minLength", "minValue", "options", "order", "required", "type" FROM "Field";
DROP TABLE "Field";
ALTER TABLE "new_Field" RENAME TO "Field";
CREATE TABLE "new_Form" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "publicId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "template" TEXT,
    "brandColor" TEXT,
    "brandLogo" TEXT,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "maxSubmissions" INTEGER,
    "submissionCount" INTEGER NOT NULL DEFAULT 0,
    "thankYouMessage" TEXT,
    "redirectUrl" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "webhookUrl" TEXT,
    "enableCaptcha" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "conversionRate" REAL,
    "avgCompletionTime" INTEGER,
    CONSTRAINT "Form_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Form" ("createdAt", "description", "id", "isPublic", "ownerId", "publicId", "title", "updatedAt") SELECT "createdAt", "description", "id", "isPublic", "ownerId", "publicId", "title", "updatedAt" FROM "Form";
DROP TABLE "Form";
ALTER TABLE "new_Form" RENAME TO "Form";
CREATE UNIQUE INDEX "Form_publicId_key" ON "Form"("publicId");
CREATE TABLE "new_Submission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "completionTime" INTEGER,
    "ipAddress" TEXT,
    CONSTRAINT "Submission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Submission" ("createdAt", "formId", "id") SELECT "createdAt", "formId", "id" FROM "Submission";
DROP TABLE "Submission";
ALTER TABLE "new_Submission" RENAME TO "Submission";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
