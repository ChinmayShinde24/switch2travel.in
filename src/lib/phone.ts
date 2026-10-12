/** Keep only the 10-digit Indian mobile. Strips +91 / 91 / leading 0. */
export function normalizeIndianPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "")

  if (digits.startsWith("0")) {
    digits = digits.replace(/^0+/, "")
  }

  // +91XXXXXXXXXX or 91XXXXXXXXXX
  if (digits.startsWith("91") && digits.length >= 12) {
    digits = digits.slice(2)
  }

  // If still too long (pasted country code variants), keep last 10
  if (digits.length > 10) {
    digits = digits.slice(-10)
  }

  return digits
}

export function isValidIndianMobile(phone: string): boolean {
  // Exactly 10 digits; +91 is UI-only and stripped by normalizeIndianPhone
  return /^\d{10}$/.test(phone)
}

/** Candidates to look up for older records that accidentally stored 91 prefix. */
export function phoneLookupCandidates(phone: string): string[] {
  const normalized = normalizeIndianPhone(phone)
  const candidates = new Set<string>([normalized])

  if (normalized.length === 10) {
    candidates.add(`91${normalized}`)
  }

  // Legacy: user typed 91 + only 8 local digits -> stored as 10 chars starting with 91
  if (normalized.length === 10 && normalized.startsWith("91")) {
    candidates.add(normalized.slice(2))
  }

  return [...candidates]
}
