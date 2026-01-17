<script setup lang="ts">
import { reactive } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, ArrowLeft, Save } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const store = useProductStore()
const router = useRouter()

// 1. Estado del Formulario con tu estructura exacta
const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category_id: null as number | null,
})

const handleSubmit = async () => {
  // --- REQUERIMIENTOS DE VALIDACIÓN ---
  if (!form.name.trim()) return toast.warning('El nombre es obligatorio')
  if (!form.category_id) return toast.warning('Debes seleccionar una categoría')
  if (form.price <= 0) return toast.warning('El precio debe ser mayor a 0')
  if (form.stock < 0) return toast.warning('El stock no puede ser negativo')

  const success = await store.createProduct(form)

  if (success) {
    // Redirigir al listado tras el éxito
    router.push('/products')
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <Button variant="ghost" @click="router.push('/products')" class="text-slate-500">
      <ArrowLeft class="mr-2 h-4 w-4" /> Volver al listado
    </Button>

    <div class="bg-white p-8 rounded-2xl border shadow-sm">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-slate-900">Nuevo Producto</h2>
        <p class="text-sm text-slate-500">Completa los campos para registrar en Overskull.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div class="grid gap-2">
          <Label for="name">Nombre del Producto</Label>
          <Input id="name" v-model="form.name" placeholder="Ej. Camiseta Overskull" />
        </div>

        <div class="grid gap-2">
          <Label for="description">Descripción</Label>
          <Input
            id="description"
            v-model="form.description"
            placeholder="Detalles del producto..."
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="price">Precio (S/.)</Label>
            <Input id="price" v-model.number="form.price" type="number" step="0.01" />
          </div>

          <div class="grid gap-2">
            <Label for="stock">Stock disponible</Label>
            <Input id="stock" v-model.number="form.stock" type="number" />
          </div>
        </div>

        <div class="grid gap-2">
          <Label for="category">Categoría</Label>
          <select
            v-model.number="form.category_id"
            id="category"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option :value="null" disabled>Selecciona una categoría</option>
            <option :value="1">Polos</option>
            <option :value="2">Pantalones</option>
            <option :value="3">Accesorios</option>
          </select>
        </div>

        <div class="pt-4">
          <Button
            type="submit"
            class="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-all"
            :disabled="store.loading"
          >
            <Loader2 v-if="store.loading" class="mr-2 h-4 w-4 animate-spin" />
            <Save v-else class="mr-2 h-4 w-4" />
            {{ store.loading ? 'Guardando...' : 'Guardar Producto' }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
