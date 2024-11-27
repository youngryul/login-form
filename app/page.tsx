"use client";

import FormInput from "../app/components/form-input"
import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import {handleForm} from "@/app/action";


export default function Home() {
    const [ state, action ] = useActionState(handleForm, null);
    const { pending } = useFormStatus();

  return (
      <>
          <div className="h-3 w-screen bg-gradient-to-tr mb-52 from-pink-300 to-blue-300 p-0.5"></div>
          <div className="flex flex-col justify-center items-center">
              <div className="mb-10">🍀🍀🍀</div>
              <form action={action} className="flex flex-col gap-3 w-64">
                  <FormInput type="email" placeholder="Email" name="email" errors={state?.fieldErrors.email} />
                  <FormInput type="text" placeholder="Username" name="user" errors={state?.fieldErrors.user} />
                  <FormInput type="password" placeholder="Password" name="password" errors={state?.fieldErrors.password}/>
                  <button disabled={pending} className="bg-blue-400 rounded-full h-10 disabled:bg-gray-300">
                      {pending ? "Loading..." : "Log in"}</button>
                  {/*{state?.success && <div className="h-10 rounded-xl pl-3 place-content-center bg-green-300">{state?.success ?? ""}</div>}*/}
              </form>
          </div>
      </>
  )
}


