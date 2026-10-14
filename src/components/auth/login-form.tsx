"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { normalizeIndianPhone } from "@/lib/phone"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const { login } = useAuth()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    try {
      const loggedIn = await login({ phone: phone.trim(), password })
      window.location.assign(loggedIn.role === "admin" ? "/admin" : "/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in")
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="font-open-sans text-sm font-medium text-slate-700">
          Phone
        </span>
        <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-sky-500 focus-within:ring-[3px] focus-within:ring-sky-500/20">
          <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
            +91
          </span>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit mobile (without +91)"
            value={phone}
            onChange={(event) =>
              setPhone(normalizeIndianPhone(event.target.value))
            }
            className="font-lato h-11 w-full px-3 text-sm outline-none"
            required
          />
        </div>
      </label>

      <label className="block space-y-1.5">
        <span className="font-open-sans text-sm font-medium text-slate-700">
          Password
        </span>
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="font-lato h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-500 focus:ring-[3px] focus:ring-sky-500/20"
          required
        />
      </label>

      {error ? (
        <p className="font-lato text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="font-display h-11 w-full rounded-xl bg-sky-600 text-base font-semibold text-white hover:bg-sky-700"
      >
        {pending ? "Signing in..." : "Login"}
      </Button>

      <p className="font-lato text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-medium text-sky-700 hover:underline">
          Create account
        </Link>
      </p>

      <p className="font-open-sans text-center text-xs text-slate-500">
        By continuing you agree to browse as guest anytime from{" "}
        <Link href="/" className="text-sky-700 hover:underline">
          Home
        </Link>
        .
      </p>
    </form>
  )
}
