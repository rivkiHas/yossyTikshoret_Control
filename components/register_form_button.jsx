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
            image: "images/agent.png",
        },
        {
            value: "חנות",
            label: "חנות",
            image: "images/store.png",
        }
    ];

    const salesOptions = [
        {
            value: "קווי",
            label: "קווי",
            image: "images/line.png",
        },
        {
            value: "סלולרי",
            label: "סלולרי",
            image: "images/phone.png",
        },
        {
            value: "רכבים",
            label: "רכבים",
            image: "images/cars.png",

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
        <div className="flex flex-col w-full items-start lg:bg-transparent lg:p-0 lg:gap-[24px] gap-6 ">
            <div className="flex flex-col w-full justify-center p-4 bg-white rounded-[40px]">
                <Typography className="text-[24px] font-bold">סוג משווק</Typography>
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                    {marketerOptions.map((item) => (
                        <CustomButton
                            key={item.value}
                            item={item}
                            selected={typeMarketer === item.value}
                            handleSelect={handleSelectMarketer}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col w-full justify-center gap-6 p-4 bg-white rounded-[40px]">
                <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-0">
                    <Typography className="text-[24px] font-bold">סוג המכירות</Typography>
                    <Typography className="text-sm text-black-500 font-medium">אפשר לבחור יותר מאפשרות אחת</Typography>
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
        </div>

    );
}
