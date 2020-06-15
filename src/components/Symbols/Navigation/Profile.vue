<template>
    <svg
        :class="['icon', { 'is-active': isActive }]"
        viewBox="0 0 24 24"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="24" height="24" rx="2" fill="#AFB2BC" />
        <path
            d="M12 3.375C14.3516 3.375 16.2581 5.22187 16.2581 7.5C16.2581 9.77813 14.3516 11.625 12 11.625C9.64839 11.625 7.74194 9.77813 7.74194 7.5C7.74194 5.22187 9.64839 3.375 12 3.375Z"
            fill="white"
        />
        <path
            d="M12 20.25C9.15968 20.25 4.83541 20.1708 4.5 19.5C3.75 18 7.60162 13.5 9.67742 13.5C9.79355 13.5 9.90968 13.5187 10.021 13.5516C10.65 13.7484 11.3081 13.875 12 13.875C12.6919 13.875 13.3548 13.7484 13.979 13.5516C14.0903 13.5187 14.2065 13.5 14.3226 13.5C16.3984 13.5 20.25 18 19.5 19.5C19.1646 20.1708 14.8403 20.25 12 20.25Z"
            fill="white"
        />
    </svg>
</template>

<script>
import NavigationIconWrapper from '@/components/Navigation/NavigationIconWrapper.vue';

export default {
    name: 'Profile',
    extends: NavigationIconWrapper,
};
</script>