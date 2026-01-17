<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { Loader2, Tags } from 'lucide-vue-next'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold tracking-tight">Categorías</h1>
    </div>

    <div v-if="categoryStore.loading" class="flex justify-center p-20">
      <Loader2 class="w-10 h-10 animate-spin text-blue-600" />
    </div>

    <div v-else class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead class="bg-slate-50 border-b text-slate-500 font-semibold uppercase text-[11px]">
          <tr>
            <th class="px-6 py-4">Nombre</th>
            <th class="px-6 py-4">Descripción</th>
            <th class="px-6 py-4 text-center">ID</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="cat in categoryStore.categories" :key="cat.id" class="hover:bg-slate-50/50">
            <td class="px-6 py-4 font-bold text-blue-600">
              <div class="flex items-center gap-2"><Tags :size="14" /> {{ cat.name }}</div>
            </td>
            <td class="px-6 py-4 text-slate-500">{{ cat.description }}</td>
            <td class="px-6 py-4 text-center font-mono text-xs text-slate-400">#{{ cat.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
