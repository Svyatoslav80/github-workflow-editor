import type { Job } from '@/models/job'

export class Workflow {
  id: number
  name: string
  fileName: string

  jobs: Job[] = []

  constructor(props: Workflow) {
    Object.assign(this, props)
  }

}
