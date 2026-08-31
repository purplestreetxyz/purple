export function Footer() {
  return (
    <footer className="flex flex-col gap-3 border-t border-paper/20 bg-ink px-5 py-6 text-xs uppercase tracking-[0.12em] text-paper/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
      <p>© {new Date().getFullYear()} Purple Street</p>
    </footer>
  )
}
