export interface Patient {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodType?: string;
  address?: string;
  medicalHistory?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Doctor {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  availability?: string[];
  bio?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Appointment {
  _id?: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MedicalRecord {
  _id?: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  prescription?: string[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  upcomingAppointments: number;
}