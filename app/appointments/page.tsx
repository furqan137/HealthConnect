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
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

export default function AppointmentsPage() {
  // In a real app, these would be fetched from the database
  const appointments = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Michael Chen',
      date: '2025-05-15',
      time: '10:00 AM',
      status: 'scheduled',
      reason: 'Follow-up',
    },
    {
      id: '2',
      patientName: 'Robert Williams',
      doctorName: 'Dr. Emily Adams',
      date: '2025-05-15',
      time: '11:30 AM',
      status: 'scheduled',
      reason: 'Consultation',
    },
    {
      id: '3',
      patientName: 'Emma Thompson',
      doctorName: 'Dr. Sarah Wilson',
      date: '2025-05-14',
      time: '09:15 AM',
      status: 'completed',
      reason: 'Check-up',
    },
    {
      id: '4',
      patientName: 'David Miller',
      doctorName: 'Dr. James Rodriguez',
      date: '2025-05-13',
      time: '02:30 PM',
      status: 'cancelled',
      reason: 'Physical Therapy',
    },
    {
      id: '5',
      patientName: 'Lisa Chen',
      doctorName: 'Dr. Lisa Johnson',
      date: '2025-05-16',
      time: '03:45 PM',
      status: 'scheduled',
      reason: 'Skin Examination',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Appointments" 
        description="Schedule and manage patient appointments."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </PageHeader>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {appointment.patientName}
                </TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>
                  {new Date(appointment.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/appointments/${appointment.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}