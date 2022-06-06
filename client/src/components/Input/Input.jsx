/** @format */

import "./Input.css";
import { Field } from "formik";
function Input(props) {
	return (
		<Field
			name={props?.name}
			type={props?.type}
			className={props?.className}
		
			value={props?.value}
			onChange={(e) => {
				
				props?.setFieldValue(props?.name, e.target.value);
			}}
		/>
	);
}

export default Input;
