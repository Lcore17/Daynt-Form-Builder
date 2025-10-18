/*
  Warnings:

  - You are about to drop the column `fieldType` on the `Field` table. All the data in the column will be lost.
  - Added the required column `type` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
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
    CONSTRAINT "Field_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Field" ("formId", "id", "label", "maxLength", "maxValue", "minLength", "minValue", "options", "order", "required") SELECT "formId", "id", "label", "maxLength", "maxValue", "minLength", "minValue", "options", "order", "required" FROM "Field";
DROP TABLE "Field";
ALTER TABLE "new_Field" RENAME TO "Field";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
