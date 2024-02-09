import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(originalState: CyclesState, action: any) {
  if (action.type === ActionTypes.ADD_NEW_CYCLE) {
    // return {
    //   ...originalState,
    //   cycles: [...originalState.cycles, action.payload.newCycle],
    //   activeCycleId: action.payload.newCycle.id,
    // }

    return produce(originalState, (draftState) => {
      draftState.cycles.push(action.payload.newCycle)
      draftState.activeCycleId = action.payload.newCycle.id
    })
  }

  if (action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
    // return {
    //   ...originalState,
    //   cycles: originalState.cycles.map((cycle) => {
    //     if (cycle.id === originalState.activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    //   activeCycleId: null,
    // }

    const currentCycleIndex = originalState.cycles.findIndex(
      (i) => i.id === originalState.activeCycleId,
    )

    if (currentCycleIndex < 0) {
      return originalState
    }

    return produce(originalState, (draftState) => {
      draftState.activeCycleId = null
      draftState.cycles[currentCycleIndex].interruptedDate = new Date()
    })
  }

  if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
    // return {
    //   ...originalState,
    //   cycles: originalState.cycles.map((cycle) => {
    //     if (cycle.id === originalState.activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    //   activeCycleId: null,
    // }

    const currentCycleIndex = originalState.cycles.findIndex(
      (i) => i.id === originalState.activeCycleId,
    )

    if (currentCycleIndex < 0) {
      return originalState
    }

    return produce(originalState, (draftState) => {
      draftState.activeCycleId = null
      draftState.cycles[currentCycleIndex].finishedDate = new Date()
    })
  }

  return originalState
}
