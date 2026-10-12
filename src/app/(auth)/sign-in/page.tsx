import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome traveler!"
      subtitle="Login with your phone and password — or keep browsing as a guest."
    >
      <LoginForm />
    </AuthShell>
  )
}
