import React from 'react'
import { Control, FieldPath } from 'react-hook-form'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import { authformSchema } from '@/lib/utils'

const formSchema = authformSchema('sign-up');


interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='!form-item'>
                    <FormLabel className='!form-label'>
                        {label}
                    </FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input
                                id={name}
                                placeholder={placeholder}
                                className='!input-class '
                                {...field}
                                type={name === "password" ? "password" : "text"}
                            />
                        </FormControl>
                    </div>
                    <FormMessage className='text-red-700' />
                </div>
            )}
        />
    )
}

export default CustomInput
