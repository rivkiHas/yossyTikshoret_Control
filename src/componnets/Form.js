import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderText from "./HeaderText";
import MiniHeader from "./MiniHeader";
import TextFilee from "./TextFilee";
import { setFormData } from "../redux/formSlice";  // נתיב אל הקובץ המתאים
 

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
            gap: '40px',
            color: '#000',
            textAlign: 'right',
            fontFamily: 'SimplerPro_HLAR',
            fontSize: '28px',
            fontWeight: 700,
        }}>
            <HeaderText placeholder={"פרטים על העסק"} />

            <TextFilee header={"שם העסק"} type="text" name="name" placeholder={"יש להזין את שם העסק"}  onChange={handleChange} />

            <TextFilee header={"אימייל"} type="email" name="email" placeholder={"יש להזין את אימייל העסק"} onChange={handleChange} />

            <TextFilee header={".ח.פ. / ע.מ"} type="text" name="id" placeholder={".יש להזין ח.פ. /ע.מ"} onChange={handleChange} />

            <TextFilee header={"טלפון"} type="tel" name="phone" placeholder={"יש להזין את טלפון העסק"} onChange={handleChange} />

            <div>
                <TextFilee
                    header={"לוגו חנות"}
                    type="file"
                    name="logo"
                    placeholder={"יש לבחור קבצים"}
                    onChange={handleChange}
                />
                <MiniHeader placeholder={"בלבד JPG, PNG ו-PDF ניתן להעלות קבצים בפורמטים"} />
            </div>
        </form>
    );
}
