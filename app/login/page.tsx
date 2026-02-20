"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import styles from "./page.module.css"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard"
    })

    setLoading(false)
  }

  const disabled = loading || !email || !password

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign in to your account</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              data-testid="email-input"
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              data-testid="password-input"
              className={styles.input}
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            data-testid="login-button"
            className={styles.button}
            type="submit"
            disabled={disabled}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className={styles.helper}>Need an account? <span className={styles.small}>Contact an administrator.</span></p>
      </div>
    </div>
  )
}