import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
  colors: ["rgb(53,138,148)", "rgb(37,11,165)", "#188310"],
  vAxis: {
    viewWindow: {
      min: 0,
      max: 100, // Set your desired maximum range for the y-axis
    },
    logScale: true, // Enable logarithmic scaling for the y-axis
  },
 
};

export default function BarChart(props) {
  const data = [];

  // Iterate through the last seven days
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);
    const formattedDate = currentDate.toISOString().split("T")[0];

    const productsCount = props.data.productsCountByDate.find(
      (item) => item._id === formattedDate
    );
    const ordersCount = props.data.ordersCountByDate.find(
      (item) => item._id === formattedDate
    );
    const totalAmount = props.data.totalAmount.find(
      (item) => item._id === formattedDate
    );

    data.push([
      formattedDate,
      totalAmount ? totalAmount.total : 0,
      productsCount ? productsCount.count : 0,
      ordersCount ? ordersCount.count : 0,
    ]);
  }

  // Add header to the data
  data.unshift(["Date", "Total Amount", "Products Count", "Orders Count"]);

  console.log(data);

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="350px"
      data={data}
      options={options}
    />
  );
}
