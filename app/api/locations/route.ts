import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// GET - Récupérer tous les marqueurs
export async function GET() {
  try {
    console.log('Tentative de connexion à la base de données...');
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM locations ORDER BY created_at DESC');
    console.log('Marqueurs récupérés avec succès:', rows.length);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des marqueurs:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la récupération des marqueurs',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// POST - Créer un nouveau marqueur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, x, y, description, color, emoji } = body;

    console.log('Tentative d\'insertion du marqueur:', { name, type, x, y });
    
    const [result] = await pool.query<any>(
      'INSERT INTO locations (name, type, x, y, description, color, emoji) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, type, x, y, description, color, emoji || null]
    );

    console.log('Marqueur inséré avec ID:', result.insertId);

    const [newLocation] = await pool.query<RowDataPacket[]>('SELECT * FROM locations WHERE id = ?', [result.insertId]);
    
    return NextResponse.json(newLocation[0], { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du marqueur:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la création du marqueur',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}
