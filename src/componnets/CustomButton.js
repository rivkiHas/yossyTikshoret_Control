import React from 'react';
import { Box } from "@mui/material";

export default function CustomButton({ item, selected, handleSelect }) {
    if (!item) return null; // בדיקה אם item לא קיים

    return (
        <Box
            onClick={() => handleSelect(item.value)}
            sx={{
                position: "relative",
                width: '227px',
                height: '146px',
                borderRadius: "40px",
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
