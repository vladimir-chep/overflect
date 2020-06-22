<template>
    <div>
        <ul class="info">
            <p class="info__item">
                Creation Date:
                <span>{{ editItem.created }}</span>
            </p>
            <p v-if="editItem.edited" class="info__item">
                Updated Date:
                <span>{{ editItem.edited }}</span>
            </p>
        </ul>
        <SelectedRadios :role-list="roles" />
        <div class="radioRow">
            <Radio input-value="1" label="Win" v-model="winStatus" />
            <Radio input-value="2" label="Draw" v-model="winStatus" />
            <Radio input-value="0" label="Lose" v-model="winStatus" />
        </div>
        <ScoreInput :play-score="score" @update-score="updateNewScore" />
        <SubmitButton
            text="Submit changes"
            :inactive="inActive"
            @action="edit"
        />
        <RemoveButton text="Remove" @action="remove" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCurrentData } from '@/helper';
import { getRef } from '@/firebase/config';
import SelectedRadios from '@/components/Action/FormElements/SelectedRadios.vue';
import Radio from '@/components/Action/FormElements/Radio.vue';
import ScoreInput from '@/components/Action/FormElements/ScoreInput.vue';
import SubmitButton from '@/components/Action/FormElements/SubmitButton.vue';
import RemoveButton from '@/components/Action/FormElements/RemoveButton.vue';

export default {
    name: 'EditResult',
    components: {
        SelectedRadios,
        Radio,
        ScoreInput,
        SubmitButton,
        RemoveButton,
    },
    data() {
        return {
            roles: ['tank', 'damage', 'support'],
            score: '',
        };
    },
    computed: {
        ...mapGetters('edit', ['editItem']),
        winStatus: {
            get() {
                return String(this.$store.getters['edit/editItem'].winStatus);
            },
            set(value) {
                this.$store.commit('edit/updateEditWinStatus', Number(value));
            },
        },
        inActive() {
            return !this.score;
        },
    },
    beforeMount() {
        this.score = String(this.editItem.score);
    },
    methods: {
        updateNewScore(score) {
            this.score = score;
        },
        edit() {
            if (this.score <= 0 || this.score > 5000) {
                alert('Required less 5000!');
                return;
            }
            const key = getRef(this.editItem.role).child(this.editItem.key);
            key.child('edited').set(getCurrentData());
            key.child('winStatus').set(Number(this.winStatus));
            key.child('score').set(Number(this.score));

            this.$store.dispatch('edit/toggle');
        },
        remove() {
            getRef(this.editItem.role)
                .child(this.editItem.key)
                .remove();
            this.$store.dispatch('edit/toggle');
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.info {
    margin-bottom: 20px;
    text-align: left;

    &__item {
        line-height: 1;
        margin-bottom: 4px;
        font-weight: bold;
        font-size: 1.2rem;
        text-transform: uppercase;
        span {
            margin-left: 10px;
            color: $text-light;
        }
    }
}

.radioRow {
    display: flex;
    align-content: center;
    margin: -10px -10px 10px;
    margin-bottom: 20px;
}

</style>