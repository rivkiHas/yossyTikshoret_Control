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

export function RegisterForm1() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.form.pertip);

    const form = useForm({
        defaultValues: {
            name: user?.name || "",
            mail: user?.mail || "",
            id: user?.id || "",
            phone: user?.phone || "",
            logo: null,
        },
    });

    const onSubmit = () => {
        const formData = form.getValues();
        console.log("Form Data:", formData);
        dispatch(setFormData(formData));
    };


    const handleInputChange = (field) => (e) => {
        const { name, value, files } = e.target;
        const newValue = files ? files[0] : value;
        field.onChange(e);
        dispatch(setFormData({ [name]: newValue }));
    };

    return (
        <div>
            <Typography className="text-[24px] font-bold mb-6 block w-full">
                פרטים על העסק
            </Typography>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-5/6 space-y-7.5 flex flex-col"
                >
                    {[
                        { name: "name", label: "שם העסק", placeholder: "יש להזין שם העסק" },
                        { name: "mail", label: "אימייל העסק", placeholder: "יש להזין את אימייל העסק" },
                        { name: "id", label: "ח.פ / ע.מ העסק", placeholder: "יש להזין ח.פ / ע.מ העסק" },
                        { name: "phone", label: "טלפון העסק", placeholder: "יש להזין את טלפון העסק" },
                    ].map(({ name, label, placeholder }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            name={name}
                                            placeholder={placeholder}
                                            {...field}
                                            onChange={handleInputChange(field)}
                                        />
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

                </form >
            </Form >
        </div >
    );
}
