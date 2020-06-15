<template>
    <svg
        :class="['icon', { 'is-active': isActive }]"
        viewBox="0 0 24 24"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="1" width="24" height="24" rx="2" fill="#AFB2BC" />
        <path
            d="M1 12H6.9307C6.97238 12 7.0097 11.9741 7.02433 11.9351L9.13724 6.30069C9.1717 6.20881 9.30409 6.21635 9.32789 6.31155L12.1699 17.6796C12.1939 17.7756 12.3278 17.7821 12.3611 17.689L15.9026 7.77281C15.9345 7.68332 16.0616 7.68467 16.0916 7.77483L17.4772 11.9316C17.4908 11.9725 17.529 12 17.5721 12H20.5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
        />
    </svg>
</template>

<script>
import NavigationIconWrapper from '@/components/Navigation/NavigationIconWrapper.vue';

export default {
    name: 'Graph',
    extends: NavigationIconWrapper,
};
</script>