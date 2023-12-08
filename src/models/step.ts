export enum StepType {
  Script,
  Action  ,
  CompositeAction,
  Hook = 3
}

export class Step {

  stepType: StepType

  constructor(props) {


  }

}

export class ScriptStep extends Step {

  script: string = ""

  constructor(props: ScriptStep) {
    super(props)
    Object.assign(this, props)
  }


}

export class ActionStep extends Step {
  actionName: string
  version: string = "latest"

  constructor(props: ActionStep) {
    super(props)

    Object.assign(this, props)

  }
}

export class HookStep extends Step {

  name: string = ""
  steps: Step[] = []

  constructor(props: HookStep) {
    super(props)
    Object.assign(this, props)
  }
}

