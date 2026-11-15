import { finaleParts, finaleText } from "../config/finale.ts"
import styles from "./FinaleScreen.module.css"

type FinaleScreenProps = {
  onReread: () => void
}

export default function FinaleScreen({ onReread }: FinaleScreenProps) {
  const { body, closing } = finaleParts(finaleText)

  return (
    <section className="screen" data-screen="finale">
      <div className={`frame ${styles.frame}`}>
        <h1 className="srOnly">Palabras finales de Luke</h1>
        <div className={styles.rule} aria-hidden="true" />
        <div className={styles.letter}>
          {body.map((paragraph, index) => (
            <p key={paragraph} style={{ animationDelay: `${0.12 + index * 0.18}s` }}>
              {paragraph}
            </p>
          ))}
          <footer className={styles.signature} style={{ animationDelay: `${0.12 + body.length * 0.18}s` }}>
            {closing.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </footer>
        </div>
        <button
          className={`btnQuiet ${styles.back}`}
          type="button"
          style={{ animationDelay: `${0.28 + body.length * 0.18}s` }}
          onClick={onReread}
        >
          Volver a nuestras cartas
        </button>
      </div>
    </section>
  )
}
