import { z } from 'zod';

// Raw shapes
const RawGetFeaturesShape = {
  projectId: z.string(),
};

const RawCreateFeatureFlagShape = {
  projectId: z.string(),
  featureData: z.object({
    name: z.string(),
    description: z.string().nullable(),
    impressionData: z.boolean().nullable(),
    type: z.enum([
      'experiment',
      'kill-switch',
      'release',
      'operational',
      'permission',
    ]),
  }),
};

const RawUpdateFeatureFlagShape = {
  projectId: z.string(),
  featureId: z.string(),
  featureData: z.object({
    description: z.string(),
    type: z.enum([
      'experiment',
      'kill-switch',
      'release',
      'operational',
      'permission',
    ]),
    stale: z.boolean(),
    archived: z.boolean(),
    impressionData: z.boolean(),
  }),
};

const RawGetFeatureFlagShape = {
  projectId: z.string(),
  featureId: z.string(),
};

// Define Zod schemas for each tool
const GetFeaturesSchema = z.object(RawGetFeaturesShape);
const CreateFeatureFlagSchema = z.object(RawCreateFeatureFlagShape);
const UpdateFeatureFlagSchema = z.object(RawUpdateFeatureFlagShape);
const GetFeatureFlagSchema = z.object(RawGetFeatureFlagShape);

export {
  RawGetFeaturesShape,
  RawCreateFeatureFlagShape,
  RawUpdateFeatureFlagShape,
  RawGetFeatureFlagShape,
  GetFeaturesSchema,
  CreateFeatureFlagSchema,
  UpdateFeatureFlagSchema,
  GetFeatureFlagSchema,
};
