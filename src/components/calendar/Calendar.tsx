import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { useStore } from '@/store';
import { formatDate } from '@/lib/utils';

export function Calendar() {
  const { communications, companies, communicationMethods } = useStore();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  const getDaysCommunications = (date: Date) => {
    return communications.filter(
      (comm) =>
        comm.date.getDate() === date.getDate() &&
        comm.date.getMonth() === date.getMonth() &&
        comm.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="border-none"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-2 mb-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-xl font-semibold">
            Communications for {selectedDate ? formatDate(selectedDate) : 'Today'}
          </h2>
        </div>

        {selectedDate && (
          <div className="space-y-4">
            {getDaysCommunications(selectedDate).map((comm) => {
              const company = companies.find((c) => c.id === comm.companyId);
              const method = communicationMethods.find(
                (m) => m.id === comm.methodId
              );

              return (
                <div
                  key={comm.id}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {company?.name}
                      </h3>
                      <p className="text-sm text-gray-500">{method?.name}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        comm.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {comm.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  {comm.notes && (
                    <p className="mt-2 text-sm text-gray-600">{comm.notes}</p>
                  )}
                </div>
              );
            })}

            {getDaysCommunications(selectedDate).length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No communications scheduled for this day
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}