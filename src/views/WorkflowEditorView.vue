<script setup lang="ts">
import YAML, { YAMLMap, YAMLSeq } from 'yaml'
import { workflowsStore } from '@/stores/workflows'
import { useRoute } from 'vue-router'
import JobEditComponent from '@/components/JobEditComponent.vue'
import { ref } from 'vue'
import { ActionStep, HookStep, ScriptStep, StepType } from '@/models/step'

const route = useRoute()
  const workflowStore = workflowsStore()
  const workflowId = route.params.id
  const workflow = workflowStore.getWorkflows.find(t => t.id == +workflowId)

  let generated = ref("ff")

  function generateYaml() {
    console.log("Generating yaml")



    const jobs = new YAMLMap()

    for(const job of workflow.jobs) {

      const jobMap = new YAMLMap()
      jobs.add({ 'key': job.name, 'value': jobMap})

      jobMap.add({ 'key': 'runs-on', 'value': job.runsOn})


      const stepsSeq = new YAMLSeq()


      jobMap.add({ 'key': 'steps', 'value': stepsSeq})

      for(const step of job.steps) {
        if(step.stepType === StepType.Script) {
          const scriptStep:ScriptStep = step;
          const scriptMap = new YAMLMap()
          stepsSeq.add(scriptMap)
          scriptMap.add({'key': 'run', 'value': scriptStep.script})
        }
        else if(step.stepType === StepType.Action) {
          const actionStep:ActionStep = step;
          const actionMap = new YAMLMap()
          stepsSeq.add(actionMap)
          actionMap.add({'key': 'uses', 'value': actionStep.actionName + "@" + actionStep.version})
        }
        else if(step.stepType === StepType.Hook) {
          const hookStep: HookStep = step;
          for(const hookStepStep of hookStep.steps) {
            if(hookStepStep.stepType === StepType.Script) {
              const hookScriptStep:ScriptStep = hookStepStep;
              const scriptMap = new YAMLMap()
              stepsSeq.add(scriptMap)
              scriptMap.add({'key': 'run', 'value': hookScriptStep.script})
            }
            else if(hookStepStep.stepType === StepType.Action) {
              const hookActionStep:ActionStep = hookStepStep;
              const actionMap = new YAMLMap()
              stepsSeq.add(actionMap)
              actionMap.add({'key': 'uses', 'value': hookActionStep.actionName + "@" + hookActionStep.version})
            }
          }
        }
      }
    }

    const onMap = new YAMLMap()
    const wfdMap = new YAMLMap()
    onMap.add({'key': 'workflow_dispatch', 'value': wfdMap})

    const workflowYaml = new YAML.Document({  })

    workflowYaml.add({ key: 'name', value: workflow.name})
    workflowYaml.add({ key: 'on', value: onMap })
    workflowYaml.add({ key: 'jobs', value: jobs})
    // workflowYaml.add({ key: 'on'})
    // workflowYaml.createNode('workflow-dispatch')
    //workflowYaml.add({ key: ['on', 'workflow-dispatch']})
    //workflowYaml.addIn(['on'], { 'key': 'workflow-dispatch'})
    //workflowYaml.addIn(['on', 'workflow-dispatch'], 'inputs')
    generated.value = workflowYaml.toString()
  }

</script>

<template>
<div>Edit workflow {{ workflow?.name}} - {{ workflow?.fileName}}</div>

<table>
  <tr>
    <td>Name</td>
    <td><input v-model="workflow.name"></td>
  </tr>
  <tr>
    <td>Jobs</td>
    <td>

      <JobEditComponent :job="job" v-for="job in workflow.jobs"></JobEditComponent>


    </td>
  </tr>
</table>
  <button v-on:click="generateYaml()">Generate workflow</button>
 <div>
  <pre>
{{ generated }}
  </pre>
 </div>


</template>

<style scoped>

</style>
