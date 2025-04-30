<template>
    <table class="table">
        <!-- head -->
        <thead>
            <tr>
                <th v-for="header in headers" :key="header">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>

<script setup>
defineProps({
    headers: Array
})
</script>
