// components/ClientSummary.tsx
import { ClientState } from '@/types';

interface ClientSummaryProps {
  clientStates: Record<number, ClientState>;
}

export default function ClientSummary({ clientStates }: ClientSummaryProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Client Summary</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Frames
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Processing Time (ms)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Average Processing Time (ms)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catastrophe Frames
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Critical Frames
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Moderate Frames
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(clientStates).map(([clientId, state]) => {
              const avgProcessingTime = state.frameCount > 0 
                ? (state.totalTime / state.frameCount).toFixed(2)
                : '0.00';
              
              const getPercentage = (count: number) => 
                state.frameCount > 0 
                  ? ((count / state.frameCount) * 100).toFixed(1)
                  : '0.0';

              return (
                <tr key={clientId}>
                  <td className="px-6 py-4 whitespace-nowrap">{clientId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{state.frameCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{state.totalTime.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{avgProcessingTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {state.labelCounts.catastrophe} - {getPercentage(state.labelCounts.catastrophe)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {state.labelCounts.critical} - {getPercentage(state.labelCounts.critical)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {state.labelCounts.moderate} - {getPercentage(state.labelCounts.moderate)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}