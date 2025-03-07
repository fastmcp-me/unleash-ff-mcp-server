import axios from 'axios';
import { z } from 'zod';
import {
  GetFeaturesSchema,
  CreateFeatureFlagSchema,
  UpdateFeatureFlagSchema,
  GetFeatureFlagSchema,
} from './schema';

const UNLEASH_API_URL = process.env.UNLEASH_API_URL;
const UNLEASH_AUTH_TOKEN = process.env.UNLEASH_AUTH_TOKEN;

if (!UNLEASH_API_URL || !UNLEASH_AUTH_TOKEN) {
  if (!UNLEASH_API_URL) {
    throw new Error('Environment variable UNLEASH_API_URL must be set');
  }
  if (!UNLEASH_AUTH_TOKEN) {
    throw new Error('Environment variable UNLEASH_AUTH_TOKEN must be set');
  }
}

// Function to get a list of projects
async function getProjects() {
  try {
    const response = await axios.get(`${UNLEASH_API_URL}/api/admin/projects`, {
      headers: {
        Authorization: `Bearer ${UNLEASH_AUTH_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

// Function to get a list of features within a project
async function getFeatures(params: z.infer<typeof GetFeaturesSchema>) {
  const { projectId } = GetFeaturesSchema.parse(params);
  try {
    const response = await axios.get(
      `${UNLEASH_API_URL}/api/admin/projects/${projectId}/features`,
      {
        headers: {
          Authorization: `Bearer ${UNLEASH_AUTH_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
}

// Function to create a feature flag
async function createFeatureFlag(
  params: z.infer<typeof CreateFeatureFlagSchema>
) {
  const { projectId, featureData } = CreateFeatureFlagSchema.parse(params);
  try {
    const response = await axios.post(
      `${UNLEASH_API_URL}/api/admin/projects/${projectId}/features`,
      featureData,
      {
        headers: {
          Authorization: `Bearer ${UNLEASH_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating feature flag:', error);
    throw error;
  }
}

// Function to update a feature flag
async function updateFeatureFlag(
  params: z.infer<typeof UpdateFeatureFlagSchema>
) {
  const { projectId, featureId, featureData } =
    UpdateFeatureFlagSchema.parse(params);
  try {
    const response = await axios.put(
      `${UNLEASH_API_URL}/api/admin/projects/${projectId}/features/${featureId}`,
      featureData,
      {
        headers: {
          Authorization: `Bearer ${UNLEASH_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating feature flag:', error);
    throw error;
  }
}

// Function to get a specific feature flag within a project
async function getFeatureFlag(params: z.infer<typeof GetFeatureFlagSchema>) {
  const { projectId, featureId } = GetFeatureFlagSchema.parse(params);
  try {
    const response = await axios.get(
      `${UNLEASH_API_URL}/api/admin/projects/${projectId}/features/${featureId}`,
      {
        headers: {
          Authorization: `Bearer ${UNLEASH_AUTH_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching feature flag:', error);
    throw error;
  }
}

export {
  getProjects,
  getFeatures,
  createFeatureFlag,
  updateFeatureFlag,
  getFeatureFlag,
};
