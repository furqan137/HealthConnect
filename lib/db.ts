import clientPromise from './mongodb';
import { Patient, Doctor, Appointment, MedicalRecord } from '@/types';

export async function getDashboardStats() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const totalPatients = await db.collection('patients').countDocuments();
    const totalDoctors = await db.collection('doctors').countDocuments();
    const totalAppointments = await db.collection('appointments').countDocuments();
    
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    const upcomingAppointments = await db.collection('appointments').countDocuments({
      date: { $gte: today.toISOString().split('T')[0], $lte: nextWeek.toISOString().split('T')[0] },
      status: 'scheduled'
    });

    return {
      totalPatients,
      totalDoctors,
      totalAppointments,
      upcomingAppointments
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalPatients: 0,
      totalDoctors: 0,
      totalAppointments: 0,
      upcomingAppointments: 0
    };
  }
}

export async function getPatients() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const patients = await db.collection('patients').find({}).toArray();
    return JSON.parse(JSON.stringify(patients));
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
}

export async function getPatientById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const patient = await db.collection('patients').findOne({ _id: id });
    return patient ? JSON.parse(JSON.stringify(patient)) : null;
  } catch (error) {
    console.error('Error fetching patient:', error);
    return null;
  }
}

export async function getDoctors() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const doctors = await db.collection('doctors').find({}).toArray();
    return JSON.parse(JSON.stringify(doctors));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

export async function getDoctorById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const doctor = await db.collection('doctors').findOne({ _id: id });
    return doctor ? JSON.parse(JSON.stringify(doctor)) : null;
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return null;
  }
}

export async function getAppointments() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const appointments = await db.collection('appointments').find({}).toArray();
    return JSON.parse(JSON.stringify(appointments));
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
}

export async function getAppointmentById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const appointment = await db.collection('appointments').findOne({ _id: id });
    return appointment ? JSON.parse(JSON.stringify(appointment)) : null;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return null;
  }
}

export async function getMedicalRecords() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const records = await db.collection('medical_records').find({}).toArray();
    return JSON.parse(JSON.stringify(records));
  } catch (error) {
    console.error('Error fetching medical records:', error);
    return [];
  }
}

export async function getMedicalRecordById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const record = await db.collection('medical_records').findOne({ _id: id });
    return record ? JSON.parse(JSON.stringify(record)) : null;
  } catch (error) {
    console.error('Error fetching medical record:', error);
    return null;
  }
}

export async function createPatient(patient: Patient) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('patients').insertOne({
      ...patient,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
}

export async function createDoctor(doctor: Doctor) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('doctors').insertOne({
      ...doctor,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result;
  } catch (error) {
    console.error('Error creating doctor:', error);
    throw error;
  }
}

export async function createAppointment(appointment: Appointment) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('appointments').insertOne({
      ...appointment,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}

export async function createMedicalRecord(record: MedicalRecord) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('medical_records').insertOne({
      ...record,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result;
  } catch (error) {
    console.error('Error creating medical record:', error);
    throw error;
  }
}