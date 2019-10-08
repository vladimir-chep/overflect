<template>
<div class="notFound">
    <svg
    class="notFound__icon"
        viewBox="0 0 34 34"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path d="M17 0C7.60887 0 0 7.60887 0 17C0 26.3911 7.60887 34 17 34C26.3911 34 34 26.3911 34 17C34 7.60887 26.3911 0 17 0ZM11.5161 11.5161C12.7294 11.5161 13.7097 12.4964 13.7097 13.7097C13.7097 14.923 12.7294 15.9032 11.5161 15.9032C10.3028 15.9032 9.32258 14.923 9.32258 13.7097C9.32258 12.4964 10.3028 11.5161 11.5161 11.5161ZM23.5806 24.6774H10.4194C8.96613 24.6774 8.96613 22.4839 10.4194 22.4839H23.5806C25.0339 22.4839 25.0339 24.6774 23.5806 24.6774ZM22.4839 15.9032C21.2706 15.9032 20.2903 14.923 20.2903 13.7097C20.2903 12.4964 21.2706 11.5161 22.4839 11.5161C23.6972 11.5161 24.6774 12.4964 24.6774 13.7097C24.6774 14.923 23.6972 15.9032 22.4839 15.9032Z" />
    </svg>
    <p class="notFound__txt">Nothing to display</p>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '../../styles/setup/variables.scss';

.notFound {
    text-align: center;
    padding: 50px 0;

    &__icon {
        width: 34px;
        margin: 16px;

        path {
            fill: $text-light;
        }
    }

    &__txt {
        color: $text-light;
        font-weight: bold;
        font-size: 2.4rem;
    }
}
</style>
