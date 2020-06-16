<template>
    <div>
        <ViewHeader>Chart</ViewHeader>
        <ViewBody></ViewBody>
    </div>
</template>

<script>
import ViewHeader from '@/components/View/ViewHeader.vue';
import ViewBody from '@/components/View/ViewBody.vue';

export default {
    name: 'Chart',
    components: {
        ViewHeader,
        ViewBody,
    },
};
</script>

<style lang="scss" scoped>
</style>
