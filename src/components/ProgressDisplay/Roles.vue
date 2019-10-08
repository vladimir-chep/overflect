<template>
    <ul class="roles">
        <li v-for="(role, index, key) in roles" :key="key" class="roles__item">
            <div
                :class="['roleBtn', {'isActive': selectedRole === role}]"
                @click="switchList(role)"
                >
                <span :class="['roleBtn__icon', `roleBtn__icon--${role}`]">
                    <CompIcon :icon-name="role" />
                </span>
                {{ role }}
            </div>
        </li>
    </ul>
</template>

<script>
const fb = require('@/firebaseConfig.js');

import CompIcon from '@/components/icons/competitive/Icon.vue';
export default {
    data() {
        return {
            roles:['tank','damage','support'],
        }
    },
    components:{
        CompIcon,
    },
    computed: {
        selectedRole(){
            return this.$store.state['editModule'].selectedRole;
        },
    },
    methods:{
        switchList(value){
            switch (value) {
                case 'tank':
                    this.$store.dispatch('progress/fetchResults', fb.tankRef);
                    this.$store.commit('editModule/setRole', 'tank');
                    this.$store.commit('editModule/setSelectedRole', 'tank');
                    break;
                case 'damage':
                    this.$store.dispatch('progress/fetchResults', fb.damageRef);
                    this.$store.commit('editModule/setRole', 'damage');
                    this.$store.commit('editModule/setSelectedRole', 'damage');
                    break;
                case 'support':
                    this.$store.dispatch('progress/fetchResults', fb.supportRef);
                    this.$store.commit('editModule/setRole', 'support');
                    this.$store.commit('editModule/setSelectedRole', 'support');
                    break;
                default:
                    break;
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../styles/setup/_variables';

.roles {
    display: flex;
    align-items: center;
    text-align: center;
    &__item {
        flex: 1 1 0;
    }
}
.roleBtn{
    background: #fff;
    padding: 14px 0;
    font-weight: bold;
    color: $text-light;
    position: relative;
    text-transform: capitalize;

    &:after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        border-radius: 4px;
        background: $hr;
    }
    &.isActive {
        color: $theme;
        &:after {
            background: $theme;
        }
        svg {
            path,
            rect {
                fill: $theme;
            }
        }
    }

    &__icon {
        svg{
            width: 11px;
            height: 11px;
            margin-right: 4px;

            path,rect {
                fill: $text-light;
            }
        }
    }
}

</style>