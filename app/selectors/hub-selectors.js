import { createSelector } from 'reselect'

const hubSelector = state => { state.hubSelector };
export const hubBuilderSelector = createSelector(
  hubSelector
)
