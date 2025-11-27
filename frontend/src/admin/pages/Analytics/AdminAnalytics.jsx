import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react";

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Mock data for statistics
  const stats = [
    {
      name: "Total Residents",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      darkBg: "dark:bg-blue-900/20",
      darkIcon: "dark:text-blue-400",
    },
    {
      name: "Document Requests",
      value: "1,234",
      change: "+18.2%",
      trend: "up",
      icon: FileText,
      color: "green",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      darkBg: "dark:bg-green-900/20",
      darkIcon: "dark:text-green-400",
    },
    {
      name: "Pending Requests",
      value: "47",
      change: "-5.3%",
      trend: "down",
      icon: Clock,
      color: "yellow",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      darkBg: "dark:bg-yellow-900/20",
      darkIcon: "dark:text-yellow-400",
    },
    {
      name: "Completion Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: CheckCircle,
      color: "purple",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      darkBg: "dark:bg-purple-900/20",
      darkIcon: "dark:text-purple-400",
    },
  ];

  // Document requests by type
  const documentTypeData = {
    series: [324, 289, 245, 198, 178],
    options: {
      chart: {
        type: "donut",
        fontFamily: "Inter, sans-serif",
      },
      labels: [
        "Barangay Clearance",
        "Certificate of Residency",
        "Business Permit",
        "Indigency Certificate",
        "Others",
      ],
      colors: ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#6B7280"],
      legend: {
        position: "bottom",
        labels: {
          colors: "#6B7280",
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return Math.round(val) + "%";
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  // Request status breakdown
  const statusData = {
    series: [
      {
        name: "Requests",
        data: [234, 456, 178, 89, 67],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: false,
          columnWidth: "60%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#3B82F6"],
      xaxis: {
        categories: ["Pending", "Approved", "Completed", "Rejected", "Cancelled"],
        labels: {
          style: {
            colors: "#6B7280",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6B7280",
          },
        },
      },
      grid: {
        borderColor: "#E5E7EB",
      },
    },
  };

  // Monthly trends
  const monthlyTrendsData = {
    series: [
      {
        name: "Document Requests",
        data: [45, 52, 38, 65, 78, 93, 110, 125, 142, 158, 175, 189],
      },
      {
        name: "Completed",
        data: [35, 48, 34, 58, 70, 85, 98, 115, 130, 145, 160, 175],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: ["#3B82F6", "#10B981"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#6B7280",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6B7280",
          },
        },
      },
      grid: {
        borderColor: "#E5E7EB",
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        labels: {
          colors: "#6B7280",
        },
      },
    },
  };

  // Peak hours data
  const peakHoursData = {
    series: [
      {
        name: "Requests",
        data: [12, 15, 18, 25, 35, 48, 62, 75, 82, 78, 65, 58, 52, 48, 42, 38, 35, 28, 22, 18, 15, 13, 10, 8],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 300,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      colors: ["#8B5CF6"],
      xaxis: {
        categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        labels: {
          rotate: -45,
          style: {
            colors: "#6B7280",
            fontSize: "10px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6B7280",
          },
        },
      },
      grid: {
        borderColor: "#E5E7EB",
      },
      tooltip: {
        x: {
          format: "HH:mm",
        },
      },
    },
  };

  // Popular services
  const popularServices = [
    { name: "Barangay Clearance", requests: 324, percentage: 26 },
    { name: "Certificate of Residency", requests: 289, percentage: 23 },
    { name: "Business Permit", requests: 245, percentage: 20 },
    { name: "Indigency Certificate", requests: 198, percentage: 16 },
    { name: "Certificate of Employment", requests: 156, percentage: 13 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comprehensive overview of barangay services and activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.darkBg}`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor} ${stat.darkIcon}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  <TrendIcon className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Trends
              </h2>
            </div>
          </div>
          <ReactApexChart
            options={monthlyTrendsData.options}
            series={monthlyTrendsData.series}
            type="area"
            height={300}
          />
        </div>

        {/* Document Types Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Document Types Distribution
              </h2>
            </div>
          </div>
          <ReactApexChart
            options={documentTypeData.options}
            series={documentTypeData.series}
            type="donut"
            height={300}
          />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Status Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Request Status Breakdown
              </h2>
            </div>
          </div>
          <ReactApexChart
            options={statusData.options}
            series={statusData.series}
            type="bar"
            height={300}
          />
        </div>

        {/* Peak Hours */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Peak Hours Activity
              </h2>
            </div>
          </div>
          <ReactApexChart
            options={peakHoursData.options}
            series={peakHoursData.series}
            type="line"
            height={280}
          />
        </div>
      </div>

      {/* Popular Services Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Most Popular Services
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {popularServices.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {service.requests} requests
                  </div>
                </div>
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Avg. Processing Time</p>
              <p className="text-2xl font-bold">2.3 days</p>
            </div>
          </div>
          <p className="text-sm opacity-75">12% faster than last month</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Active Users Today</p>
              <p className="text-2xl font-bold">342</p>
            </div>
          </div>
          <p className="text-sm opacity-75">Peak hour: 2:00 PM - 3:00 PM</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Satisfaction Rate</p>
              <p className="text-2xl font-bold">4.8/5.0</p>
            </div>
          </div>
          <p className="text-sm opacity-75">Based on 1,234 responses</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
