"use client";
import { Typography, Paper } from "@mui/material";
import { FaultCount } from "../domain/fault";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

type FaultTypeDistributionChartProps = {
  faultCounts: FaultCount[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const FaultTypeDistributionChart = ({
  faultCounts,
}: FaultTypeDistributionChartProps) => {
  const chartData = {
    labels: faultCounts.map((item) => item.name),
    datasets: [
      {
        label: "Number of Faults",
        data: faultCounts.map((item) => item.value),
        backgroundColor: "#4f86f7",
        borderRadius: 4,
        barThickness: 40,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
        border: {
          color: "#ffffff",
        },
      },
      y: {
        grid: {
          display: true,
          color: "#ffffff",
          lineWidth: 1,
          drawTicks: false,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
        border: {
          color: "#ffffff",
        },
        title: {
          display: true,
          text: "Count",
          color: "#ffffff",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 12,
          },
          color: "#ffffff",
        },
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#333",
        bodyColor: "#666",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        cornerRadius: 4,
        boxPadding: 4,
      },
    },
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        Fault Type Distribution
      </Typography>
      <div style={{ width: "100%", height: "90%" }}>
        <Bar data={chartData} options={options} />
      </div>
    </Paper>
  );
};
