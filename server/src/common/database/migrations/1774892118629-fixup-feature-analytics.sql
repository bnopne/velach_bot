-- Migration: fixup-feature-analytics
ALTER TABLE "FeatureAnalytics" RENAME COLUMN featurekey to "featureKey";
