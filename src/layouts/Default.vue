<template>
    <div class="outherWrap">
        <router-view />
        <navigation />
    </div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue';

export default {
    components: {
        Navigation,
    },
};
</script>
