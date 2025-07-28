import React, { useState } from "react";
import { Box, TextField, Popover } from "@mui/material";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeInput = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (ranges) => {
    onChange([ranges.selection.startDate, ranges.selection.endDate]);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
     <TextField
  fullWidth
  variant="standard"
  value={
    value?.[0] && value?.[1]
      ? `${format(value[0], "dd/MM/yyyy")} to ${format(value[1], "dd/MM/yyyy")}`
      : ""
  }
  onClick={handleOpen}
  placeholder="DD-MM-YYYY - DD-MM-YYYY"
  InputProps={{
    disableUnderline: true, // ✅ removes underline
    readOnly: true,
    sx: {
      fontSize: "14px",
      padding: "0 8px",
      cursor: "pointer",
      borderRadius: "4px",
      height: '34px'
    },
  }}
/>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <DateRange
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={[
            {
              startDate: value?.[0] || new Date(),
              endDate: value?.[1] || new Date(),
              key: "selection",
            },
          ]}
        />
      </Popover>
    </Box>
  );
};

export default DateRangeInput;
