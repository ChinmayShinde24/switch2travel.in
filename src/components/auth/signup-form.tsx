"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { normalizeIndianPhone } from "@/lib/phone"
import { Button } from "@/components/ui/button"

export function SignupForm() {
  const { signup } = useAuth()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    try {
      await signup({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password,
      })
      window.location.assign("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account")
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="font-open-sans text-sm font-medium text-slate-700">
          Full name
        </span>
        <input
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="font-lato h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-500 focus:ring-[3px] focus:ring-sky-500/20"
          required
        />
      </label>

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
          Email
        </span>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="font-lato h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-500 focus:ring-[3px] focus:ring-sky-500/20"
          required
        />
      </label>

      <label className="block space-y-1.5">
        <span className="font-open-sans text-sm font-medium text-slate-700">
          Password
        </span>
        <input
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="font-lato h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-500 focus:ring-[3px] focus:ring-sky-500/20"
          required
          minLength={8}
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
        {pending ? "Creating account..." : "Create account"}
      </Button>

      <p className="font-lato text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-sky-700 hover:underline">
          Login
        </Link>
      </p>
    </form>
  )
}
