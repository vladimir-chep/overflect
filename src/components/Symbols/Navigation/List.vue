<template>
    <svg
        :class="['icon', { 'is-active': isActive }]"
        viewBox="0 0 24 24"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="9" width="15" height="6" rx="2" fill="#AFB2BC" />
        <rect width="6" height="6" rx="2" fill="#AFB2BC" />
        <rect x="9" y="9" width="15" height="6" rx="2" fill="#AFB2BC" />
        <rect y="9" width="6" height="6" rx="2" fill="#AFB2BC" />
        <rect x="9" y="18" width="15" height="6" rx="2" fill="#AFB2BC" />
        <rect y="18" width="6" height="6" rx="2" fill="#AFB2BC" />
    </svg>
</template>

<script>
import NavigationIconWrapper from '@/components/Navigation/NavigationIconWrapper.vue';

export default {
    name: 'List',
    extends: NavigationIconWrapper,
};
</script>