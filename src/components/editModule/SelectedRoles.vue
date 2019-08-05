<template>
    <div class="selectedRow">
        <div class="selectedItem">
            <div
                class="selectedIcon"
                :class="{'selected': role === 'tank'}">
                <IconTank />
            </div>
        </div>
        <div class="selectedItem">
            <div
                class="selectedIcon"
                :class="{'selected': role === 'damage'}">
                <IconDamage />
            </div>
        </div>
        <div class="selectedItem">
            <div
                class="selectedIcon"
                :class="{'selected': role === 'support'}">
                <IconSupport />
            </div>
        </div>
    </div>
</template>

<script>
import IconTank from '@/components/icons/competitive/Tank.vue';
import IconDamage from '@/components/icons/competitive/Damage.vue';
import IconSupport from '@/components/icons/competitive/Support.vue';

export default {
    props:{
        role: {
            type: String,
            required: true
        }
    },
    // computed: {
    //     role(){
    //         return this.$store.state['editModule'].role;
    //     }
    // },
    components:{
        IconTank,
        IconDamage,
        IconSupport,
    },
}
</script>

<style lang="scss">
@import "../../styles/setup/_variables";

.selectedRow{
    margin-bottom: 20px;
    display: flex;
    align-content: center;
    margin: -10px -10px 10px;

    .selectedItem {
        flex: 1 1 0;
        margin: 10px;

        .selectedIcon {
            display: flex;
            width: 100%;
            justify-content: center;
            padding: 14px;
            border-width: 0;
            border-radius: 8px;
            /* background-color: $unactive-color; */
            font-weight: bold;
            font-size: 1.8rem;
            text-transform: uppercase;
            outline-style: none;

            appearance: none;

            svg {
                opacity: .25;
                max-height: 20px;
                path {
                    fill: $text-color;
                }
            }
            &.selected {
            color: #fff;
            background-color: $theme;

            svg {
                opacity: 1;
                path,
                rect {
                    fill: #fff;
                }
            }
        }
        }
    }
}
</style>
