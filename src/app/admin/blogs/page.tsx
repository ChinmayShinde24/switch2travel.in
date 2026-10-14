export default function AdminBlogsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div>
        <p className="font-open-sans text-[11px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
          Content
        </p>
        <h2 className="font-display mt-1 text-xl font-semibold tracking-tight text-slate-900">
          Blogs
        </h2>
        <p className="font-lato mt-1 max-w-lg text-sm text-slate-500">
          Editorial posts will sit here later. Placeholder only for now.
        </p>
      </div>

      <div className="mt-5 flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-8 text-center">
        <p className="font-display text-sm font-medium text-slate-700">
          Blogs coming soon
        </p>
        <p className="font-lato mt-1 max-w-sm text-sm text-slate-500">
          Space reserved so categories stay a small sidebar feature.
        </p>
      </div>
    </div>
  )
}
