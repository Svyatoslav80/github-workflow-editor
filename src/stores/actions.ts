import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useActionsStore = defineStore('actions', () => {

  const actionsArray = [
    {
      name: "actions/action1",
      versions: [
        "v2",
        "v3"
      ]
    },
    {
      name: "actions/action2",
      versions: [
        "v4",
        "v5"
      ]
    }
  ]

  const actions = ref(actionsArray)
  return { actions }
})
