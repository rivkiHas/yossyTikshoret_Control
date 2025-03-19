import React from "react";
import TextOnTextFiled from "./TextOnTextFiled";
import { Typography } from "@mui/material";


export default function Stepper() {
    return (
        <div style={{
            display:"flex",
            flexDirection:"row"
        }}>
            <Icon />
            <div style={{
                display:"flex",
                flexDirection:"column"
            }}>
                <TextOnTextFiled />
                <Typography />
            </div>
        </div>
    )
}