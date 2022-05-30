/** @format */

import React from "react";
import   "./button.css";


function button(props) {
	return (
		<input
			type={props.type}
			value={props.value}
			className={" btn cbtn " + props.className}
			onClick={() => props.onClick()}
		/>
	);
}

export default button;