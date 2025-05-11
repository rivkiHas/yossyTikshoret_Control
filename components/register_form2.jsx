"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Typography } from "./typhography"
import { CodeVerificationFlow } from "./code_verification_flow"
import IconButton from './icon_button'
import { useSelector, useDispatch } from "react-redux"
import { setFormData } from "@/store/contact_man_store"

const FormSchema = z.object({
  contactManName: z.string().min(2, {
    message: "יש להזין שם בעל לפחות שני תווים.",
  }),
  contactManPhone: z
    .string()
    .min(9, { message: "מספר טלפון קצר מדי." })
    .regex(/^0\d{1,2}-?\d{7}$/, {
      message: "יש להזין מספר טלפון תקני בפורמט ישראלי.",
    }),
  contactManEmail: z.string().email({ message: "יש להזין כתובת אימייל תקינה." }),
})

export function RegisterForm2({ OkFunction, contactId, canDelete }) {

  const dispatch = useDispatch()

  const contactMan = useSelector((state) =>
    state.conectMan.contactMans.find((c) => c.id === contactId)
  );


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contactManName: contactMan?.contactManName || "",
      contactManPhone: contactMan?.contactManPhone || "",
      contactManEmail: contactMan?.contactManEmail || "",
    },
  })

  const watchPhone = form.watch("contactManPhone")
  const watchMail = form.watch("contactManEmail")

  const isPhoneValid = FormSchema.shape.contactManPhone.safeParse(watchPhone).success
  const isEmailValid = FormSchema.shape.contactManEmail.safeParse(watchMail).success

  const onSubmit = () => {
    const formData = form.getValues();
    console.log("Form Data:", formData);
    dispatch(setFormData(formData));
  };

  const handleInputChange = (field) => (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    field.onChange(e);
    dispatch(setFormData({ name, value: newValue, contactId }));
  };


  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-row justify-between items-center mb-4">
          <Typography className="text-2xl font-bold">איש קשר</Typography>
          {canDelete &&
            <IconButton text="מחיקה" onConfirm={(co) => { OkFunction(co) }} contactId={contactId} />
          }

        </div>

      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="contactManName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם מלא</FormLabel>
                <FormControl>
                  <Input placeholder="יש להזין שם מלא"
                    name={field.name}
                    {...field}
                    value={field.value}
                    onChange={handleInputChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactManPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>טלפון אישי</FormLabel>
                <FormControl>
                  <Input placeholder="יש להזין מספר טלפון אישי" {...field}
                    name={field.name}

                    value={field.value}
                    onChange={handleInputChange(field)} />
                </FormControl>
                <FormDescription>מספר זה מיועד לקשר אישי ואינו מספר העסק.</FormDescription>
                {isPhoneValid && <CodeVerificationFlow placeholder="טלפון" />}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactManEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>אימייל אישי</FormLabel>
                <FormControl>
                  <Input placeholder="יש להזין אימייל אישי" {...field}
                    name={field.name}

                    value={field.value}
                    onChange={handleInputChange(field)} />
                </FormControl>
                <FormDescription>אימייל זה מיועד לקשר אישי ואינו אימייל העסק.</FormDescription>
                {isEmailValid && <CodeVerificationFlow placeholder="אימייל" />}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}