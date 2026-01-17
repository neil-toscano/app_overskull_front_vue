<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { Loader2, Plus, Package } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const store = useProductStore()

onMounted(() => {
  store.fetchProducts()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Inventario</h1>
        <p class="text-muted-foreground text-sm">Gestiona los productos de Overskull.</p>
      </div>
      <Button as-child>
        <router-link to="/products/create">
          <Plus class="mr-2 h-4 w-4" /> Nuevo Producto
        </router-link>
      </Button>
    </div>

    <div
      v-if="store.loading"
      class="flex flex-col items-center justify-center p-20 border rounded-xl bg-white/50"
    >
      <Loader2 class="w-10 h-10 animate-spin text-blue-600" />
      <p class="mt-4 text-sm font-medium text-slate-500">Obteniendo productos...</p>
    </div>

    <div v-else-if="store.error" class="p-6 border border-red-200 bg-red-50 rounded-xl text-center">
      <p class="text-red-600 font-medium">{{ store.error }}</p>
      <Button variant="outline" class="mt-4" @click="store.fetchProducts()">Reintentar</Button>
    </div>

    <div v-else class="rounded-xl border bg-white shadow-sm overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead
          class="bg-slate-50 border-b text-slate-500 font-semibold uppercase text-[11px] tracking-wider"
        >
          <tr>
            <th class="px-6 py-4">Producto</th>
            <th class="px-6 py-4">Categoría</th>
            <th class="px-6 py-4 text-center">Stock</th>
            <th class="px-6 py-4 text-right">Precio</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="p in store.products"
            :key="p.id"
            class="hover:bg-slate-50/50 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="font-semibold text-slate-800">{{ p.name }}</div>
              <div class="text-xs text-slate-400 truncate max-w-[200px]">{{ p.description }}</div>
            </td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase"
              >
                {{ p.category?.name || 'General' }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <span :class="p.stock <= 5 ? 'text-red-600 font-bold' : 'text-slate-600'">
                {{ p.stock }}
              </span>
            </td>
            <td class="px-6 py-4 text-right font-mono font-bold text-slate-900">${{ p.price }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="store.products.length === 0" class="p-20 text-center">
        <Package class="w-12 h-12 mx-auto text-slate-200 mb-4" />
        <p class="text-slate-500">No hay productos en la base de datos.</p>
      </div>
    </div>
  </div>
</template>
