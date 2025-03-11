import React, { useState } from "react";
import TextOnTextFiled from "./TextOnTextFiled";

const CustomTimeFiled = ({ header }) => {
  const [selectedTime, setSelectedTime] = useState("00:00");

  const handleChange = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // תוסיף את זה כדי שהאלמנטים יהיו בעמודה
        // width: '124px',
        gap: '10px',
      }}
    >
      <TextOnTextFiled header={header} />
      <div
        style={{
          display: "flex",
          // width: "124px", // ישתמש בכל רוחב הקונטיינר
          height: "26px",
          padding: "12px 16px 12px 20px",
          justifyContent: "flex-end",
          alignItems: "center",
          borderRadius: "6px",
          border: "1px solid #DBDEDE",
          background: "#FFF",
        }}
      >
        <input
          id="time-picker"
          type="time"
          value={selectedTime}
          onChange={handleChange}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "16px",
            textAlign: "right",
            width: "100%",
            appearance: "none",  // This removes the default clock icon in most browsers
            color: "#4C585B",
            fontFamily: "SimplerPro_HLAR, sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "24px",
          }}
        />
      </div>
    </div>
  );
};

export default CustomTimeFiled;
