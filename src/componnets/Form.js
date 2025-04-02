import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderText from "./HeaderText";
import MiniHeader from "./MiniHeader";
import TextFilee from "./TextFilee";
import { setFormData } from "../redux/formSlice";  // נתיב אל הקובץ המתאים
import { Box } from "@mui/material";

export default function Form() {

    const dispatch = useDispatch();


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        dispatch(setFormData({
            [name]: files ? files[0] : value,
        }));

    };

    return (
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            color: '#000',
            textAlign: 'right',
            fontFamily: 'SimplerPro_HLAR',
            fontWeight: 700,
            justifyContent:'space-between'

        }}>
            <HeaderText placeholder={"פרטים על העסק"} />
            <Box sx={{
                gap:'40px',
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between'
            }}>
                <TextFilee header={"שם העסק"} type="text" name="name" placeholder={"יש להזין את שם העסק"} onChange={handleChange} />

                <TextFilee header={"אימייל"} type="email" name="email" placeholder={"יש להזין את אימייל העסק"} onChange={handleChange} />

                <TextFilee header={".ח.פ. / ע.מ"} type="text" name="id" placeholder={".יש להזין ח.פ. /ע.מ"} onChange={handleChange} />

                <TextFilee header={"טלפון"} type="tel" name="phone" placeholder={"יש להזין את טלפון העסק"} onChange={handleChange} />

                <Box>
                    <TextFilee
                        header={"לוגו חנות"}
                        type="file"
                        name="logo"
                        placeholder={"יש לבחור קבצים"}
                        onChange={handleChange}
                    />
                    <MiniHeader placeholder={"בלבד JPG, PNG ו-2PDF ניתן להעלות קבצים בפורמטים"} />
                </Box>
            </Box>
        </form>
    );
}
