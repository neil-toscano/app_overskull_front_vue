<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useCategoryStore } from '@/stores/categoryStore' // Importamos el store de categorías
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, ArrowLeft, Save } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const store = useProductStore()
const categoryStore = useCategoryStore() // Instanciamos el store
const router = useRouter()

const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category_id: null as number | null,
})

// Cargar categorías al montar el componente
onMounted(() => {
  categoryStore.fetchCategories()
})

const handleSubmit = async () => {
  if (!form.name.trim()) return toast.warning('El nombre es obligatorio')
  if (!form.category_id) return toast.warning('Debes seleccionar una categoría')
  if (form.price <= 0) return toast.warning('El precio debe ser mayor a 0')
  if (form.stock < 0) return toast.warning('El stock no puede ser negativo')

  const success = await store.createProduct(form)
  if (success) {
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
          <Input id="description" v-model="form.description" placeholder="Detalles del producto..." />
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
          <div class="relative">
            <select
              v-model.number="form.category_id"
              id="category"
              :disabled="categoryStore.loading"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
            >
              <option :value="null" disabled>
                {{ categoryStore.loading ? 'Cargando categorías...' : 'Selecciona una categoría' }}
              </option>

              <option
                v-for="cat in categoryStore.categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>

            <div v-if="categoryStore.loading" class="absolute right-3 top-2">
              <Loader2 class="h-5 w-5 animate-spin text-slate-400" />
            </div>
          </div>
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
