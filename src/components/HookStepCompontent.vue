<script setup lang="ts">

import { ActionStep, HookStep, ScriptStep, StepType } from '@/models/step'
import ScriptStepComponent from '@/components/ScriptStepComponent.vue'
import ActionStepComponent from '@/components/ActionStepComponent.vue'

const props = defineProps<{
  hookStep: HookStep
}>()


function addStep(stepType: StepType) {
  if(stepType == StepType.Script) {
    props.hookStep.steps.push(new ScriptStep({ stepType: stepType, script: "" }))
  }
  else if(stepType === StepType.Action) {
    props.hookStep.steps.push(new ActionStep({ stepType: stepType, actionName: "", version: "latest" }))
  }
}

</script>

<template>

  <div>Hook {{ hookStep.name }} - <button @click="addStep(StepType.Script)">Add script</button>  <button @click="addStep(StepType.Action)">Add action</button></div>

  <div v-for="step in hookStep.steps" class="step">
    <ScriptStepComponent :script-step="step" v-if="step.stepType === StepType.Script"></ScriptStepComponent>
    <ActionStepComponent :action-step="step" v-if="step.stepType === StepType.Action" allow-edit="true"/>
  </div>

</template>

<style scoped>

</style>
