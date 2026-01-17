<script setup lang="ts">
import { LayoutDashboard, PlusCircle, List } from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
</script>

<template>
  <Sidebar>
    <SidebarHeader class="p-4 border-b">
      <h2 class="text-lg font-bold">OVERSKULL</h2>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Inventario</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <router-link to="/">
                <LayoutDashboard />
                <span>Inicio</span>
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <router-link to="/products">
                <List />
                <span>Listar Productos</span>
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <router-link to="/products/create">
                <PlusCircle />
                <span>Nuevo Producto</span>
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <router-link to="/categories">
                <Tags />
                <span>Categorías</span>
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
