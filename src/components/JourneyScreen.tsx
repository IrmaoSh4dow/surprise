import { BookOpen } from "lucide-react"
import { useEffect, useRef } from "react"
import type { Stage } from "../config/stages.ts"
import { isStoryComplete, type CodeResult } from "../lib/codes.ts"
import ChapterList from "./ChapterList.tsx"
import CodeEntry from "./CodeEntry.tsx"
import styles from "./JourneyScreen.module.css"

type JourneyScreenProps = {
  stages: readonly Stage[]
  completedIds: readonly string[]
  reduced: boolean
  onSubmit: (code: string) => CodeResult
  onReread: (stageId: string) => void
  onFinale: () => void
}

function progressCopy(completed: number, total: number): string {
  if (completed === 0) return "Todavía no hemos abierto ninguna carta."
  if (completed === total) return "Ya están abiertas todas las cartas que te escribí."
  return `${completed} de ${total} cartas que te escribí.`
}

export default function JourneyScreen({
  stages,
  completedIds,
  reduced,
  onSubmit,
  onReread,
  onFinale,
}: JourneyScreenProps) {
  const complete = isStoryComplete(stages, completedIds)
  const percent = stages.length === 0 ? 0 : (completedIds.length / stages.length) * 100
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (completedIds.length === 0) return
    const current = listRef.current?.querySelector<HTMLElement>("[data-current='true']")
    current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" })
  }, [completedIds.length, reduced])

  return (
    <section className="screen" data-screen="journey">
      <div className="frame">
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <BookOpen size={16} strokeWidth={1.5} aria-hidden="true" />
            Una historia para ti
          </p>
          <h1 className={styles.title}>Nuestro recorrido</h1>
          <p className={styles.progressCopy}>{progressCopy(completedIds.length, stages.length)}</p>
          <div
            className={styles.track}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={stages.length}
            aria-valuenow={completedIds.length}
            aria-valuetext={progressCopy(completedIds.length, stages.length)}
            aria-label="Cartas abiertas"
          >
            <span style={{ width: `${percent}%` }} />
          </div>
        </header>

        {complete && (
          <div className={styles.invite}>
            <p>Quiero que leas lo último que te escribí.</p>
            <button className="btn" type="button" onClick={onFinale}>
              Leer mis últimas palabras
            </button>
          </div>
        )}

        <div ref={listRef}>
          <ChapterList
            stages={stages}
            completedIds={completedIds}
            onReread={onReread}
            codeSlot={<CodeEntry onSubmit={onSubmit} />}
          />
        </div>
      </div>
    </section>
  )
}
