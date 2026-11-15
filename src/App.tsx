import { useEffect, useRef, useState } from "react"
import Atmosphere from "./components/Atmosphere.tsx"
import FinaleScreen from "./components/FinaleScreen.tsx"
import JourneyScreen from "./components/JourneyScreen.tsx"
import LetterView from "./components/LetterView.tsx"
import WelcomeScreen from "./components/WelcomeScreen.tsx"
import { storyStages } from "./config/stages.ts"
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.ts"
import { evaluateCode, findConfigIssues, isStoryComplete, type CodeResult } from "./lib/codes.ts"
import { loadProgress, saveProgress, type Progress } from "./lib/progress.ts"
import styles from "./App.module.css"

type View =
  | { name: "welcome" }
  | { name: "journey" }
  | { name: "letter"; stageId: string; fresh: boolean }
  | { name: "finale" }

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState<Progress>(() => loadProgress(storyStages))
  const [shown, setShown] = useState<View>({ name: "welcome" })
  const [visible, setVisible] = useState(true)
  const busy = useRef(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  useEffect(() => {
    if (!import.meta.env.DEV) return
    for (const issue of findConfigIssues(storyStages)) console.warn(issue)
  }, [])

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  function navigate(next: View) {
    if (busy.current) return
    busy.current = true

    if (reduced) {
      setShown(next)
      setVisible(true)
      busy.current = false
      window.scrollTo(0, 0)
      return
    }

    setVisible(false)
    timer.current = window.setTimeout(() => {
      setShown(next)
      setVisible(true)
      busy.current = false
      timer.current = null
      window.scrollTo(0, 0)
    }, 460)
  }

  function begin() {
    setProgress((current) => ({ ...current, started: true }))
    navigate(isStoryComplete(storyStages, progress.completedIds) ? { name: "finale" } : { name: "journey" })
  }

  function handleCode(raw: string): CodeResult {
    const result = evaluateCode(raw, storyStages, progress.completedIds)
    if (busy.current) return result

    if (result.status === "unlocked") {
      setProgress((current) => ({
        ...current,
        started: true,
        completedIds: current.completedIds.includes(result.stageId)
          ? current.completedIds
          : [...current.completedIds, result.stageId],
      }))
      navigate({ name: "letter", stageId: result.stageId, fresh: true })
    } else if (result.status === "already") {
      navigate({ name: "letter", stageId: result.stageId, fresh: false })
    }

    return result
  }

  function leaveLetter() {
    navigate(isStoryComplete(storyStages, progress.completedIds) ? { name: "finale" } : { name: "journey" })
  }

  const letterStage =
    shown.name === "letter" ? storyStages.find((stage) => stage.id === shown.stageId) ?? null : null
  const complete = isStoryComplete(storyStages, progress.completedIds)

  return (
    <>
      <Atmosphere tone={shown.name === "finale" ? "finale" : "dusk"} />
      <div className={`${styles.stage} ${visible ? styles.in : styles.out} ${reduced ? styles.reduced : ""}`}>
        {shown.name === "welcome" && (
          <WelcomeScreen started={progress.started} complete={complete} onBegin={begin} />
        )}
        {shown.name === "journey" && (
          <JourneyScreen
            stages={storyStages}
            completedIds={progress.completedIds}
            reduced={reduced}
            onSubmit={handleCode}
            onReread={(stageId) => navigate({ name: "letter", stageId, fresh: false })}
            onFinale={() => navigate({ name: "finale" })}
          />
        )}
        {shown.name === "letter" && letterStage && (
          <LetterView
            key={`${letterStage.id}-${shown.fresh}`}
            stage={letterStage}
            fresh={shown.fresh}
            reduced={reduced}
            onContinue={leaveLetter}
            onBack={() => navigate({ name: "journey" })}
          />
        )}
        {shown.name === "finale" && <FinaleScreen onReread={() => navigate({ name: "journey" })} />}
      </div>
    </>
  )
}
