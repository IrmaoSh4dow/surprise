import { useId, useState, type FormEvent } from "react"
import type { CodeResult } from "../lib/codes.ts"
import styles from "./CodeEntry.module.css"

const hints: Record<"empty" | "wrong" | "too-soon", string> = {
  empty: "Cuando tengas el código, escríbelo aquí, mi amor.",
  wrong: "Creo que esa no es la llave que estás buscando, mi amor. Inténtalo una vez más.",
  "too-soon": "Esa llave todavía espera su momento. Recorramos primero el lugar en el que estamos, mi amor.",
}

type CodeEntryProps = {
  onSubmit: (code: string) => CodeResult
}

export default function CodeEntry({ onSubmit }: CodeEntryProps) {
  const inputId = useId()
  const hintId = useId()
  const [value, setValue] = useState("")
  const [hint, setHint] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = onSubmit(value)
    if (result.status === "empty" || result.status === "wrong" || result.status === "too-soon") {
      setHint(hints[result.status])
      return
    }
    setHint(null)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor={inputId}>
        El código que te di
      </label>
      <input
        id={inputId}
        className={styles.input}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          if (hint) setHint(null)
        }}
        autoCapitalize="characters"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="done"
        maxLength={40}
        placeholder="Tu código"
        aria-invalid={hint ? true : undefined}
        aria-describedby={hintId}
      />
      <button className={`btn ${styles.submit}`} type="submit">
        Abrir la carta
      </button>
      <p id={hintId} className={styles.hint} role="status" aria-live="polite">
        {hint}
      </p>
    </form>
  )
}
