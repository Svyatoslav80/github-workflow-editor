<script setup lang="ts">
import type { Job } from '@/models/job'
import { ref } from 'vue'
import ScriptStepComponent from '@/components/ScriptStepComponent.vue'
import { StepType } from '@/models/step'
import ActionStepComponent from '@/components/ActionStepComponent.vue'
import HookStepCompontent from '@/components/HookStepCompontent.vue'

defineProps<{
  job: Job
}>()

const runLabel = ref("")

function addLabel(job: Job) {
  job.runsOn.push(runLabel.value)
}

</script>

<template>
  <table>
    <tr>
      <td>Name</td>
      <td>{{ job.name}}</td>
    </tr>
    <tr>
      <td>Runs on</td>
      <td>
          <input v-model="runLabel">
          <button @click="addLabel(job)">Add label</button>
          <select size="5">
            <option v-for="label in job.runsOn">{{ label }}</option>
          </select>
      </td>
    </tr>
    <tr>
      <td>Steps</td>
      <td>
        <div v-for="step in job.steps" class="step">
          <ScriptStepComponent :script-step="step" v-if="step.stepType === StepType.Script"></ScriptStepComponent>
          <ActionStepComponent :action-step="step" v-if="step.stepType === StepType.Action" :allow-edit="false"></ActionStepComponent>
          <HookStepCompontent :hook-step="step" v-if="step.stepType === StepType.Hook"></HookStepCompontent>
        </div>
      </td>
    </tr>
  </table>
</template>

<style scoped>

</style>
