import React from "react";
import HeaderText from "./HeaderText";
import CustomButton from "./CustomButton";
import CustomButtonRectangle from "./CustomButtonRectangle";
import TextOnTextFiled from "./TextOnTextFiled";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../redux/formSlice";
export default function FormButtons() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.pertip);

    const handleSelectMarketer = (value) => {
        dispatch(setFormData({ typeMarketer: value }));
    };

    const handleSelectSales = (value) => {
        dispatch(setFormData({
            typeSales: formData.typeSales.includes(value)
                ? formData.typeSales.filter((item) => item !== value)
                : [...formData.typeSales, value]
        }));
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '12px',
        }}>
            <HeaderText placeholder=" סוג משווק" textAlign={"end"} />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '27px',
                alignSelf: 'stretch',
                marginBottom: '52px'
            }}>
                <CustomButton
                    item={{ value: "סוכן", image: "", label: "סוכן" }}
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
                gap: '80px',
                alignSelf: 'stretch',
                // justifyContent:'center'
            }}>
                <TextOnTextFiled header="אפשר לבחור יותר מאפשרות אחת" textAlign="left" />
                <HeaderText placeholder="סוג המכירות " textAlign={"end"} />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
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
