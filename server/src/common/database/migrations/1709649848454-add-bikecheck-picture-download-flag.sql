-- Migration: add-bikecheck-picture-download-flag
ALTER TABLE "Bikecheck"
ADD COLUMN "isPictureDownloaded" BOOLEAN DEFAULT FALSE;
