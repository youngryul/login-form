"use client";

import FormInput from "../app/components/form-input"
import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import {handleForm} from "@/app/create-account/action";
import Link from "next/link";


export default function Home() {
    const [ state, action ] = useActionState(handleForm, null);
    const { pending } = useFormStatus();

  return (
      <>
          <div className="h-3 w-screen bg-gradient-to-tr mb-52 from-pink-300 to-blue-300 p-0.5"></div>
          <div className="flex flex-col justify-center items-center">
              <div className="mb-10">🍀🍀🍀</div>
              <div className="flex flex-col items-center gap-3 w-full">
                  <Link
                      href="/create-account"
                      className="bg-cyan-500 p-5 rounded-xl w-36 text-center"
                  >
                      시작하기
                  </Link>
                  <div className="flex gap-2">
                      <Link href="/log-in"
                            className="bg-cyan-500 p-5 rounded-xl w-36 text-center">
                          로그인
                      </Link>
                  </div>
              </div>
          </div>
      </>
  )
}


