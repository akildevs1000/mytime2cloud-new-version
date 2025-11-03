"use client";

export default function RecentVisitors() {
  const visitors = [
    { name: "John Doe", type: "Client", time: "10:30 AM", status: "Checked In" },
    { name: "Sarah Smith", type: "Vendor", time: "11:00 AM", status: "Checked Out" },
    { name: "Ali Khan", type: "Interviewee", time: "11:15 AM", status: "Pending" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-xl">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Type</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Time</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((v, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{v.name}</td>
              <td className="p-3">{v.type}</td>
              <td className="p-3">{v.time}</td>
              <td className={`p-3 font-medium ${
                v.status === "Checked In"
                  ? "text-green-600"
                  : v.status === "Checked Out"
                  ? "text-gray-500"
                  : "text-yellow-600"
              }`}>
                {v.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
