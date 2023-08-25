import {pool} from '../../config/db';
import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM item');
        return NextResponse.json(result);
    } catch (err) {
        return NextResponse.json(
            {message: err.message},
            {statusCode: 500}
        );
    }
}
