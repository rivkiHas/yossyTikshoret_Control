import React from 'react';
import { Box } from "@mui/material";

export default function CustomButton({ item, selected, handleSelect }) {
    if (!item) return null; // בדיקה אם item לא קיים

    return (
        <Box
            onClick={() => handleSelect(item.value)}
            sx={{
                display: 'flex',
                height: '83.184px', // גובה הקומפוננטה
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '10px',
                alignSelf: 'stretch',
                aspectRatio: '491.00 / 83.18', // יחס הרוחב לגובה
                borderRadius: '100px',
                background: `url(${item.image}) lightgray 0px 0.121px / 100% 99.784% no-repeat, #D9D9D9`,
                boxShadow: 3,
                cursor: 'pointer',
                transition: '0.3s',
                border: selected ? '4px solid #FFC107' : '4px solid transparent',
                position: "relative", // תיקון חשוב
                "&:hover": {
                    opacity: 0.9,
                },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    backgroundColor: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    boxShadow: 1,
                }}
            >
                {item.label}
            </Box>
        </Box>
    );
}
