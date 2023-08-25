import {pool} from '@/app/config/db';
import {NextResponse} from 'next/server';

export async function PUT(request, { params }) {
    const data = await request.json();

    try {
        await pool.query("UPDATE item SET status = 1 WHERE id = ?", [params.id]);
        return NextResponse.json({
            ...data,
            id: params.id,
        });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

