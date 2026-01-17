<script setup lang="ts">
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar.vue'
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <SidebarProvider :default-open="true">
    <AppSidebar />

    <SidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" class="h-4" />
        <h1 class="text-sm font-medium">Gestión de Productos</h1>
      </header>

      <main class="p-6">
        <router-view />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
