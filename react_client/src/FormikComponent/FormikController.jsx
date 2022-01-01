import Input from "./TextInputField"

function FormikController(props) {
  const { control, ...rest } = props
  switch (control) {
    case "input":
      return <Input {...rest} />
    default:
      return null
  }
}
export default FormikController