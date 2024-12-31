import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { UserDashboard } from '@/components/user/UserDashboard';
import { Calendar } from '@/components/calendar/Calendar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Communication Tracker</h1>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="user" className="space-y-4">
          <TabsList>
            <TabsTrigger value="user">Dashboard</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="space-y-4">
            <UserDashboard />
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <Calendar />
          </TabsContent>
          
          <TabsContent value="admin" className="space-y-4">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;