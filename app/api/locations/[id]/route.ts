import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// PUT - Modifier un marqueur existant
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, type, x, y, description, color, emoji } = body;
    const { id } = params;

    await pool.query(
      'UPDATE locations SET name = ?, type = ?, x = ?, y = ?, description = ?, color = ?, emoji = ? WHERE id = ?',
      [name, type, x, y, description, color, emoji || null, id]
    );

    const [updatedLocation] = await pool.query<RowDataPacket[]>('SELECT * FROM locations WHERE id = ?', [id]);
    
    return NextResponse.json(updatedLocation[0]);
  } catch (error) {
    console.error('Erreur lors de la modification du marqueur:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification du marqueur' }, { status: 500 });
  }
}

// DELETE - Supprimer un marqueur
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await pool.query('DELETE FROM locations WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Marqueur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du marqueur:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du marqueur' }, { status: 500 });
  }
}
