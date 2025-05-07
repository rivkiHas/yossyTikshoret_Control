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

export function RegisterForm1() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.form.pertip);

    const form = useForm({
        defaultValues: {
            username: user?.username || "",
            useremail: user?.useremail || "",
            userid: user?.userid || "",
            userphone: user?.userphone || "",
            userlogo: null,
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
                    className="w-5/6 space-y-6 flex flex-col"
                >
                    {[
                        { name: "username", label: "שם העסק", placeholder: "יש להזין שם העסק" },
                        { name: "useremail", label: "אימייל העסק", placeholder: "יש להזין את אימייל העסק" },
                        { name: "userid", label: "ח.פ / ע.מ העסק", placeholder: "יש להזין ח.פ / ע.מ העסק" },
                        { name: "userphone", label: "טלפון העסק", placeholder: "יש להזין את טלפון העסק" },
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
                        name="userlogo"
                        render={() => (
                            <FormItem>
                                <FormLabel>לוגו העסק</FormLabel>
                                <FormControl>
                                    <Input
                                        name="userlogo"
                                        type="file"
                                        accept=".jpg,.png,.pdf"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            form.setValue("userlogo", file);
                                            dispatch(setFormData({ userlogo: file.name }));
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    ניתן להעלות קבצים בפורמטים JPG, PNG ו-PDF בלבד.
                                </FormDescription>
                            </FormItem>
                        )}
                    />

                </form>
            </Form>
        </div>
    );
}
