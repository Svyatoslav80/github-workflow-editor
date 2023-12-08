<script setup lang="ts">
import { ActionStep } from '@/models/step'
import { useActionsStore } from '@/stores/actions'
import { type Ref, ref, watch } from 'vue'

const props = defineProps<{
  actionStep: ActionStep,
  allowEdit: boolean
}>()

const actionsStore = useActionsStore()

let versions: string[] = []

watch(() => props.actionStep.actionName, (name) => {
  versions = actionsStore.actions.find(t => t.name === name)?.versions
})

const actionInfo: Ref<ActionStep> = ref(props.actionStep)

</script>

<template>



  <div>Action</div>

  <div v-if="allowEdit === false">{{ actionStep.actionName }}@{{ actionStep.version }}</div>
  <div v-if="allowEdit">

    <select v-model="actionInfo.actionName">
      <option v-for="action of actionsStore.actions" :key="action.name">{{ action.name }}</option>
    </select>

    <select v-model="actionInfo.version">
      <option v-for="version of versions" >{{ version }}</option>
    </select>


  </div>

</template>

<style scoped>

</style>
