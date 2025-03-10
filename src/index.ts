#!/usr/bin/env node
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
  version: '1.0.3',
});

// Register tools with raw Zod shapes and descriptions
server.tool('getProjects', 'Retrieve a list of projects', async () => {
  const data = await getProjects();
  return { content: [{ type: 'text', text: JSON.stringify(data) }] };
});

server.tool(
  'getFeatures',
  'Retrieve features for a specific project',
  RawGetFeaturesShape,
  async (args) => {
    const data = await getFeatures(args);
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);

server.tool(
  'createFeatureFlag',
  'Create a new feature flag',
  RawCreateFeatureFlagShape,
  async (args) => {
    const data = await createFeatureFlag(args);
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);

server.tool(
  'updateFeatureFlag',
  'Update an existing feature flag',
  RawUpdateFeatureFlagShape,
  async (args) => {
    const data = await updateFeatureFlag(args);
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
  }
);

server.tool(
  'getFeatureFlag',
  'Retrieve a specific feature flag from a project',
  RawGetFeatureFlagShape,
  async (args) => {
    const data = await getFeatureFlag(args);
    return { content: [{ type: 'text', text: JSON.stringify(data) }] };
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
