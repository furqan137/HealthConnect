'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { PatientForm } from '@/components/forms/patient-form';

export default function PatientsPage() {
  const [showForm, setShowForm] = useState(false);
  
  // In a real app, these would be fetched from the database
  const patients = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-03-12',
      gender: 'Female',
    },
    {
      id: '2',
      name: 'Robert Williams',
      email: 'rob.williams@example.com',
      phone: '(555) 234-5678',
      dateOfBirth: '1975-08-24',
      gender: 'Male',
    },
    {
      id: '3',
      name: 'Emma Thompson',
      email: 'emma.t@example.com',
      phone: '(555) 345-6789',
      dateOfBirth: '1990-11-05',
      gender: 'Female',
    },
    {
      id: '4',
      name: 'David Miller',
      email: 'david.m@example.com',
      phone: '(555) 456-7890',
      dateOfBirth: '1982-06-17',
      gender: 'Male',
    },
    {
      id: '5',
      name: 'Lisa Chen',
      email: 'lisa.chen@example.com',
      phone: '(555) 567-8901',
      dateOfBirth: '1988-09-30',
      gender: 'Female',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Patients" 
        description="Manage patient information and records."
      >
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </PageHeader>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>
                  {new Date(patient.dateOfBirth).toLocaleDateString()}
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/patients/${patient.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PatientForm open={showForm} onOpenChange={setShowForm} />
    </div>
  );
}