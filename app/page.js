import { RegisterCard } from '@/components/register-card'

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted font-[family-name:var(--font-heebo-sans)]">
      <main className="w-[1720px]">
        <RegisterCard />
      </main>
    </div>
  )
}
