import React, { useState } from "react"; // הוספת useState
import { Box } from "@mui/material"; // ודאי שאת משתמשת ב-MUI

const items = [
    { value: "1", image: "https://www.yaelyaniv.com/cdn/shop/products/73_large.jpg?v=1494952095", label: "חנות" },
    { value: "2", image: "https://www.yaelyaniv.com/cdn/shop/products/73_large.jpg?v=1494952095", label: "סוכן" },
];

export default function DataTransfer() {
    const [selected, setSelected] = useState(null); // כאן אנחנו מגדירים את ה-state של הבחירה

    const handleSelect = (value) => {
        setSelected(value); // מעדכנים את הערך הנבחר
    };

    return (
        <div>
            {items.map((item) => (
                // בדיקה אם item קיים
                <CustomButton 
                    key={item.value} 
                    item={item} 
                    selected={selected} 
                    handleSelect={handleSelect} 
                />
            ))}
        </div>
    );
}

