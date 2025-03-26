import React from "react";
import HeaderText from "./HeaderText";
import CustomButton from "./CustomButton";
import CustomButtonRectangle from "./CustomButtonRectangle";
import TextOnTextFiled from "./TextOnTextFiled";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../redux/formSlice";

export default function FormButtons() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.pertip); // קבלת הנתונים מ-Redux

    const handleSelectMarketer = (value) => {
        // עדכון ה-state של typeMarketer ב-Redux
        dispatch(setFormData({ typeMarketer: value }));
    };

    const handleSelectSales = (value) => {
        // עדכון ה-state של typeSales ב-Redux
        dispatch(setFormData({
            typeSales: formData.typeSales.includes(value)
                ? formData.typeSales.filter((item) => item !== value) // אם נבחר, נמחק את הערך
                : [...formData.typeSales, value] // אם לא נבחר, נוסיף את הערך
        }));
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '24px',
        }}>
            <HeaderText placeholder=" סוג משווק" />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '36px',
                alignSelf: 'stretch',
                marginBottom: '60px'
            }}>
                <CustomButton
                    item={{ value: "סוכן", image: "https://www.yaelyaniv.com/cdn/shop/products/73_large.jpg?v=1494952095", label: "סוכן" }}
                    selected={formData.typeMarketer === "סוכן"}
                    handleSelect={() => handleSelectMarketer("סוכן")}
                />
                <CustomButton
                    item={{ value: "חנות", image: "https://www.yaelyaniv.com/cdn/shop/products/73_large.jpg?v=1494952095", label: "חנות" }}
                    selected={formData.typeMarketer === "חנות"}
                    handleSelect={() => handleSelectMarketer("חנות")}
                />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                gap: '170px',
                alignSelf: 'stretch',
                justifyContent:'flex-end'
            }}>
                <TextOnTextFiled header="אפשר לבחור יותר מאפשרות אחת" />
                <HeaderText placeholder="סוג המכירות " />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            }}>
                <CustomButtonRectangle
                    item={{ value: "3", image: "https://www.yaelyaniv.com/cdn/shop/products/73_large.jpg?v=1494952095", label: "קווי" }}
                    selected={formData.typeSales.includes("3")}
                    handleSelect={() => handleSelectSales("3")}
                />
                <CustomButtonRectangle
                    item={{ value: "4", image: "https://www.yaelyaniv.com/cdn/shop/products/73_large.jpg?v=1494952095", label: "סלולארי" }}
                    selected={formData.typeSales.includes("4")}
                    handleSelect={() => handleSelectSales("4")}
                />
                <CustomButtonRectangle
                    item={{ value: "5", image: "https://www.yaelyaniv.com/cdn/shop/products/73_large.jpg?v=1494952095", label: "רכבים" }}
                    selected={formData.typeSales.includes("5")}
                    handleSelect={() => handleSelectSales("5")}
                />
            </div>
        </div>
    );
}
