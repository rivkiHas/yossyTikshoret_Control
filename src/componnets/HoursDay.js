import React from "react";
import CustomTimeFiled from "./CustomTimeField";
import HeaderText from "./HeaderText";

const HoursDay = ({ placeholder }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            // alignSelf: 'stretch',
            // width: '488px',
            padding: '10px',
            gap: '24px', // הגדל את הרווח בין האלמנטים
            background: 'var(--Color, #FFF)', // צבע הרקע
            direction: 'rtl', // סידור מימין לשמאל
            marginRight: '0px',
            gap:'24px'
        }}>
            <div style={{
                // width:'135px',
                gap:'24px',
                marginBottom:'24px'
            }
            }>
                <HeaderText placeholder={placeholder} color="#F8BD00"  />
            </div>
            <CustomTimeFiled header={"שעת פתיחה"} />
            <CustomTimeFiled header={"שעת סגירה"} />
        </div>
    );
};

export default HoursDay;
