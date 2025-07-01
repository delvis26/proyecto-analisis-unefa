import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './app/db/schema.ts',
    dialect: 'turso',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN!
    }
})