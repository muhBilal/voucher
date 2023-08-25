import mysql from "serverless-mysql";

export const pool = mysql({
    config: {
        host: process.env.NEXT_PUBLIC_HOST,
        user: process.env.NEXT_PUBLIC_USER,
        password: process.env.NEXT_PUBLIC_PASSWORD,
        database: process.env.NEXT_PUBLIC_TABLE,
    },
});
