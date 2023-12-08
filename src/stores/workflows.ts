import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Workflow } from '../models/workflow'
import { ActionStep, HookStep, ScriptStep, StepType } from '../models/step'
import { Job } from '../models/job'

export const workflowsStore = defineStore('workflows', {

  state: () => ({
    workflowsArray: [
      new Workflow({
        id: 1,
        name: "Pull Request",
        fileName: "pull-request.yml",
        jobs: [
          new Job({
            name: "build-container",
            runsOn: ["size_small", "sofa_default"],
            steps: [
              new ActionStep( {
                stepType: StepType.Action,
                actionName: "actions/checkout",
                version: "v4"
              }),
              new  ScriptStep({
                stepType: StepType.Script,
                script: "echo \"Hello world\""
              }),
              new HookStep({
                name: "Pre-build",
                stepType: StepType.Hook,
                steps: [
                ]
              }),
              new HookStep({
                name: "Build",
                stepType: StepType.Hook,
                steps: [
                ]
              })
            ]
          })
        ]
      })
    ],
  }),


  getters: {
    getWorkflows(state) {
      return state.workflowsArray;
    }

  }
})
