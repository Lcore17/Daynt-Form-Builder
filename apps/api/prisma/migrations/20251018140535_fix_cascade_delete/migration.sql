-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubmissionAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "value" TEXT,
    "filePath" TEXT,
    CONSTRAINT "SubmissionAnswer_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SubmissionAnswer_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubmissionAnswer" ("fieldId", "filePath", "id", "submissionId", "value") SELECT "fieldId", "filePath", "id", "submissionId", "value" FROM "SubmissionAnswer";
DROP TABLE "SubmissionAnswer";
ALTER TABLE "new_SubmissionAnswer" RENAME TO "SubmissionAnswer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
