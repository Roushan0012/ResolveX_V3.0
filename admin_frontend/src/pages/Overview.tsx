import { AlertTriangle, CheckCircle, Clock, Trash2, Droplets, Users, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const wasteData = [
  { name: "Mon", reports: 45 },
  { name: "Tue", reports: 52 },
  { name: "Wed", reports: 38 },
  { name: "Thu", reports: 65 },
  { name: "Fri", reports: 58 },
  { name: "Sat", reports: 70 },
  { name: "Sun", reports: 42 },
];

const waterQualityData = [
  { name: "Week 1", quality: 85 },
  { name: "Week 2", quality: 82 },
  { name: "Week 3", quality: 88 },
  { name: "Week 4", quality: 90 },
];

const wasteTypeData = [
  { name: "Plastic", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Organic", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Metal", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Electronic", value: 15, color: "hsl(var(--chart-4))" },
];

const recentReports = [
  { id: "WR-2401", location: "Sector 15, Block A", type: "Plastic Waste", status: "In Progress", priority: "high" },
  { id: "WQ-1205", location: "River Station 3", type: "High Turbidity", status: "Critical", priority: "critical" },
  { id: "WR-2398", location: "Park Avenue", type: "Mixed Waste", status: "Resolved", priority: "medium" },
  { id: "WR-2395", location: "Market Area", type: "E-Waste", status: "Pending", priority: "high" },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time monitoring of waste management and water quality</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Reports"
          value="1,247"
          icon={Trash2}
          trend={{ value: "12% from last week", isPositive: true }}
          colorClass="bg-primary/10 text-primary"
        />
        <StatCard
          title="Pending Actions"
          value="89"
          icon={Clock}
          trend={{ value: "8% from yesterday", isPositive: false }}
          colorClass="bg-warning/10 text-warning"
        />
        <StatCard
          title="Resolved Cases"
          value="1,158"
          icon={CheckCircle}
          trend={{ value: "15% this month", isPositive: true }}
          colorClass="bg-success/10 text-success"
        />
        <StatCard
          title="Active Users"
          value="3,428"
          icon={Users}
          trend={{ value: "24% growth", isPositive: true }}
          colorClass="bg-accent/10 text-accent"
        />
      </div>

      {/* Critical Alerts */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <CardTitle className="text-destructive">Critical Alerts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium">High contamination detected</p>
                  <p className="text-sm text-muted-foreground">River Station 3 - pH 8.5</p>
                </div>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-warning" />
                <div>
                  <p className="font-medium">Large waste accumulation</p>
                  <p className="text-sm text-muted-foreground">Sector 15, Block A</p>
                </div>
              </div>
              <Badge className="bg-warning text-warning-foreground">High</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Waste Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Bar dataKey="reports" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Water Quality Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={waterQualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Line type="monotone" dataKey="quality" stroke="hsl(var(--secondary))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Waste Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {wasteTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{report.id}</span>
                      <Badge variant={
                        report.status === "Critical" ? "destructive" :
                        report.status === "In Progress" ? "default" :
                        report.status === "Resolved" ? "outline" : "secondary"
                      }>
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.location}</p>
                    <p className="text-sm">{report.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            Environmental Health Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Score</span>
                <span className="text-2xl font-bold text-success">87/100</span>
              </div>
              <Progress value={87} className="h-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Waste Management</p>
                <Progress value={85} className="h-2" />
                <p className="text-sm font-medium mt-1">85%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Water Quality</p>
                <Progress value={90} className="h-2" />
                <p className="text-sm font-medium mt-1">90%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Response Time</p>
                <Progress value={86} className="h-2" />
                <p className="text-sm font-medium mt-1">86%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
