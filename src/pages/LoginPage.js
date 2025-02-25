import React from "react";
import PageLayout from "../components/PageLayout.js";
import LoginForm from "../components/LoginForm.js";
import useAuthStore from "../stores/authStore.ts";

function LoginPage() {
  const login = useAuthStore((state) => state.login);

  return (
    <PageLayout titleFr="Se connecter" titleEn="Log in">
      <LoginForm handleLogin={login} />
    </PageLayout>
  );
}

export default LoginPage;
