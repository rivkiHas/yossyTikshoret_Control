import React from "react";
import HeaderText from "./HeaderText";
import TextFilee from "./TextFilee";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../redux/conectManSlice";
import { Typography } from "@mui/material";
import TextOnTextFiled from "./TextOnTextFiled";
import ButtonsWithIcon from "./buttons/ButtonswithIcon";

export default function FinalForm({ contactId }) {
    const [errors, setErrors] = React.useState({});

    const dispatch = useDispatch();
    const contactMans = useSelector(state => state.conectMan.contactMans || []);
    const brunches = useSelector(state => state.brunch.brunches || []);
    const contact = contactMans[contactId] || {};

    // פונקציית בדיקת תקינות טלפון (מספרים בלבד, 9-10 ספרות)
    const validatePhone = (phone) => {
        return /^0\d{8,9}$/.test(phone);
    };

    // פונקציית בדיקת תקינות אימייל
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // עדכון סטייט ושליחת הנתונים ל-Redux
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormData({ name, value, contactId }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: name === "phone" ? !validatePhone(value) : 
                    name === "email" ? !validateEmail(value) : 
                    false
        }));
    };

    const sendEmail = () => {
        console.log("clicked email");
    };
    
    const sendPhone = () => {
        console.log("clicked phone");
    };

    const hasOwnerRole = contactMans.some(contact => contact.role === "owner");

    const roleOptions = hasOwnerRole
        ? [{ value: "seller", label: "מוכר" }] 
        : [
            { value: "owner", label: "בעלים" },
            { value: "seller", label: "מוכר" }
        ];

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
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginLeft: 'auto',
        }}>
            <HeaderText placeholder={`איש קשר ${contactId }`} />

            <TextFilee
                header={"שם מלא"}
                type="text"
                name="name"
                value={contact.name || ""}
                placeholder={"יש להזין את השם המלא"}
                onChange={handleChange}
            />
            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}

            <div>
                <TextFilee
                    header={"טלפון אישי"}
                    type="tel"
                    name="phone"
                    value={contact.phone || ""}
                    placeholder={"יש להזין את הטלפון האישי"}
                    onChange={handleChange}
                />
                <Typography>מספר זה מיועד לקשר אישי ואינו מספר העסק.</Typography>

                {validatePhone(contact.phone) && (
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "384px",
                        height: "46px",
                        // padding: "12px 16px 12px 20px",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "10px",
                        flexShrink: 0
                    }}>
                        <ButtonsWithIcon onClick={sendPhone} variant="outlined" color={'#FFF'} i>שלח</ButtonsWithIcon>
                        <TextOnTextFiled header={"לשלוח לך קוד אימות לטלפון זה?"} />
                    </div>
                )}

                {errors.phone && <span style={{ color: 'red' }}>מספר טלפון לא תקין</span>}
            </div>

            <div>
                <TextFilee
                    header={"אימייל אישי"}
                    type="email"
                    name="email"
                    value={contact.email || ""}
                    placeholder={"יש להזין את האימייל האישי"}
                    onChange={handleChange}
                />
                <Typography>אימייל זה מיועד לקשר אישי ואינו אימייל העסק.</Typography>

                {validateEmail(contact.email) && (
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "384px",
                        height: "46px",
                        padding: "12px 16px 12px 20px",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "10px",
                        flexShrink: 0
                    }}>
                        <ButtonsWithIcon onClick={sendEmail} variant="outlined" color={'#FFF'}>שלח</ButtonsWithIcon>
                        <TextOnTextFiled header={"לשלוח לך קוד אימות לאימייל זה?"} />
                    </div>
                )}

                {errors.email && <span style={{ color: 'red' }}>אימייל לא תקין</span>}
            </div>

            {contactMans.length > 1 && (
                <>
                    <TextFilee
                        header={"סניף"}
                        type="select"
                        name="brunch"
                        value={contact.brunch || ""}
                        placeholder={"בחר סניף"}
                        onChange={handleChange}
                        options={brunches.map(brunch => ({ value: brunch.id, label: brunch.address }))}
                    />

                    <TextFilee
                        header={"תפקיד"}
                        type="select"
                        name="role"
                        value={contact.role || ""}
                        placeholder={"בחר תפקיד"}
                        onChange={handleChange}
                        options={roleOptions}
                    />
                    {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
                </>
            )}
        </form>
    );
}
