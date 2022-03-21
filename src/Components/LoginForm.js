import { useState } from "react";
import firebaseAuthService from "../FirebaseAuthService";

function LoginForm({ existingUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await firebaseAuthService.registerUser(userName, password);
      setUserName("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  }
  function handleLogout() {
    firebaseAuthService.logOutUser();
  }

  return <h1>Login Form</h1>;
}

export default LoginForm;
