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
import { DoctorForm } from '@/components/forms/doctor-form';

export default function DoctorsPage() {
  const [showForm, setShowForm] = useState(false);
  
  // In a real app, these would be fetched from the database
  const doctors = [
    {
      id: '1',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@example.com',
      phone: '(555) 111-2233',
      specialization: 'Cardiology',
      experience: 12,
    },
    {
      id: '2',
      name: 'Dr. Emily Adams',
      email: 'emily.adams@example.com',
      phone: '(555) 222-3344',
      specialization: 'Pediatrics',
      experience: 8,
    },
    {
      id: '3',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '(555) 333-4455',
      specialization: 'Neurology',
      experience: 15,
    },
    {
      id: '4',
      name: 'Dr. James Rodriguez',
      email: 'james.r@example.com',
      phone: '(555) 444-5566',
      specialization: 'Orthopedics',
      experience: 10,
    },
    {
      id: '5',
      name: 'Dr. Lisa Johnson',
      email: 'lisa.j@example.com',
      phone: '(555) 555-6677',
      specialization: 'Dermatology',
      experience: 9,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Doctors" 
        description="Manage doctor profiles and specializations."
      >
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </PageHeader>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Experience (Years)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.experience}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/doctors/${doctor.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DoctorForm open={showForm} onOpenChange={setShowForm} />
    </div>
  );
}