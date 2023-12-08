import type { Step } from './step'

export class Job {
  name: string
  steps: Step[]
  runsOn: string[]
  constructor(props: Job) {
    Object.assign(this, props)
  }

}
