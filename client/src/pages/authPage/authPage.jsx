/** @format */

import React, {  useState } from "react";
import Login from "./login";
import Register from "./register";

function AuthPage() {	

	const [isSignUp, changeForm] = useState(false);



	return (
			<div className="container-fluid">
				<div>
					{isSignUp ? (
						<Register changeVal={() => changeForm(false)}></Register>
					) : (
						<Login changeVal={() => changeForm(true)}></Login>
					)}
				</div>
		</div>
	);
}

export default AuthPage;