"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  Delete02Icon,
  PencilEdit01Icon,
} from "@hugeicons/core-free-icons"
import type { Category, CategoryImage, CategoryStatus } from "@/types/category"
import { uploadCategoryImage } from "@/lib/admin-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

async function parseError(response: Response) {
  const data = (await response.json().catch(() => null)) as {
    error?: string
  } | null
  return data?.error ?? "Something went wrong"
}

type FormState = {
  name: string
  image: CategoryImage | null
  status: CategoryStatus
}

const emptyForm: FormState = {
  name: "",
  image: null,
  status: "active",
}

export function CategoriesPanel() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [fileKey, setFileKey] = useState(0)

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/categories", {
        credentials: "include",
        cache: "no-store",
      })
      if (!response.ok) throw new Error(await parseError(response))
      const data = (await response.json()) as { categories: Category[] }
      setCategories(data.categories)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load categories")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(category: Category) {
    setEditing(category)
    setForm({
      name: category.name,
      image: category.image,
      status: category.status,
    })
    setDialogOpen(true)
  }

  async function onFileChange(file: File | undefined) {
    if (!file) return
    setUploading(true)
    try {
      const image = await uploadCategoryImage(file)
      setForm((prev) => ({ ...prev, image }))
      toast.success("Image uploaded")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setUploading(false)
      setFileKey((k) => k + 1)
    }
  }

  async function onSave() {
    const name = form.name.trim()
    if (!name) {
      toast.error("Name is required")
      return
    }
    if (!form.image) {
      toast.error("Upload an image first")
      return
    }

    setSaving(true)
    try {
      if (editing) {
        const response = await fetch(`/api/admin/categories/${editing.id}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, image: form.image }),
        })
        if (!response.ok) throw new Error(await parseError(response))
        toast.success("Category updated")
      } else {
        const response = await fetch("/api/admin/categories", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            image: form.image,
            status: form.status,
          }),
        })
        if (!response.ok) throw new Error(await parseError(response))
        toast.success("Category created")
      }
      setDialogOpen(false)
      setForm(emptyForm)
      setEditing(null)
      await load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  async function toggleStatus(category: Category) {
    const next: CategoryStatus =
      category.status === "active" ? "inactive" : "active"
    setBusyId(category.id)
    try {
      const response = await fetch(
        `/api/admin/categories/${category.id}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: next }),
        }
      )
      if (!response.ok) throw new Error(await parseError(response))
      toast.success(`Marked ${next}`)
      await load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Status update failed")
    } finally {
      setBusyId(null)
    }
  }

  async function onDelete(category: Category) {
    if (!window.confirm(`Delete “${category.name}”? This cannot be undone.`)) {
      return
    }
    setBusyId(category.id)
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!response.ok) throw new Error(await parseError(response))
      toast.success("Category deleted")
      await load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed")
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Supporting data
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold tracking-tight text-slate-900">
            Categories
          </h2>
          <p className="font-lato mt-1 max-w-md text-sm text-slate-500">
            Compact tags for the home trip rail. Keep this light — trips and
            blogs own the main workspace.
          </p>
        </div>
        <Button
          size="sm"
          onClick={openCreate}
          className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
        >
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} data-icon="inline-start" />
          New category
        </Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500">
            Loading categories…
          </p>
        ) : categories.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="font-display text-sm font-medium text-slate-700">
              No categories yet
            </p>
            <p className="font-lato mt-1 text-sm text-slate-500">
              Create one to populate the home category rail.
            </p>
            <Button
              size="sm"
              className="mt-4 rounded-xl bg-sky-600 text-white hover:bg-sky-700"
              onClick={openCreate}
            >
              Create category
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[52px] pl-4">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[160px] pr-4 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => {
                const busy = busyId === category.id
                return (
                  <TableRow key={category.id}>
                    <TableCell className="pl-4">
                      <div className="relative size-9 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                        <Image
                          src={category.image.url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="36px"
                          unoptimized
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-display font-medium text-slate-900">
                      {category.name}
                    </TableCell>
                    <TableCell className="font-lato font-mono text-xs text-slate-500">
                      {category.slug}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          category.status === "active" ? "default" : "secondary"
                        }
                        className={
                          category.status === "active"
                            ? "bg-emerald-600 text-white"
                            : undefined
                        }
                      >
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          disabled={busy}
                          onClick={() => openEdit(category)}
                          aria-label={`Edit ${category.name}`}
                        >
                          <HugeiconsIcon icon={PencilEdit01Icon} strokeWidth={2} />
                        </Button>
                        <Button
                          variant="outline"
                          size="xs"
                          disabled={busy}
                          onClick={() => void toggleStatus(category)}
                          className="rounded-lg"
                        >
                          {category.status === "active" ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          disabled={busy}
                          onClick={() => void onDelete(category)}
                          aria-label={`Delete ${category.name}`}
                          className="text-destructive hover:text-destructive"
                        >
                          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) {
            setEditing(null)
            setForm(emptyForm)
          }
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit category" : "New category"}
            </DialogTitle>
            <DialogDescription>
              Name and image are required. Slug is generated from the name.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Name</Label>
              <Input
                id="category-name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. Weekend getaways"
                className="rounded-xl"
                maxLength={80}
              />
            </div>

            {!editing && (
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => {
                    if (value === "active" || value === "inactive") {
                      setForm((prev) => ({ ...prev, status: value }))
                    }
                  }}
                >
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="category-image">Image</Label>
              <div className="flex items-center gap-3">
                {form.image ? (
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
                    <Image
                      src={form.image.url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[10px] text-slate-400">
                    None
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <Input
                    key={fileKey}
                    id="category-image"
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => void onFileChange(e.target.files?.[0])}
                    className="rounded-xl"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    {uploading
                      ? "Uploading to ImageKit…"
                      : "Portrait · 800 × 1100 · keep under 25 MP so upload does not fail."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setDialogOpen(false)}
              disabled={saving || uploading}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
              onClick={() => void onSave()}
              disabled={saving || uploading}
            >
              {saving ? "Saving…" : editing ? "Save changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
