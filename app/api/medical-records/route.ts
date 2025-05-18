import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { MedicalRecord } from '@/types';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const records = await db.collection('medical_records').find({}).toArray();
    
    return NextResponse.json({ records }, { status: 200 });
  } catch (error) {
    console.error('Error fetching medical records:', error);
    return NextResponse.json({ error: 'Failed to fetch medical records' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const data = await request.json() as MedicalRecord;
    
    // Validate required fields
    if (!data.patientId || !data.doctorId || !data.date || !data.diagnosis) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('medical_records').insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating medical record:', error);
    return NextResponse.json(
      { error: 'Failed to create medical record' },
      { status: 500 }
    );
  }
}