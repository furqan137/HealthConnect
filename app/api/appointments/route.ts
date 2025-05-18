import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Appointment } from '@/types';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const appointments = await db.collection('appointments').find({}).toArray();
    
    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const data = await request.json() as Appointment;
    
    // Validate required fields
    if (!data.patientId || !data.doctorId || !data.date || !data.time || !data.status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('appointments').insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}