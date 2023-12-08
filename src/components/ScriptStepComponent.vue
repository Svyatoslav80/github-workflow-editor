<script setup lang="ts">
import type { Job } from '@/models/job'
import type { ScriptStep } from '@/models/step'
import { computed } from 'vue'

const props = defineProps<{
  scriptStep: ScriptStep
}>()

</script>

<template>
  <div>Script: </div>
  <textarea rows="5" cols="100" v-model="scriptStep.script"></textarea>

</template>

<style scoped>

</style>
