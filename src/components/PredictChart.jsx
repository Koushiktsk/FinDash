import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import MLR from "ml-regression-multivariate-linear";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, useTheme, Paper } from "@mui/material";
import { tokens } from "../theme"; 

const PredictX = () => {
  const [chartData, setChartData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const loadCSVAndPredict = async () => {
      const response = await fetch("/finance_data_50.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;
          const inputs = [];
          const outputs = [];

          data.forEach((row) => {
            const month = parseInt(row["Month"]);
            const revenue = parseFloat(row["Revenue ($)"]);
            if (!isNaN(month) && !isNaN(revenue)) {
              inputs.push([month]);
              outputs.push([revenue]);
            }
          });

          const mlr = new MLR(inputs, outputs);

          const original = inputs.map((input, index) => ({
            month: input[0],
            actual: outputs[index][0],
            predicted: null,
          }));

          const future = [];
          const lastMonth = inputs[inputs.length - 1][0];
          for (let i = 1; i <= 12; i++) {
            const month = lastMonth + i;
            const predicted = mlr.predict([[month]])[0][0];
            future.push({
              month,
              actual: null,
              predicted: Math.round(predicted),
            });
          }

          setChartData([...original, ...future]);
        },
      });
    };

    loadCSVAndPredict();
  }, []);

  return (
    <Box
      m="20px"
      height="75vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 950,
          height: "100%",
          padding: "30px",
          backgroundColor: colors.primary[400],
          borderRadius: "12px",
          boxShadow: `0 0 12px ${colors.grey[700]}`,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: colors.grey[100], mb: 3 }}
        >
          📊 Financial Forecast 
        </Typography>

            <ResponsiveContainer width="100%" height="80%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[600]} />
            <XAxis
              dataKey="month"
              tick={{ fill: colors.grey[100] }}
              label={{
                value: "Month",
                position: "insideBottomRight",
                offset: -5,
                fill: colors.grey[100],
              }}
            />
   
            <YAxis
              tick={{ fill: colors.grey[100] }}
              label={{
                value: "Revenue ($)",
                angle: -90,
                position: "insideLeft",
                fill: colors.grey[100],
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.primary[500],
                border: "none",
                borderRadius: "6px",
              }}
              labelStyle={{ color: colors.grey[100] }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: colors.grey[100] }} />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#00E676"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Actual Revenue"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#FF9100"
              strokeDasharray="5 5"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Predicted Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default PredictX;
