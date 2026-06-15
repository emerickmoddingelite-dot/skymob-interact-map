import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// GET - Récupérer tous les marqueurs
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM locations ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des marqueurs:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des marqueurs' }, { status: 500 });
  }
}

// POST - Créer un nouveau marqueur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, x, y, description, color, emoji } = body;

    const [result] = await pool.query<any>(
      'INSERT INTO locations (name, type, x, y, description, color, emoji) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, type, x, y, description, color, emoji || null]
    );

    const [newLocation] = await pool.query<RowDataPacket[]>('SELECT * FROM locations WHERE id = ?', [result.insertId]);
    
    return NextResponse.json(newLocation[0], { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du marqueur:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du marqueur' }, { status: 500 });
  }
}
