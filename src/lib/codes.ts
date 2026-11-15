import type { Stage } from "../config/stages.ts"

export type CodeResult =
  | { status: "empty" }
  | { status: "wrong" }
  | { status: "too-soon" }
  | { status: "already"; stageId: string }
  | { status: "unlocked"; stageId: string }

export function normalizeCode(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLocaleUpperCase("es")
    .replace(/[^A-Z0-9]/g, "")
}

export function orderedStages(stages: readonly Stage[]): Stage[] {
  return [...stages].sort((a, b) => a.order - b.order)
}

export function currentStage(stages: readonly Stage[], completedIds: readonly string[]): Stage | null {
  return orderedStages(stages).find((stage) => !completedIds.includes(stage.id)) ?? null
}

export function isStoryComplete(stages: readonly Stage[], completedIds: readonly string[]): boolean {
  return stages.length > 0 && stages.every((stage) => completedIds.includes(stage.id))
}

export function evaluateCode(
  raw: string,
  stages: readonly Stage[],
  completedIds: readonly string[],
): CodeResult {
  const code = normalizeCode(raw)
  if (!code) return { status: "empty" }

  const match = orderedStages(stages).find((stage) => normalizeCode(stage.code) === code)
  if (!match) return { status: "wrong" }
  if (completedIds.includes(match.id)) return { status: "already", stageId: match.id }

  const current = currentStage(stages, completedIds)
  if (!current || current.id !== match.id) return { status: "too-soon" }
  return { status: "unlocked", stageId: match.id }
}

export function findConfigIssues(stages: readonly Stage[]): string[] {
  const issues: string[] = []
  const ids = new Set<string>()
  const orders = new Set<number>()
  const codes = new Set<string>()
  const ordered = orderedStages(stages)

  ordered.forEach((stage, index) => {
    if (!stage.id.trim()) issues.push("Hay una etapa sin identificador.")
    if (ids.has(stage.id)) issues.push(`Identificador repetido: ${stage.id}`)
    ids.add(stage.id)

    if (orders.has(stage.order)) issues.push(`Orden repetido: ${stage.order}`)
    orders.add(stage.order)

    const code = normalizeCode(stage.code)
    if (!code) issues.push(`${stage.chapter}: falta el código.`)
    else if (codes.has(code)) issues.push(`Código repetido: ${stage.code}`)
    if (code) codes.add(code)

    const isLast = index === ordered.length - 1
    const hasPlace = Boolean(stage.nextPlace?.trim())
    const hasInstruction = Boolean(stage.nextInstruction?.trim())
    if (isLast && (hasPlace || hasInstruction)) {
      issues.push(
        `${stage.chapter}: la última etapa no debe revelar otro destino. Deja nextPlace y nextInstruction en null.`,
      )
    }
    if (!isLast && (!hasPlace || !hasInstruction)) {
      issues.push(`${stage.chapter}: falta el siguiente destino o la indicación.`)
    }
    if (!stage.photo.trim()) issues.push(`${stage.chapter}: falta la foto.`)
  })

  return issues
}
