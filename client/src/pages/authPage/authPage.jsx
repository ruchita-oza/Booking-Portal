/** @format */

import React, {  useState } from "react";
import Login from "./login";
import Register from "./register";

function AuthPage() {	

	const [isSignUp, changeForm] = useState(false);



	return (
			<div className="container-fluid d-flex justify-content-center">
		
					{isSignUp ? (
						<Register changeVal={() => changeForm(false)}></Register>
					) : (
						<Login changeVal={() => changeForm(true)}></Login>
					)}
			
		</div>
	);
}

export default AuthPage;