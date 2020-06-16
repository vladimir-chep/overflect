<template>
    <div>
        <ViewHeader>Progress</ViewHeader>
        <ViewBody>
            <!-- <div class="progressDisplay"> -->
                <RoleTabs />
                <!-- <ProgressTable v-if="isDisplayed"/> -->
                <img v-if="isDisplayed"/>
                <NotFound v-else />
            <!-- </div> -->
        </ViewBody>
    </div>
</template>

<script>
import ViewHeader from '@/components/View/ViewHeader.vue';
import ViewBody from '@/components/View/ViewBody.vue';
import RoleTabs from '../components/Common/RoleTabs.vue';
import NotFound from '../components/Common/NotFound.vue';

export default {
    name: 'Progress',
    components: {
        ViewHeader,
        ViewBody,
        RoleTabs,
        NotFound,
    },
    data() {
        return {
            isDisplayed: false,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
