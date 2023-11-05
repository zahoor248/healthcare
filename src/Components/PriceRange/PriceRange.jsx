import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "./PriceRange.css";

function valuetext(value) {
  return `${value}°C`;
}

export default function PriceRange() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        sx={{
          width: '100%',
          margin: 'auto',
          marginTop: "20px",
          "& .MuiSlider-thumb": {
            borderRadius: "4px",
          },
        }}
      />
    </Box>
  );
}
