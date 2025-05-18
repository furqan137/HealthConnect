import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Patient } from '@/types';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const patients = await db.collection('patients').find({}).toArray();
    
    return NextResponse.json({ patients }, { status: 200 });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const data = await request.json() as Patient;
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.dateOfBirth || !data.gender) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('patients').insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    );
  }
}