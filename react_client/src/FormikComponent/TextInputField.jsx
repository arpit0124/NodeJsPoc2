import { useField } from "formik"
import { TextField, Typography } from '@material-ui/core';

function Input(props) {
  const { name, label, ...rest } = props
  const [field, meta] = useField(props);

  return (
    <div>
      <TextField className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
                <div className="error" style={{color:'red'}}>{meta.error}</div>
            ) : null}
    </div>
  )
}
export default Input