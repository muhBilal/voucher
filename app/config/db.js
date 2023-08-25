import mysql from "serverless-mysql";

export const pool = mysql({
    config: {
        host: "localhost",
        user: "bilal",
        password: "bilal123",
        database: "barcode",
    },
});
