import { AuthShell } from "@/components/auth/auth-shell"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Name, unique phone, unique email, and a password. Guest browsing stays open."
    >
      <SignupForm />
    </AuthShell>
  )
}
