<template>
    <div>
        <ViewHeader>Progress</ViewHeader>
        <ViewBody>
            <RoleTabs />
            <ProgressTable />
        </ViewBody>
    </div>
</template>

<script>
import ViewHeader from '@/components/View/ViewHeader.vue';
import ViewBody from '@/components/View/ViewBody.vue';
import RoleTabs from '@/components/Common/RoleTabs.vue';
import ProgressTable from '@/components/Progress/ProgressTable.vue';

export default {
    name: 'Progress',
    components: {
        ViewHeader,
        ViewBody,
        RoleTabs,
        ProgressTable,
    },
};
</script>
