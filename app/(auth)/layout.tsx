import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async({children}:{children:ReactNode}) =>{
  const isUserAuthenticate= await isAuthenticated();
    if(isUserAuthenticate) redirect('/');
  return <div className="auth-layout">{children}</div>
}

export default AuthLayout;