import FormInput from "../app/components/form-input"

export default function Home() {
  return (
      <div>
        <div>🍀🍀🍀</div>
        <form>
          <FormInput type={"email"} placeholder={"Email"} name={"email"}/>
          <FormInput type={"text"} placeholder={"Username"} name={"user"}/>
          <FormInput type={"password"} placeholder={"Password"} name={"password"}/>
          <button>Log in</button>
        </form>
      </div>
  )
}


