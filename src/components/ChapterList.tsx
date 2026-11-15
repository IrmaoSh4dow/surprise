import type { ReactNode } from "react"
import { Lock } from "lucide-react"
import type { Stage } from "../config/stages.ts"
import { currentStage } from "../lib/codes.ts"
import styles from "./ChapterList.module.css"

type ChapterListProps = {
  stages: readonly Stage[]
  completedIds: readonly string[]
  onReread: (stageId: string) => void
  codeSlot: ReactNode
}

function stateOf(stage: Stage, stages: readonly Stage[], completedIds: readonly string[]) {
  if (completedIds.includes(stage.id)) return "done" as const
  if (currentStage(stages, completedIds)?.id === stage.id) return "current" as const
  return "locked" as const
}

export default function ChapterList({ stages, completedIds, onReread, codeSlot }: ChapterListProps) {
  return (
    <ol className={styles.list} aria-label="Capítulos del recorrido">
      {stages.map((stage) => {
        const state = stateOf(stage, stages, completedIds)

        if (state === "locked") {
          return (
            <li key={stage.id} className={`${styles.card} ${styles.locked}`}>
              <span className={styles.seal} aria-hidden="true">
                <Lock size={15} strokeWidth={1.5} />
              </span>
              <div>
                <p className={styles.lockedTitle}>
                  <span className="srOnly">Capítulo bloqueado. </span>
                  Todavía no
                </p>
                <p className={styles.lockedText}>Te lo contaré cuando llegue el momento.</p>
              </div>
            </li>
          )
        }

        if (state === "current") {
          return (
            <li
              key={stage.id}
              className={`${styles.card} ${styles.current}`}
              aria-current="step"
              data-current="true"
            >
              <p className={styles.kicker}>Ahora · {stage.chapter}</p>
              <h2 className={styles.place}>{stage.place}</h2>
              <p className={styles.lead}>El código que te di abre esta carta.</p>
              {codeSlot}
            </li>
          )
        }

        return (
          <li key={stage.id} className={`${styles.card} ${styles.done}`}>
            <p className={styles.kicker}>Abierta · {stage.chapter}</p>
            <h2 className={styles.place}>{stage.place}</h2>
            <button className="btnQuiet" type="button" onClick={() => onReread(stage.id)}>
              Leer de nuevo
            </button>
          </li>
        )
      })}
    </ol>
  )
}
