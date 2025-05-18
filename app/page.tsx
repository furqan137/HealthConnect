import { ActivitySquare, Calendar, Users, UserRound } from 'lucide-react';
import { DashboardCard } from '@/components/ui/dashboard-card';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  // In a real app, these would be fetched from the database
  const dashboardStats = {
    totalPatients: 128,
    totalDoctors: 32,
    totalAppointments: 245,
    upcomingAppointments: 14,
  };

  // Sample upcoming appointments
  const upcomingAppointments = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Michael Chen',
      date: '2025-05-15',
      time: '10:00 AM',
      type: 'Follow-up',
    },
    {
      id: '2',
      patientName: 'Robert Williams',
      doctorName: 'Dr. Emily Adams',
      date: '2025-05-15',
      time: '11:30 AM',
      type: 'Consultation',
    },
    {
      id: '3',
      patientName: 'David Thompson',
      doctorName: 'Dr. Sarah Wilson',
      date: '2025-05-16',
      time: '09:15 AM',
      type: 'Check-up',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Dashboard" 
        description="Welcome to the Healthcare System dashboard."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Patients"
          value={dashboardStats.totalPatients}
          icon={<Users className="h-4 w-4" />}
          description="+12 this month"
        />
        <DashboardCard
          title="Total Doctors"
          value={dashboardStats.totalDoctors}
          icon={<UserRound className="h-4 w-4" />}
          description="+3 this month"
        />
        <DashboardCard
          title="Total Appointments"
          value={dashboardStats.totalAppointments}
          icon={<Calendar className="h-4 w-4" />}
          description="+28 this month"
        />
        <DashboardCard
          title="Upcoming Appointments"
          value={dashboardStats.upcomingAppointments}
          icon={<ActivitySquare className="h-4 w-4" />}
          description="Next 7 days"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.doctorName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <UserRound className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New patient registered</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <Calendar className="h-4 w-4 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Appointment completed</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                  <ActivitySquare className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Medical record updated</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}