"use client"

import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Typography } from "./typhography";
import { setFormData } from "../store/form_store";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import TooltipValid from "./tooltip_valid";

export function RegisterForm1({ form }) {
    const dispatch = useDispatch();
    const errorsPertip = useSelector((state) => state.formErrors.pertip);

    const onSubmit = () => {
        const formData = form.getValues();
        dispatch(setFormData(formData));
    };

    const handleInputChange = (field) => (e) => {
        const { name, value, files } = e.target;
        const newValue = files ? files[0] : value;
        field.onChange(e);
        dispatch(setFormData({ [name]: newValue }));
    };

    const fields = [
        {
            name: "name",
            label: "שם העסק",
            placeholder: "יש להזין שם העסק",
            rules: {
                required: "יש להזין שם עסק",
                minLength: {
                    value: 2,
                    message: "שם העסק חייב להכיל לפחות 2 תווים",
                },
            },
        },
        {
            name: "email",
            label: "אימייל העסק",
            placeholder: "יש להזין את אימייל העסק",
            rules: {
                required: "יש להזין אימייל",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "אימייל לא תקין",
                },
            },
        },
        {
            name: "id",
            label: "ח.פ / ע.מ העסק",
            placeholder: "יש להזין ח.פ / ע.מ העסק",
            rules: {
                required: "יש להזין מספר זיהוי עסק",
                minLength: {
                    value: 7,
                    message: "מספר לא תקין",
                },
            },
        },
        {
            name: "phone",
            label: "טלפון העסק",
            placeholder: "יש להזין את טלפון העסק",
            rules: {
                required: "יש להזין טלפון",
                pattern: {
                    value: /^0\d{1,2}-?\d{7}$/,
                    message: "מספר טלפון לא תקין",
                },
            },
        },
    ];

    return (
        <div className="flex flex-col lg:gap-2.5 gap-6 w-full p-4 justify-center bg-white rounded-2xl">
            <Typography className="text-[24px] font-bold mb-6 block w-full">
                פרטים על העסק
            </Typography>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8.5 flex flex-col"
                >
                    {fields.map(({ name, label, placeholder, rules }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            rules={rules}
                            render={({ field, fieldState }) => (
                                <FormItem className="relative">
                                    <FormLabel className={fieldState.error ? "text-[#000]" : ""}>
                                        {label}
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                name={name}
                                                placeholder={placeholder}
                                                {...field}
                                                onChange={handleInputChange(field)}
                                            />

                                            {(fieldState.error?.message || errorsPertip[name]) && (
                                                <TooltipValid tooltipText={fieldState.error?.message || errorsPertip[name]} />
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    ))}

                    <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => {
                            const file = form.watch("logo");

                            return (
                                <FormItem>
                                    <FormLabel>לוגו העסק</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <input
                                                id="upload"
                                                type="file"
                                                accept=".jpg,.png,.pdf"
                                                className="peer absolute inset-0 z-10 opacity-0 cursor-pointer"
                                                onChange={(e) => {
                                                    const selectedFile = e.target.files?.[0];
                                                    form.setValue("logo", selectedFile);
                                                    dispatch(setFormData({ logo: selectedFile }));
                                                }}
                                            />
                                            <div className="flex justify-between items-center h-9 px-4 border border-input rounded-md bg-background text-sm text-muted-foreground peer-hover:border-primary peer-focus-visible:ring-1 peer-focus-visible:ring-ring transition-colors">
                                                <span className="truncate">
                                                    {file?.name || "יש לבחור קובץ"}
                                                </span>
                                                {file ? (
                                                    <button
                                                        type="button"
                                                        className="text-gray-500 hover:text-red-500"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            form.setValue("logo", null);
                                                            dispatch(setFormData({ logo: null }));
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                ) : (
                                                    <ArrowUpTrayIcon className="w-5 h-5 text-gray-500" />
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        ניתן להעלות קבצים בפורמטים JPG, PNG ו-PDF בלבד.
                                    </FormDescription>
                                </FormItem>
                            );
                        }}
                    />
                </form>
            </Form>
        </div >
    );
}
