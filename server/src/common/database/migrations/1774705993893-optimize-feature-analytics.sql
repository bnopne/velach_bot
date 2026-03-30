-- Migration: optimize-feature-analytics
ALTER TABLE "FeatureAnalytics" ADD featureKey SMALLINT DEFAULT NULL;

UPDATE "FeatureAnalytics" SET featureKey = 1 WHERE feature = 'bikecheck-command/callback-query/delete';
UPDATE "FeatureAnalytics" SET featureKey = 2 WHERE feature = 'bikecheck-command/callback-query/delete-strava';
UPDATE "FeatureAnalytics" SET featureKey = 3 WHERE feature = 'bikecheck-command/callback-query/toggle-on-sale';
UPDATE "FeatureAnalytics" SET featureKey = 4 WHERE feature = 'bikecheck-command/callback-query/like';
UPDATE "FeatureAnalytics" SET featureKey = 5 WHERE feature = 'bikecheck-command/callback-query/dislike';
UPDATE "FeatureAnalytics" SET featureKey = 6 WHERE feature = 'bikecheck-command/callback-query/show-next-bikecheck';
UPDATE "FeatureAnalytics" SET featureKey = 7 WHERE feature = 'bikecheck-command/callback-query/show-previous-bikecheck';
UPDATE "FeatureAnalytics" SET featureKey = 8 WHERE feature = 'bikecheck-command/inline-command';
UPDATE "FeatureAnalytics" SET featureKey = 9 WHERE feature = 'bikecheck-command/message-command';
UPDATE "FeatureAnalytics" SET featureKey = 10 WHERE feature = 'checkbike command';
UPDATE "FeatureAnalytics" SET featureKey = 11 WHERE feature = 'mylikes-command/message-command';
UPDATE "FeatureAnalytics" SET featureKey = 12 WHERE feature = 'mylikes-command/callback-query/show-previous';
UPDATE "FeatureAnalytics" SET featureKey = 13 WHERE feature = 'mylikes-command/callback-query/show-next';
UPDATE "FeatureAnalytics" SET featureKey = 14 WHERE feature = 'deleted-command/callback-query/restore';
UPDATE "FeatureAnalytics" SET featureKey = 15 WHERE feature = 'deleted-command/callback-query/show-next';
UPDATE "FeatureAnalytics" SET featureKey = 16 WHERE feature = 'deleted-command/callback-query/show-previous';
UPDATE "FeatureAnalytics" SET featureKey = 17 WHERE feature = 'deleted-command/message-command';
UPDATE "FeatureAnalytics" SET featureKey = 18 WHERE feature = 'help-command';
UPDATE "FeatureAnalytics" SET featureKey = 19 WHERE feature = 'onsale-command/callback-query/show-previous';
UPDATE "FeatureAnalytics" SET featureKey = 20 WHERE feature = 'onsale-command/callback-query/show-next';
UPDATE "FeatureAnalytics" SET featureKey = 21 WHERE feature = 'onsale command/message-command';
UPDATE "FeatureAnalytics" SET featureKey = 22 WHERE feature = 'setstrava-command/message-command';
UPDATE "FeatureAnalytics" SET featureKey = 23 WHERE feature = 'start-command/message-command';
UPDATE "FeatureAnalytics" SET featureKey = 24 WHERE feature = 'top-command/callback-query/show-top';
UPDATE "FeatureAnalytics" SET featureKey = 25 WHERE feature = 'top-command/message-command';

DELETE FROM "FeatureAnalytics" WHERE featureKey IS NULL;
ALTER TABLE "FeatureAnalytics" ALTER COLUMN featureKey SET NOT NULL;
ALTER TABLE "FeatureAnalytics" DROP COLUMN feature;
