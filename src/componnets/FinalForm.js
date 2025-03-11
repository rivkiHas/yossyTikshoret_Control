import React from "react";
import HeaderText from "./HeaderText";
import TextFilee from "./TextFilee";
import { useDispatch } from "react-redux";
import { setFormData } from "../redux/conectManSlice";
import { useSelector } from "react-redux";

export default function FinalForm({ contactId }) {
    const [errors, setErrors] = React.useState({});

    const dispatch = useDispatch();
    const contactMans = useSelector(state => state.conectMan.contactMans || []);
    const brunches = useSelector(state => state.brunch.brunches || []);  // קבלת הסניפים מתוך Redux
    const contact = contactMans[contactId] || {}; // קבלת איש הקשר הרלוונטי על פי ה- contactId

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormData({ name, value, contactId }));
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
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginLeft: 'auto',
            height: '700px',
        }}>
            <HeaderText placeholder={`איש קשר ${contactId + 1}`} />

            <TextFilee
                header={"שם מלא"}
                type="text"
                name="name"
                value={contact.name || ""}
                placeholder={"יש להזין את שם המלא"}
                onChange={handleChange}
            />
            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}

            <TextFilee
                header={"טלפון אישי"}
                type="phone"
                name="phone"
                value={contact.phone || ""}
                placeholder={"יש להזין את הטלפון האישי"}
                onChange={handleChange}
            />
            {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}

            <TextFilee
                header={" אימייל אישי"}
                type="email"
                name="email"
                value={contact.email || ""}
                placeholder={"יש להזין את אימייל האישי"}
                onChange={handleChange}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

            {/* הוספת שדה סניף */}
            <TextFilee
                header={"סניף"}
                type="select"
                name="brunch"
                value={contact.brunch || ""}
                placeholder={"בחר סניף"}
                onChange={handleChange}
                options={brunches.map(brunch => ({ value: brunch.id, label: brunch.address }))}
            />


            {/* הוספת שדה תפקיד */}
            <TextFilee
                header={"תפקיד"}
                type="select"
                name="role"
                value={contact.role || ""}
                placeholder={"בחר תפקיד"}
                onChange={handleChange}
                options={[
                    { value: "owner", label: "בעלים" },
                    { value: "seller", label: "מוכר" }
                ]}
            />
            {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
        </form>
    );
}
