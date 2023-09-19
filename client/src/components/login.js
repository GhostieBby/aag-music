import FormPage from './FormPage.js'

export default function Login() {

  return (
    <FormPage title="Login" request={Login} redirect="/users" />
  )

}