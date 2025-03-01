"use client"
import { FunctionComponent, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeliveryPayload, DeliverySchema } from "@/schema/delivery";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { saveDeliveryInfo } from "@/actions/delivery";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface DeliveryInfoFormProps {
    initialAddress : string | undefined , 
    initialPostalCode :string | undefined , 
    initalPhoneNumber : string | undefined, 
    update : () => void
    
}
 
const DeliveryInfoForm: FunctionComponent<DeliveryInfoFormProps> = ({initalPhoneNumber,initialAddress,initialPostalCode,update}) => {

    const form = useForm<DeliveryPayload>({ 
        resolver : zodResolver(DeliverySchema), 
        defaultValues : { 
            address : initialAddress ?? "", 
            phoneNumber : initalPhoneNumber ?? "", 
            postalCode : initialPostalCode ?? ""
        }
    })

    const router = useRouter()

    const [isPending,startTransition] = useTransition()
    async function onSubmit(values : DeliveryPayload) { 
        startTransition(() => {
            saveDeliveryInfo(values).then((data) => { 
                if (data.error) { 
                    toast(data.error)
                }
                update()
                router.refresh()
            })
        })
    }
    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
            <FormField
                control={form.control}
                name ="address"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Address
                        </FormLabel>
                        <FormControl>
                            <Input {...field}  />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}

                
            />
            <FormField
                control={form.control}
                name = "phoneNumber"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Phone number
                        </FormLabel>
                        <FormControl>
                            <Input {...field}  />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}

                
            />
            <FormField
                control={form.control}
                name ="postalCode"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Postal Code
                        </FormLabel>
                        <FormControl>
                            <Input {...field}  />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}

                
            />

            <Button className="w-full" disabled={isPending}>{isPending ? "Loading ..." : "Save changes"}</Button>
        </form>
    </Form>  )
    
}
 
export default DeliveryInfoForm
