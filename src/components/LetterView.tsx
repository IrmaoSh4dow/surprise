import { useEffect, useRef, useState } from "react"
import { Feather, MapPin } from "lucide-react"
import type { Stage } from "../config/stages.ts"
import Envelope from "./Envelope.tsx"
import styles from "./LetterView.module.css"

type LetterViewProps = {
  stage: Stage
  fresh: boolean
  reduced: boolean
  onContinue: () => void
  onBack: () => void
}

function paragraphs(message: string): string[] {
  return message
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export default function LetterView({ stage, fresh, reduced, onContinue, onBack }: LetterViewProps) {
  const [opened, setOpened] = useState(!fresh || reduced)
  const [showNext, setShowNext] = useState(!fresh && Boolean(stage.nextPlace))
  const [photoReady, setPhotoReady] = useState(true)
  const nextRef = useRef<HTMLElement>(null)
  const lines = paragraphs(stage.message)
  const hasNext = Boolean(stage.nextPlace && stage.nextInstruction)

  useEffect(() => {
    if (!fresh || reduced) return
    const id = window.setTimeout(() => setOpened(true), 1650)
    return () => window.clearTimeout(id)
  }, [fresh, reduced])

  useEffect(() => {
    if (opened) window.scrollTo(0, 0)
  }, [opened])

  useEffect(() => {
    if (!showNext || !fresh) return
    nextRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" })
  }, [showNext, fresh, reduced])

  return (
    <section className="screen" data-screen="letter">
      <div className="frame">
        {!opened && (
          <div className={styles.opening}>
            <div aria-hidden="true">
              <Envelope />
            </div>
            <p>Abriendo la carta que te escribí…</p>
          </div>
        )}

        {opened && (
          <div className={styles.opened}>
            <article className={styles.paper} aria-live="polite">
              <p className={styles.chapter}>{stage.chapter}</p>
              <h1 className={styles.place}>{stage.place}</h1>
              <figure className={styles.polaroid}>
                <div className={styles.photoWrap}>
                  {photoReady ? (
                    <img
                      src={stage.photo}
                      alt="Luke y Valentina"
                      onError={() => setPhotoReady(false)}
                    />
                  ) : (
                    <div className={styles.photoMissing} />
                  )}
                </div>
                <figcaption>{stage.caption}</figcaption>
              </figure>
              <div className={styles.message}>
                {lines.map((line, index) => (
                  <p key={index} style={{ animationDelay: `${0.08 + index * 0.16}s` }}>
                    {line}
                  </p>
                ))}
              </div>
              <footer className={styles.signature}>
                <Feather size={16} strokeWidth={1.5} aria-hidden="true" />
                <p>Con amor,</p>
                <p className={styles.name}>Luke</p>
              </footer>

              {fresh && !showNext && (
                <button
                  className={`btn btnOnPaper ${styles.action}`}
                  type="button"
                  onClick={() => {
                    if (hasNext) setShowNext(true)
                    else onContinue()
                  }}
                >
                  Continuar
                </button>
              )}
            </article>

            {showNext && hasNext && (
              <aside ref={nextRef} className={styles.next} aria-label="Siguiente lugar">
                <p className={styles.nextLead}>
                  <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />
                  Te llevaré al siguiente lugar
                </p>
                <h2>{stage.nextPlace}</h2>
                <p className={styles.instruction}>{stage.nextInstruction}</p>
                {fresh && (
                  <button className={`btn ${styles.action}`} type="button" onClick={onContinue}>
                    Vamos al siguiente lugar
                  </button>
                )}
              </aside>
            )}

            {!fresh && (
              <button className={`btnQuiet ${styles.back}`} type="button" onClick={onBack}>
                Volver a nuestras cartas
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
