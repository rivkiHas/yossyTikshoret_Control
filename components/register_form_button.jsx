'use client'

import { Typography } from "./typhography";
import { CustomButton, CustomButtonRectangle } from "./custom_button";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../store/form_store';

export function RegisterFormButton() {
    const dispatch = useDispatch();
    const { typeMarketer, typeSales = [] } = useSelector((state) => state.form.pertip);

    const marketerOptions = [
        {
            value: "סוכן",
            label: "סוכן",
            image: "https://cdn.pixabay.com/photo/2016/03/27/21/16/businessman-1284463_1280.jpg",
        },
        {
            value: "חנות",
            label: "חנות",
            image: "https://cdn.pixabay.com/photo/2017/03/28/12/10/supermarket-2182905_1280.jpg",
        }
    ];

    const salesOptions = [
        {
            value: "קווי",
            label: "קווי",
            image: "https://cdn.pixabay.com/photo/2017/08/02/00/49/cables-2567688_1280.jpg",
        },
        {
            value: "סלולרי",
            label: "סלולרי",
            image: "https://cdn.pixabay.com/photo/2014/04/05/11/40/phone-316859_1280.jpg",
        },
        {
            value: "רכבים",
            label: "רכבים",
            image: "https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_1280.jpg",
        }
    ];

    const handleSelectMarketer = (value) => {
        dispatch(setFormData({ typeMarketer: value }));
    };

    const handleSelectSales = (value) => {
        const updated = typeSales.includes(value)
            ? typeSales.filter((item) => item !== value)
            : [...typeSales, value];
        dispatch(setFormData({ typeSales: updated }));
    };

    return (
        
        <div className="flex flex-col items-start w-full max-w-[488px]">
            <Typography className="text-[24px] font-bold mb-4">סוג משווק</Typography>

            <div className="flex items-center justify-between w-full gap-4 mb-[30px]">
                {marketerOptions.map((item) => (
                    <CustomButton
                        key={item.value}
                        item={item}
                        selected={typeMarketer === item.value}
                        handleSelect={handleSelectMarketer}
                    />
                ))}
            </div>

            <div className="flex flex-row justify-between items-center w-full mb-4">
                <Typography className="text-[24px] font-bold">סוג המכירות</Typography>
                <Typography className="text-sm text-black-500 font-medium">
                    אפשר לבחור יותר מאפשרות אחת
                </Typography>
            </div>

            <div className="flex flex-col gap-6 w-full">
                {salesOptions.map((item) => (
                    <CustomButtonRectangle
                        key={item.value}
                        item={item}
                        selected={typeSales.includes(item.value)}
                        handleSelect={handleSelectSales}
                    />
                ))}
            </div>
        </div>
    );
}
