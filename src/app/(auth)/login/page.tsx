import React from "react";

// utils
import { generateSeo } from "~/utils";

// generate metadata
export const generateMetadata = () =>
  generateSeo({
    title: "Login",
    description: "AI powered telecom solutions provider",
    url: "/",
  });

const Login: React.FC = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <p>Robusst - Login</p>
    </main>
  );
};

export default Login;
