"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard"
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}