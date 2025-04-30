<template>
    <ul class="steps w-full overflow-x-auto steps-horizontal mt-10">
        <li v-for="(step, idx) in steps" :key="idx" class="step" :class="{ 'step-primary': idx < activeStep }">
            {{ step }}
        </li>
    </ul>
</template>

<script setup>
defineProps({
    steps: {
        type: Array,
        required: true
    },
    activeStep: {
        type: Number,
        default: 0
    }
})
</script>