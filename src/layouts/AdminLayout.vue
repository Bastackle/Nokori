<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content border-gray-300">
            <div class="navbar bg-base-100 border-b border-gray-300 lg:hidden">
                <div class="flex-none">
                    <label for="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="h-6 w-6 stroke-current transition-transform duration-200 hover:scale-110">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                </div>
                <div class="flex-1 px-4 text-lg font-semibold">
                    {{ AdminMenu.find(menu => menu.path === route.name)?.name || '' }}
                </div>
            </div>
            <div class="m-5">
                <slot></slot>
            </div>
        </div>

        <div class="drawer-side lg:hidden">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu bg-white text-base-content min-h-full w-64 p-4">
                <li class="text-2xl font-bold my-2">Admin Menu</li>
                <li v-for="menu in AdminMenu" :key="menu.path" class="my-1">
                    <RouterLink
                        :class="menu.path === activeMenu ? 'active flex items-center gap-2' : 'flex items-center gap-2 hover:bg-primary hover:text-white'"
                        :to="{ name: menu.path }">
                        <span v-html="menu.icon"></span>
                        {{ menu.name }}
                    </RouterLink>
                </li>
            </ul>
        </div>

        <div class="drawer-side hidden lg:block">
            <label for="my-drawer-2" class="drawer-overlay lg:hidden"></label>
            <ul class="menu bg-white text-base-content min-h-full w-80 p-4 border-r border-gray-300">
                <li class="text-3xl font-bold my-4">Admin</li>
                <li v-for="menu in AdminMenu" :key="menu.path" class="my-1">
                    <RouterLink
                        :class="menu.path === activeMenu ? 'active flex items-center gap-2' : 'flex items-center gap-2 hover:bg-primary hover:text-white'"
                        :to="{ name: menu.path }">
                        <span v-html="menu.icon"></span>
                        {{ menu.name }}
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const AdminMenu = [
    {
        name: 'Dashboard',
        path: 'admin-dashboard',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>`
    },
    {
        name: 'Users',
        path: 'admin-users',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>`
    },
    {
        name: 'Product',
        path: 'admin-products',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>`
    },
    {
        name: 'Order',
        path: 'admin-orders',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>`
    },
    {
        name: 'Logout',
        path: 'admin-login',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>`
    }
]

const activeMenu = ref('')
const route = useRoute()

onMounted(() => {
    activeMenu.value = route.name
})
</script>