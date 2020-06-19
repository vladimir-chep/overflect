<template>
    <div>
        <div class="radioRow">
            <Radio
                v-for="(roleItem, index, key) in roles"
                :key="key"
                :input-value="roleItem"
                :icon="roleItem"
                v-model="role"
            />
        </div>
        <div class="radioRow">
            <Radio input-value="1" label="Win" v-model="winStatus" />
            <Radio input-value="2" label="Draw" v-model="winStatus" />
            <Radio input-value="0" label="Lose" v-model="winStatus" />
        </div>
        <ScoreInput :play-score="score" @update-score="updateNewScore" />
        <SubmitButton text="Add" :inactive="inActive" @action="addResult" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCurrentData } from '@/helper';
import { getRef } from '@/firebase/config';
import Radio from '@/components/Action/FormElements/Radio.vue';
import ScoreInput from '@/components/Action/FormElements/ScoreInput.vue';
import SubmitButton from '@/components/Action/FormElements/SubmitButton.vue';

export default {
    name: 'AddResult',
    components: {
        Radio,
        ScoreInput,
        SubmitButton,
    },
    data() {
        return {
            roles: ['tank', 'damage', 'support'],
        };
    },
    computed: {
        ...mapGetters('edit', ['score']),
        ...mapGetters('progress', ['currentRole']),
        winStatus: {
            get() {
                return String(this.$store.getters['edit/winStatus']);
            },
            set(value) {
                this.$store.commit('edit/updateWinStatus', Number(value));
            },
        },
        role: {
            get() {
                return this.$store.getters['edit/role'];
            },
            set(value) {
                this.$store.commit('edit/updateRole', value);
            },
        },
        inActive() {
            return !this.score;
        },
    },
    beforeMount() {
        this.$store.commit('edit/updateRole', this.currentRole);
    },
    methods: {
        updateNewScore(score) {
            this.$store.commit('edit/updateScore', score);
        },
        addResult() {
            if (this.score <= 0 || this.score > 5000) {
                alert('Score: Weird value!');
                return;
            }

            const newData = {
                created: getCurrentData(),
                role: this.role,
                winStatus: Number(this.winStatus),
                score: Number(this.score),
            };

            getRef(this.role).push(newData);
            this.$store.commit('edit/reset');
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/setup/variables";

.radioRow {
    margin-bottom: 20px;
    display: flex;
    align-content: center;
    margin: -10px -10px 10px;
}
</style>