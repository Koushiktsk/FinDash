import { Box } from "@mui/material";
import Header from "../../components/Header";
import PredictX from "../../components/PredictChart";

const Predict = () => {
  return (
    <Box m="20px">
      <Header title="Prediction Chart" subtitle="Company's Projected Revenue" />
      <Box height="75vh">
        <PredictX />
      </Box>
    </Box>
  );
};

export default Predict;