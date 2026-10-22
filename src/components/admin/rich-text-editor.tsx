"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  TextBoldIcon,
  TextItalicIcon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
  minHeightClassName?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing…",
  className,
  minHeightClassName = "min-h-36",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        code: false,
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none px-3 py-2 font-lato text-sm text-slate-800 outline-none",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
          "[&_p]:my-1 [&_li]:my-0.5",
          minHeightClassName
        ),
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor: current }) => {
      onChange(current.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    const next = value || ""
    if (editor.getHTML() === next) return
    editor.commands.setContent(next, { emitUpdate: false })
  }, [editor, value])

  if (!editor) return null

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200 bg-white",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <Button
          type="button"
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          size="icon-xs"
          className="rounded-lg"
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          size="icon-xs"
          className="rounded-lg"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
          size="icon-xs"
          className="rounded-lg"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
        >
          <HugeiconsIcon icon={LeftToRightListBulletIcon} strokeWidth={2} />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
          size="icon-xs"
          className="rounded-lg"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered list"
        >
          <HugeiconsIcon icon={LeftToRightListNumberIcon} strokeWidth={2} />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
