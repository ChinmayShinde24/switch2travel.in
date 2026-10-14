import { redirect } from "next/navigation"

/** Admin playground entry — trips is the primary workspace. */
export default function AdminHomePage() {
  redirect("/admin/trips")
}
