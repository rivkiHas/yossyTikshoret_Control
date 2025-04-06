import { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateBrunchDetails } from "../redux/brunchSlice";
import HeaderText from "./HeaderText";
import EditIcon from "./buttons/EditIcon";
import TextOnTextFiled from "./TextOnTextFiled";
import SwitchButton from "./buttons/SwitchButton";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Space } from "lucide-react";



const BusinessHours2 = ({ brunch }) => {
  const dispatch = useDispatch();
  const [isGrouped, setIsGrouped] = useState(false);
  const [hover, setHover] = useState(-1);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [expandedDays, setExpandedDays] = useState({}); // מצב לכל יום

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

  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked);
  };



  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '48%',
      height: '80vh'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <EditIcon setIsEditing={setIsGrouped} />
        <HeaderText placeholder={'שעות פתיחה'} />
      </Box>
      <SwitchButton checked={isSwitchOn} onChange={handleSwitchChange} />

      <Box sx={{
        maxHeight: 400,
        overflowY: 'auto',
        gap: '16px',
        "&::-webkit-scrollbar": { display: "none" },

      }}>

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
      </Box>
    </Box >
  );
};

const DayRow = ({ day, label, hours, handleChange, hover, index }) => {
  const [isEveningVisible, setIsEveningVisible] = useState(false); // מצב למעקב אם ה-Box מוצג

  const handleEveningClick = () => {
    setIsEveningVisible((prev) => !prev); // משנה את מצב הצגת ה-Box
  };
  return (

    <Box sx={{
      display: "flex",
      flexDirection: 'column',

    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "columm",
        gap: '20px',
        justifyContent: 'space-between'
      }}>
        {hover && (

          <Fab size="small" color="black" aria-label="add" onClick={handleEveningClick}>
            <AddIcon />
          </Fab>
        )}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          gap: '16px'
        }}>
          <Box >
            <TextOnTextFiled header={"שעת סגירה"} />
            <input
              type="time"
              value={hours?.morning?.close || ""}
              onChange={(e) => handleChange(day, "morning", "close", e.target.value, index)}
              style={{
                padding: '12px 16px 12px 20px',
                borderRadius: '6px',
                border: '1px solid #DBDEDE',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
                textAlign: 'right',
                fontFamily: 'SimplerPro_HLAR, sans-serif',
                fontSize: '12px',
                fontWeight: '400',
                color: '#4C585B',
              }}
            />
          </Box>
          <Box>
            <TextOnTextFiled header={"שעת פתיחה"} />
            <input
              type="time"
              value={hours?.morning?.open || ""}
              onChange={(e) => handleChange(day, "morning", "open", e.target.value, index)}
              style={{
                padding: '12px 16px 12px 20px',
                borderRadius: '6px',
                border: '1px solid #DBDEDE',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
                textAlign: 'right',
                fontFamily: 'SimplerPro_HLAR, sans-serif',
                fontSize: '12px',
                fontWeight: '400',
                color: '#4C585B',
              }}
            />
          </Box>
        </Box>
        <HeaderText placeholder={label} color={"#F8BD00"} />

        {isEveningVisible && (<Box sx={{
          display: "flex",
          flexDirection: "columm",
          gap: '20px'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            gap: '16px'
          }} >
            <Box>
              <TextOnTextFiled header={"שעת פתיחה"} />
              <input
                type="time"
                value={hours?.evening?.open || ""}
                onChange={(e) => handleChange(day, "evening", "open", e.target.value, index)}
                style={{
                  padding: '12px 16px 12px 20px',
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

            </Box>
            <Box>
              <TextOnTextFiled header={"שעת סגירה"} />
              <input
                type="time"
                value={hours?.evening?.close || ""}
                onChange={(e) => handleChange(day, "evening", "close", e.target.value, index)}
                style={{
                  padding: '12px 16px 12px 20px',
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
            </Box>
          </Box>
        </Box>
        )}
      </Box>
    </Box >)
}

export default BusinessHours2;
