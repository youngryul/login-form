"use server";

export async function handleForm(prevState:any,formData:FormData){
    if(formData.get("password") !==  "12345") {
        return {
            errors: 'wrong password!'
        }
    }
    else {
        return {
            success: 'Welcome back!'
        }
    }

}