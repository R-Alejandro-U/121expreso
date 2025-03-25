import "dotenv/config"
const data: NodeJS.ProcessEnv = process.env;
export const PORT: number = data["PORT"] ? parseInt(data["PORT"], 10) : 3000;