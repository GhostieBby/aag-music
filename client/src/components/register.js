import FormPage from './FormPage.js'

export default function Register() {

  return (
    <FormPage title="Register" request={Register} redirect="/users" />
  )
}