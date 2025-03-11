import React from "react";
import HoursDay from "./HoursDay";
import HeaderText from "./HeaderText";
import EditIcon from "./buttons/EditIcon";

export default function HoursOpen({ setIsEditing, placeholder , isEditing}) {

    
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end", // מיישר לימין
        }}>
            <div style={{
                display: "flex",
                width: "488px",
                justifyContent: "space-between",
                alignItems: "center", // מוודא ש-HeaderText ו-EditIcon יהיו באותו קו גובה
                flexShrink: 0,
                height: "48px" // נותן גובה אחיד לכל השורה
            }}>
                <EditIcon setIsEditing={setIsEditing} />
                <HeaderText placeholder={placeholder} color={'black'} />
            </div>
            <div style={{
                marginLeft: '24px',
                direction: 'rtl',
                display: "flex",
                flexDirection: "column",
                gap: '10px',
            }}>
                <HoursDay placeholder={"ימים א-ה"} />
                <HoursDay placeholder={"יום ו"} />
            </div>
        </div>
    );
}
