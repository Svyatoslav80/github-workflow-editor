<script setup lang="ts">

  import { workflowsStore } from '@/stores/workflows'
  import { Workflow } from '@/models/workflow'

  const workflows = workflowsStore()

</script>

<template>
  <div>Workflows list</div>

  <ul>
    <li v-for="workflow in workflows.getWorkflows" :key="workflow.id">
      <router-link :to="{ name: 'workflowedit', params: { id: workflow.id }}">
        {{ workflow.name }} - {{ workflow.fileName }}
      </router-link>
    </li>
  </ul>

</template>

<style scoped>

</style>
