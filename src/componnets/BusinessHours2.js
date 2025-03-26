import { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateBrunchDetails } from "../redux/brunchSlice";
import HeaderText from "./HeaderText";
import EditIcon from "./buttons/EditIcon";
import TextOnTextFiled from "./TextOnTextFiled";

const BusinessHours2 = ({ brunch }) => {
  const dispatch = useDispatch();
  const [isGrouped, setIsGrouped] = useState(false);
  const [hover, setHover] = useState(-1);

  const handleChange = ( period, type, value, index) => {
    dispatch(
      updateBrunchDetails({
        id: brunch.id,
        hoursOpen: {
          day: index,
          period,
          type,
          value,
        },
        weekday: {
          period,
          type,
          value
        },
        name: "gfahjbkv", // שימי לב אם צריך לעדכן את השדה הזה בהתאם ללוגיקה שלך
      })
    );
  };

  return (
    <div>
      <EditIcon setIsEditing={setIsGrouped} />
      <div>
        {!isGrouped ? (
          <DayRow
            day="weekday"
            label="ימים א'-ה'"
            hours={brunch.weekday}
            handleChange={handleChange}
            index={"weekday"}
          />
        ) : (
          ["ראשון", "שני", "שלישי", "רביעי", "חמישי"].map((day, index) => (
            <Box
              key={index}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(-1)}
            >
              <DayRow
                day={day}
                label={`יום ${day}`}
                hours={brunch[index + 1]}
                handleChange={handleChange}
                hover={hover === index}
                index={index + 1}
              />
            </Box>
          ))
        )}
        <DayRow
          day="שישי"
          label="יום ו'"
          hours={brunch[5]}
          handleChange={handleChange}
          index={5}
        />
      </div>
    </div>
  );
};

const DayRow = ({ day, label, hours, handleChange, hover, index }) => (
  <div>
    <HeaderText placeholder={label} color={"#F8BD00"} />
    <div>
      <TextOnTextFiled header={"שעת פתיחה"} />
      <input
        type="time"
        value={hours?.morning?.open || ""}
        onChange={(e) => handleChange(day, "morning", "open", e.target.value, index)}
      />
      -
      <TextOnTextFiled header={"שעת סגירה"} />
      <input
        type="time"
        value={hours?.morning?.close || ""}
        onChange={(e) => handleChange(day, "morning", "close", e.target.value, index)}
      />
    </div>
    {hover && (
      <div>
        <span>ערב:</span>
        <TextOnTextFiled header={"שעת פתיחה"} />
        <input
          type="time"
          value={hours?.evening?.open || ""}
          onChange={(e) => handleChange(day, "evening", "open", e.target.value, index)}
        />
        -
        <TextOnTextFiled header={"שעת סגירה"} />
        <input
          type="time"
          value={hours?.evening?.close || ""}
          onChange={(e) => handleChange(day, "evening", "close", e.target.value, index)}
        />
      </div>
    )}
  </div>
);

export default BusinessHours2;
