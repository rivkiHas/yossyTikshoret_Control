import { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateBrunchDetails } from "../redux/brunchSlice";
import HeaderText from "./HeaderText";
import EditIcon from "./buttons/EditIcon";
import TextOnTextFiled from "./TextOnTextFiled";
import SwitchButton from "./buttons/SwitchButton";

const BusinessHours2 = ({ brunch }) => {
  const dispatch = useDispatch();
  const [isGrouped, setIsGrouped] = useState(false);
  const [hover, setHover] = useState(-1);
  const [isSwitch, setIsSwitch] = useState(true);

  const handleChange = (period, type, value, index) => {
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
        }
      })
    );
  };

  const onChangeSwitch = () => {
    setIsSwitch((prev) => !prev); // מעדכן את מצב ה-Switch

  }

  return (
    <div>
      <EditIcon setIsEditing={setIsGrouped} />
      <SwitchButton onChange={onChangeSwitch} setIsSwitch={setIsSwitch} />

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
  <div style={{
    display: "flex",
    flexDirection: "row"

  }}  >
    <div style={{
      display: "flex",
      flexDirection: "columm",
      textAlign: "right"
    }}>
      <div>
        <TextOnTextFiled header={"שעת פתיחה"} />
        <input
          type="time"
          value={hours?.morning?.open || ""}
          onChange={(e) => handleChange(day, "morning", "open", e.target.value, index)}
          style={{
            padding: '9px 12px 9px 15px',
            borderRadius: '6px',
            border: '1px solid #DBDEDE',
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
            textAlign: 'right',
            fontFamily: 'SimplerPro_HLAR, sans-serif',
            fontSize: '12px',
            fontWeight: '400',
            color: '#4C585B',
            width: '100%', // הרחבה לכל הרוחב
          }}
        />
        <HeaderText placeholder={label} color={"#F8BD00"} />
      </div>

      <div>
        <TextOnTextFiled header={"שעת סגירה"} />
        <input
          type="time"
          value={hours?.morning?.close || ""}
          onChange={(e) => handleChange(day, "morning", "close", e.target.value, index)}
          style={{
            padding: '9px 12px 9px 15px',
            borderRadius: '6px',
            border: '1px solid #DBDEDE',
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
            textAlign: 'right',
            fontFamily: 'SimplerPro_HLAR, sans-serif',
            fontSize: '12px',
            fontWeight: '400',
            color: '#4C585B',
            width: '100%', // הרחבה לכל הרוחב
          }}
        />
      </div>
    </div>

    {hover && (
      <div style={{
        // display: "flex",
        // flexDirection: "row"
      }}>
        <div>
        <TextOnTextFiled header={"שעת פתיחה"} />
        <input
          type="time"
          value={hours?.evening?.open || ""}
          onChange={(e) => handleChange(day, "evening", "open", e.target.value, index)}
          style={{
            padding: '9px 12px 9px 15px',
            borderRadius: '6px',
            border: '1px solid #DBDEDE',
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
            textAlign: 'right',
            fontFamily: 'SimplerPro_HLAR, sans-serif',
            fontSize: '12px',
            fontWeight: '400',
            color: '#4C585B',
            width: '100%', // הרחבה לכל הרוחב
          }}
        />
        </div>
      
        <TextOnTextFiled header={"שעת סגירה"} />
        <input
          type="time"
          value={hours?.evening?.close || ""}
          onChange={(e) => handleChange(day, "evening", "close", e.target.value, index)}
          style={{
            padding: '9px 12px 9px 15px',
            borderRadius: '6px',
            border: '1px solid #DBDEDE',
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
            textAlign: 'right',
            fontFamily: 'SimplerPro_HLAR, sans-serif',
            fontSize: '12px',
            fontWeight: '400',
            color: '#4C585B',
            width: '100%', // הרחבה לכל הרוחב
          }}
        />
      </div>
    )}
  </div>
);

export default BusinessHours2;
