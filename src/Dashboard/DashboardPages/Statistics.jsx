import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: [], // Booking dates
      },
    },
    series: [
      {
        name: "Parcels",
        data: [], // Number of parcels per booking date
      },
    ],
  });

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  useEffect(() => {
    if (parcels.length > 0) {
      // Group parcels by bookingDate
      const groupedData = parcels.reduce((acc, parcel) => {
        const date = parcel.bookingDate;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      // Extract categories (dates) and series data (counts)
      const categories = Object.keys(groupedData);
      const data = Object.values(groupedData);

      // Update chartData state
      setChartData((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            categories,
          },
        },
        series: [
          {
            name: "Parcels",
            data,
          },
        ],
      }));
    }
  }, [parcels]);

  return (
    <div className="w-10/12 mx-auto">
      <h2 className="text-xl font-bold mb-4">Parcel Statistics</h2>
      {parcels.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default Statistics;
