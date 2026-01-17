## ⭐ Featured on reddit: [I made an MCP server that tells you if a number is even or not](https://www.reddit.com/r/mcp/comments/1ktu7zg/i_made_an_mcp_server_that_tells_you_if_a_number/)

`is-even-mcp` is a popular MCP library, which climbed to the all-time high of the /r/mcp for a number of months.

Essentially, it's an MCP server, a connector for AI agents, that helps them do complex math such as determining if a number is even, or if it is not even.

# Introducing `is-even-mcp`

Helps you know whether a number is even or not.

This is a TypeScript-based MCP server that implements the evenness algorithm in a way accessible to AI agents.

## Development

Install dependencies:

```bash
npm install
```

Build the server:

```bash
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "is-even": {
      "command": "/path/to/is-even/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
