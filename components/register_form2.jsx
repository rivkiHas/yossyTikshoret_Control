"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Typography } from "./typhography"
import { CodeVerificationFlow } from "./code_verification_flow"
import IconButton from './icon_button'
import { useSelector, useDispatch } from "react-redux"
import { setFormData } from "@/store/contact_man_store"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

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
  email: z
    .string({
      required_error: "",
    })
    .email(),
})


export function RegisterForm2({ OkFunction, contactId, canDelete }) {

  const dispatch = useDispatch()

  const contactMan = useSelector((state) =>
    state.conectMan.contactMans.find((c) => c.id === contactId)
  );
  const contactMans = useSelector((state) => state.conectMan.contactMans || []);
  const contactIndex = contactMans.findIndex((c) => c.id === contactId);
  const brunches = useSelector((state) => state.brunch.brunches || [])
  // const [query, setQuery] = useState('')
  // const [selected, setSelected] = useState(brunches[1])
  // const [open, setOpen] = useState(false);


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {

      contactManName: contactMan?.contactManName || "",
      contactManPhone: contactMan?.contactManPhone || "",
      contactManEmail: contactMan?.contactManEmail || "",
      brunchNames: "",
      owner: "",
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
    <div className="w-85 ">
      <div className="flex justify-between items-center">
        <div className="flex flex-row justify-between items-center mb-4 w-full">
          <Typography className="text-2xl font-bold">איש קשר</Typography>
          <div>
            {canDelete && contactIndex > 0 &&
              <IconButton headerText="מחיקה" onConfirm={(co) => { OkFunction(co) }} contactId={contactId} text={"האם ברצונך למחוק את איש קשר זה?"}/>
            }
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
          {contactMans?.length > 1 && (
            <>
              <FormField
                control={form.control}
                name="brunchNames"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>סניף</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} dir="rtl">
                      <FormControl>
                        <SelectTrigger className="w-full text-right">
                          {
                            brunches.find((b) => b.id === Number(field.value))?.name || "בחר סניף"
                          }
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full text-right">
                        {brunches.map((brunch) => (
                          <SelectItem key={brunch.id} value={String(brunch.id)}>
                            {brunch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="owner"

                render={({ field }) => (
                  <FormItem>
                    <FormLabel>תפקיד</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                      <FormControl>
                        <SelectTrigger className={'w-full text-right'}>
                          <SelectValue placeholder="בחר תפקיד" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className={'w-full text-right'}>
                        <SelectItem value="owner">בעלים</SelectItem>
                        <SelectItem value="seller">מוכר</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

        </form>
      </Form>
    </div>
  )
}