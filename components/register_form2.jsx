"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Typography } from "./typhography"
import { CodeVerificationFlow } from "./code_verification_flow"
import IconButton from './icon_button'
import { Button } from "./ui/button";
import { PlusCircleIcon, } from '@heroicons/react/24/outline'
import { addContactMan, deleteContactMan } from "@/store/contact_man_store";
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
import TooltipValid from './tooltip_valid'


const FormSchema = z.object({
  contactManName: z.string().min(2, {
  }),
  contactManPhone: z
    .string()
    .min(9, { message: "מספר טלפון קצר מדי." })
    .regex(/^0\d{1,2}-?\d{7}$/, {
    }),
  contactManEmail: z.string().email({
  }),
  email: z
    .string({
      required_error: "",
    })
    .email(),
})


export function RegisterForm2({ OkFunction, contactId, canDelete, setValidator }) {

  const dispatch = useDispatch()

  const contactMan = useSelector((state) =>
    state.conectMan.contactMans.find((c) => c.id === contactId)
  );
  const contactMans = useSelector((state) => state.conectMan.contactMans || []);
  const contactIndex = contactMans.findIndex((c) => c.id === contactId);
  const brunches = useSelector((state) => state.brunch.brunches || [])

  const addContactManHandler = () => {
    dispatch(addContactMan());
  };

  const form = useForm({
    mode: "onBlur",
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
    <div className="flex flex-col gap-[15px] h-full w-1/2 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-row justify-between items-center mb-4 w-full">
          <Typography className="text-2xl font-bold"> פרטי איש קשר  </Typography>
          <div>
            {canDelete && contactIndex > 0 &&
              <IconButton headerText="מחיקה" onConfirm={(co) => { OkFunction(co) }} contactId={contactId} text={"האם ברצונך למחוק את איש קשר זה?"} />
            }
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          <FormField
            control={form.control}
            name="contactManName"
            render={({ field, fieldState }) => (
              <FormItem className="relative">
                <FormLabel>שם מלא</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="יש להזין שם מלא"
                      name={field.name}
                      {...field}
                      value={field.value}
                      onChange={handleInputChange(field)}
                    />
                    {fieldState.error && (
                      <TooltipValid tooltipText={fieldState.error.message} />
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactManPhone"
            render={({ field, fieldState }) => (
              <FormItem className="relative">
                <FormLabel>טלפון אישי</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="יש להזין מספר טלפון אישי"
                      name={field.name}
                      {...field}
                      value={field.value}
                      onChange={handleInputChange(field)}
                    />
                    {fieldState.error && (
                      <TooltipValid tooltipText={fieldState.error.message} />
                    )}
                  </div>
                </FormControl>
                <FormDescription>מספר זה מיועד לקשר אישי ואינו מספר העסק.</FormDescription>
                {isPhoneValid && <CodeVerificationFlow placeholder="טלפון" />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactManEmail"
            render={({ field, fieldState }) => (
              <FormItem className="relative">
                <FormLabel>אימייל אישי</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="יש להזין אימייל אישי"
                      name={field.name}
                      {...field}
                      value={field.value}
                      onChange={handleInputChange(field)}
                    />
                    {fieldState.error && (
                      <TooltipValid tooltipText={fieldState.error.message} />
                    )}
                  </div>
                </FormControl>
                <FormDescription>אימייל זה מיועד לקשר אישי ואינו אימייל העסק.</FormDescription>
                {isEmailValid && <CodeVerificationFlow placeholder="אימייל" />}
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
                  </FormItem>
                )}
              />
            </>
          )}

        </form>
      </Form>
      <Button
        onClick={addContactManHandler}
        className="lg:hidden w-full mt-[15px] cursor-pointer bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full">
        <PlusCircleIcon />
        הוספת איש קשר נוסף
      </Button>


    </div>
  )
}