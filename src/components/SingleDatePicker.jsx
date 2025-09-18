import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const SingleDatePicker = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            size: "small",
            sx: {
              "& .MuiInputBase-root": {
                // width: "264px",
                height: "40px",
                borderRadius: "6px",
                border: "1px solid #E5E5E5",
                backgroundColor: "#FFFFFF",
                opacity: 1,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // remove double border
              },
              "& .MuiInputBase-input": {
                padding: "8px 12px",
                fontSize: "14px",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default SingleDatePicker;
