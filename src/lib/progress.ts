import type { Stage } from "../config/stages.ts"
import { orderedStages } from "./codes.ts"

export const STORAGE_KEY = "historia-valentina"

export type Progress = {
  started: boolean
  completedIds: string[]
}

export const emptyProgress: Progress = {
  started: false,
  completedIds: [],
}

function isRecord(value: unknown): value is { started?: unknown; completedIds?: unknown } {
  return typeof value === "object" && value !== null
}

/** Conserva solo un prefijo válido, para que un almacenamiento alterado no salte etapas. */
export function sanitizeProgress(value: unknown, stages: readonly Stage[]): Progress {
  const record = isRecord(value) ? value : null
  const rawIds = record && Array.isArray(record.completedIds) ? record.completedIds : []
  const completed = new Set(rawIds.filter((id): id is string => typeof id === "string"))
  const completedIds: string[] = []

  for (const stage of orderedStages(stages)) {
    if (!completed.has(stage.id)) break
    completedIds.push(stage.id)
  }

  return {
    started: Boolean(record?.started) || completedIds.length > 0,
    completedIds,
  }
}

export function loadProgress(stages: readonly Stage[]): Progress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress
    return sanitizeProgress(JSON.parse(raw) as unknown, stages)
  } catch {
    return emptyProgress
  }
}

export function saveProgress(progress: Progress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Si el navegador bloquea el almacenamiento, la visita actual sigue funcionando.
  }
}
