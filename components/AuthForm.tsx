"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

const authFormSchema = (type: FormType) =>{
  return(
    z.object({
      name:type ==='sign-up'?z.string().min(3):z.string().optional(),
      email:z.string().email(),
      password:z.string().min(3)
    })
  )
}

const AuthForm = ({type}:{type:FormType}) =>{
  const router = useRouter();
   const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email:"",
        password:""
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      try{
        if(type === 'sign-up'){
          toast.success('Account created successfully please sign in now.');
          router.push('/sign-in')
        }else{
          toast.success('Account created successfully.')
          router.push('/')
        }
        
      }catch(error){
        console.log(error);
        toast.error(`There is an error ${error}`)
      }
    }
    const isSignIn = type ==="sign-in";
  return(
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col card gap-6 py-14 px-10">
        <div className="flex flex-row justify-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38}/>
          <h2 className="text-primary-100">Prepwise</h2>
        </div>
        <h3>Practice Job Interview with AI</h3>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn && 
                    <FormField control={form.control}
                      name="name"
                      label="Name"
                      placeholder="Your Name"/>
                      }
        <FormField control={form.control}
                      name="email"
                      label="email"
                      placeholder="Email"
                      type="email"/>
        <FormField control={form.control}
                      name="password"
                      label="password"
                      placeholder="Enter your password"
                      type="password"
                      />

        <Button className="btn" type="submit">{isSignIn?"Sign in":"Create an Account"}</Button>
      </form>
    </Form>

    <p className="text-center">
    {isSignIn ? 'No account yet':'Have an account already?'}
    <Link href={!isSignIn?'/sign-in':'/sign-up'} className="font-bold text-user-primary ml-1">
    {!isSignIn ? "Sign in":"Sign up"}
    </Link>

    </p>

    </div>
  </div>
  )
}
export default AuthForm;