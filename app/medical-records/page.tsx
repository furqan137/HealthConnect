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
import { MedicalRecordForm } from '@/components/forms/medical-record-form';

export default function MedicalRecordsPage() {
  const [showForm, setShowForm] = useState(false);
  
  // In a real app, these would be fetched from the database
  const medicalRecords = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Michael Chen',
      date: '2025-04-15',
      diagnosis: 'Hypertension',
      notes: 'Prescribed medication and lifestyle changes',
    },
    {
      id: '2',
      patientName: 'Robert Williams',
      doctorName: 'Dr. Emily Adams',
      date: '2025-04-10',
      diagnosis: 'Seasonal Allergies',
      notes: 'Prescribed antihistamines',
    },
    {
      id: '3',
      patientName: 'Emma Thompson',
      doctorName: 'Dr. Sarah Wilson',
      date: '2025-04-05',
      diagnosis: 'Migraine',
      notes: 'Recommended stress reduction techniques',
    },
    {
      id: '4',
      patientName: 'David Miller',
      doctorName: 'Dr. James Rodriguez',
      date: '2025-04-02',
      diagnosis: 'Sprained Ankle',
      notes: 'Prescribed rest and physical therapy',
    },
    {
      id: '5',
      patientName: 'Lisa Chen',
      doctorName: 'Dr. Lisa Johnson',
      date: '2025-03-28',
      diagnosis: 'Eczema',
      notes: 'Prescribed topical cream',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Medical Records" 
        description="View and manage patient medical records."
      >
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Record
        </Button>
      </PageHeader>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicalRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {record.patientName}
                </TableCell>
                <TableCell>{record.doctorName}</TableCell>
                <TableCell>
                  {new Date(record.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {record.notes}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/medical-records/${record.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <MedicalRecordForm open={showForm} onOpenChange={setShowForm} />
    </div>
  );
}