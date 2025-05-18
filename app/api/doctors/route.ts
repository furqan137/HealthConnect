import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Doctor } from '@/types';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const doctors = await db.collection('doctors').find({}).toArray();
    
    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const data = await request.json() as Doctor;
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.specialization || data.experience === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('doctors').insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json(
      { error: 'Failed to create doctor' },
      { status: 500 }
    );
  }
}