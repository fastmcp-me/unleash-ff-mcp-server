# Unleash Feature Flag MCP Server

This repository contains a Model Context Protocol (MCP) server for interacting with Unleash feature flag management system. It allows AI agents to manage feature flags through the Unleash API.

## What is MCP?

The Model Context Protocol (MCP) is a specification for enabling AI models to interact with external tools and data sources. This server implements the MCP protocol for Unleash, allowing AI assistants to manage feature flags programmatically.

## Installation

You can install the package from npm:

```bash
npm install -g @ylin6/unleash-ff-mcp-server
```

Or run it directly using npx:

```bash
npx @ylin6/unleash-ff-mcp-server
```

## Configuration

The server requires the following environment variables:

- `UNLEASH_API_URL`: The URL of your Unleash API instance
- `UNLEASH_AUTH_TOKEN`: The authentication token for your Unleash instance

## Available Tools

The MCP server provides the following tools for managing feature flags:

### Get Projects

Retrieves a list of all projects in the Unleash instance.

### Get Features

Retrieves all feature flags within a specific project.

Parameters:

- `projectId`: The ID of the project

### Create Feature Flag

Creates a new feature flag within a project.

Parameters:

- `projectId`: The ID of the project
- `name`: The name of the feature flag
- `description`: A description of the feature flag
- `type`: The type of the feature flag (e.g., "release", "experiment", "operational", "kill-switch")

### Update Feature Flag

Updates an existing feature flag.

Parameters:

- `projectId`: The ID of the project
- `featureId`: The ID of the feature flag
- `description`: A new description for the feature flag
- `type`: A new type for the feature flag

### Get Feature Flag

Retrieves details about a specific feature flag.

Parameters:

- `projectId`: The ID of the project
- `featureId`: The ID of the feature flag

## Using with Cursor

To use this MCP server with Cursor, use the following command in your cursor settings

```bash
env UNLEASH_API_URL=XXXX UNLEASH_AUTH_TOKEN=XXX npx -y @ylin6/unleash-ff-mcp-server
```

## Examples

Example conversation with Cursor/Claude:

```
You: Show me all the feature flags in the 'dashboard' project

Claude: I'll fetch all the feature flags in the 'dashboard' project for you.
[Claude uses the getFeatures tool with projectId='dashboard']

Claude: Here are all the feature flags in the 'website' project:
- new-homepage (type: release)
- dark-mode (type: experiment)
- beta-footer (type: operational)
...
```

## Development

To inspect the MCP server's operations, you can run:

```bash
npm run inspect
```

This uses the MCP inspector to analyze request/response patterns.

## License

ISC
