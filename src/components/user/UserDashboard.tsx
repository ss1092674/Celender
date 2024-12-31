import React from 'react';
import { useStore } from '@/store';
import { Button } from '@/components/ui/button';
import { MessageSquare, AlertTriangle } from 'lucide-react';
import { formatDate, isOverdue, isDueToday } from '@/lib/utils';

export function UserDashboard() {
  const { companies, communications, communicationMethods } = useStore();

  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter((c) => c.companyId === companyId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  };

  const getNextCommunication = (companyId: string) => {
    return communications
      .filter((c) => c.companyId === companyId && !c.completed)
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
  };

  const getRowClassName = (companyId: string) => {
    const nextComm = getNextCommunication(companyId);
    if (!nextComm) return '';
    if (isOverdue(nextComm.date)) return 'bg-red-50';
    if (isDueToday(nextComm.date)) return 'bg-yellow-50';
    return '';
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Communication Dashboard</h2>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Log Communication
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Five Communications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Scheduled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company.id} className={getRowClassName(company.id)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      {getLastFiveCommunications(company.id).map((comm) => {
                        const method = communicationMethods.find(
                          (m) => m.id === comm.methodId
                        );
                        return (
                          <div
                            key={comm.id}
                            className="px-2 py-1 bg-gray-100 rounded text-xs"
                            title={comm.notes}
                          >
                            {method?.name} ({formatDate(comm.date)})
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(() => {
                      const nextComm = getNextCommunication(company.id);
                      if (!nextComm) return 'No scheduled communications';
                      const method = communicationMethods.find(
                        (m) => m.id === nextComm.methodId
                      );
                      return (
                        <div className="flex items-center space-x-2">
                          {isOverdue(nextComm.date) && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          <span>
                            {method?.name} ({formatDate(nextComm.date)})
                          </span>
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}