import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  getProjects,
  getFeatures,
  createFeatureFlag,
  updateFeatureFlag,
  getFeatureFlag,
} from './tools';
import {
  RawGetFeaturesShape,
  RawCreateFeatureFlagShape,
  RawUpdateFeatureFlagShape,
  RawGetFeatureFlagShape,
} from './tools/schema';

// Create an MCP server
const server = new McpServer({
  name: 'unleash-ff-mcp-server',
  version: '1.0.0',
  capabilities: {
    tools: {},
  },
});

// Register tools with raw Zod shapes and descriptions
server.tool('getProjects', 'Retrieve a list of projects', async () => {
  return await getProjects();
});

server.tool(
  'getFeatures',
  'Retrieve features for a specific project',
  RawGetFeaturesShape,
  async (args) => {
    return await getFeatures(args);
  }
);

server.tool(
  'createFeatureFlag',
  'Create a new feature flag',
  RawCreateFeatureFlagShape,
  async (args) => {
    return await createFeatureFlag(args);
  }
);

server.tool(
  'updateFeatureFlag',
  'Update an existing feature flag',
  RawUpdateFeatureFlagShape,
  async (args) => {
    return await updateFeatureFlag(args);
  }
);

server.tool(
  'getFeatureFlag',
  'Retrieve a specific feature flag from a project',
  RawGetFeatureFlagShape,
  async (args) => {
    return await getFeatureFlag(args);
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Unleash MCP Server running on stdio');
}

runServer().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
