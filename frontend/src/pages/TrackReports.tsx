import React, { useState } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy Waste Report Data
const wasteReports = [
  {
    id: 1,
    title: "Garbage Dump",
    location: "Delhi",
    date: "2025-01-15",
    description:
      "Large pile of garbage dumped near homes, causing bad smell and attracting animals. Needs immediate municipal cleaning to avoid diseases.",
    status: "Pending",
    progress: 1,
  },
  {
    id: 2,
    title: "Plastic Waste on Road",
    location: "Mumbai",
    date: "2025-01-14",
    description:
      "Plastic bottles and wrappers blocking roadside drainage, which may cause waterlogging and increase mosquito breeding.",
    status: "In Progress",
    progress: 2,
  },
  {
    id: 3,
    title: "Overflowing Dustbin",
    location: "Pune",
    date: "2025-01-12",
    description:
      "Dustbin is overflowing and trash is spreading nearby. Municipal team has been notified for clearance.",
    status: "Verified",
    progress: 3,
  },
];

// Dummy Water Report Data
const waterReports = [
  {
    id: 1,
    title: "Dirty River Water",
    location: "Varanasi",
    date: "2025-01-10",
    description:
      "Significant amount of floating waste. Water is dark and foul smelling, possibly mixed with sewage. Needs urgent cleaning.",
    status: "Pending",
    progress: 1,
  },
  {
    id: 2,
    title: "Contaminated Tap Water",
    location: "Bangalore",
    date: "2025-01-12",
    description:
      "Tap water has bad smell and yellow tint. Water samples collected and testing underway by authorities.",
    status: "In Progress",
    progress: 2,
  },
  {
    id: 3,
    title: "Oil in Lake",
    location: "Hyderabad",
    date: "2025-01-14",
    description:
      "Oil patches floating in lake. Environmental team responded and cleaned most affected areas.",
    status: "Verified",
    progress: 3,
  },
];

const getStatusColor = (status: string) => {
  if (status === "Verified") return "bg-green-600";
  if (status === "In Progress") return "bg-blue-500";
  return "bg-yellow-500";
};

// ✅ Small compact progress bar inside details only
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-300 rounded-full h-1 mt-2 mx-auto">
    <div
      className="bg-green-600 h-1 rounded-full transition-all"
      style={{
        width: progress === 1 ? "33%" : progress === 2 ? "66%" : "100%",
      }}
    ></div>
  </div>
);

export default function TrackReports() {
  const [openWaste, setOpenWaste] = useState<number | null>(null);
  const [openWater, setOpenWater] = useState<number | null>(null);

  return (
    <>
      <Header />

      <div className="container mx-auto p-6 mt-1">
        <h1 className="text-3xl text-black font-bold mb-6 text-primary">Track Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ✅ Waste Reports */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Waste Reports</h2>

            {wasteReports.map((r) => (
              <Card key={r.id} className="mb-4 shadow">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg font-semibold">{r.title}</CardTitle>

                  {/* ✅ Status under title, small, compact */}
                  <Badge
                    className={`${getStatusColor(
                      r.status
                    )} text-xs px-2 py-0.5 rounded-md w-fit`}
                  >
                    {r.status}
                  </Badge>
                </CardHeader>

                <CardContent>
                  <p className="text-sm">📅 {r.date}</p>
                  <p className="text-sm mb-2">📍 {r.location}</p>

                  <Button
                    className="mt-2 bg-green-600 hover:bg-green-700"
                    onClick={() => setOpenWaste(openWaste === r.id ? null : r.id)}
                  >
                    {openWaste === r.id ? "Hide Details" : "View Details"}
                  </Button>

                  {openWaste === r.id && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                      <p className="text-sm">{r.description}</p>

                      <div className="mt-3 text-center">
                        <p className="text-xs font-semibold text-gray-700">Status Progress</p>
                        <ProgressBar progress={r.progress} />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ✅ Water Reports */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Water Reports</h2>

            {waterReports.map((r) => (
              <Card key={r.id} className="mb-4 shadow">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg font-semibold">{r.title}</CardTitle>

                  <Badge
                    className={`${getStatusColor(
                      r.status
                    )} text-xs px-2 py-0.5 rounded-md w-fit`}
                  >
                    {r.status}
                  </Badge>
                </CardHeader>

                <CardContent>
                  <p className="text-sm">📅 {r.date}</p>
                  <p className="text-sm mb-2">📍 {r.location}</p>

                  <Button
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setOpenWater(openWater === r.id ? null : r.id)}
                  >
                    {openWater === r.id ? "Hide Details" : "Details"}
                  </Button>

                  {openWater === r.id && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm">{r.description}</p>

                      <div className="mt-3 text-center">
                        <p className="text-xs font-semibold text-gray-700">Status Progress</p>
                        <ProgressBar progress={r.progress} />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
