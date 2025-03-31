import React from 'react';
import { Box } from "@mui/material";
import HeaderText from './HeaderText';

export default function CustomButton({ item, selected, handleSelect }) {
    if (!item) return null; // בדיקה אם item לא קיים

    return (
        <Box
            onClick={() => handleSelect(item.value)}
            sx={{
                position: "relative",
                width: '170px',
                height: '109px',
                borderRadius: "30px",
                overflow: "hidden",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: 3,
                cursor: "pointer",
                transition: "0.3s",
                border: selected ? "4px solid #FFC107" : "4px solid transparent",
                "&:hover": {
                    opacity: 0.9,
                },
            }}
        >
            <Box
                sx={{
                    width:"59.25px",
                    height:"29.25px",
                    position: "absolute",
                    bottom: 14,
                    left: 16,
                    backgroundColor: "white",
                    borderRadius: "15px",
                    fontSize:"16px",

                    boxShadow: 1,
                }}
            >
                {item.label}

            </Box>
        </Box>
    );
}
