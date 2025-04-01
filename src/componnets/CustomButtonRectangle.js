import React from 'react';
import { Box } from "@mui/material";

export default function CustomButton({ item, selected, handleSelect }) {
    if (!item) return null; // בדיקה אם item לא קיים

    return (
        <Box
            onClick={() => handleSelect(item.value)}
            sx={{
                display: 'flex',
                // height: '62px', // גובה הקומפוננטה
                padding:'26px 34px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                // gap: '5px',
                alignSelf: 'stretch',
                // aspectRatio: '368.00 /62', // יחס הרוחב לגובה
                borderRadius: '100px',
                backgroundImage: `url(${item.image})`,
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
                    bottom: 14,
                    left: 16,
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "20px",
                    fontSize: "16px",
                    boxShadow: 1,
                }}
            >
                {item.label}
            </Box>
        </Box>
    );
}
