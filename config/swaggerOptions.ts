// swaggerOptions.ts
import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "A sample API documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // Replace with your server URL
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], // Path to your API route files and model definitions
};

export default swaggerOptions;
