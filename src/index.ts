#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

const isValidIsEvenArgs = (args: any): args is { number: number } =>
  typeof args === "object" && args !== null && typeof args.number === "number";

class IsEvenServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "is-even-server",
        version: "0.1.0",
        description: "Helps you know whether a number is even or not.",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "is_even",
          description: "Checks if a given number is even.",
          inputSchema: {
            type: "object",
            properties: {
              number: {
                type: "number",
                description: "The number to check.",
              },
            },
            required: ["number"],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== "is_even") {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
      }

      if (!isValidIsEvenArgs(request.params.arguments)) {
        throw new McpError(
          ErrorCode.InvalidParams,
          'Invalid arguments for is_even tool. Expected: { "number": <number> }'
        );
      }

      const numberToCheck = request.params.arguments.number;
      const isEven = numberToCheck % 2 === 0;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ isEven }),
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("IsEven MCP server running on stdio");
  }
}

const server = new IsEvenServer();
server.run().catch(console.error);
