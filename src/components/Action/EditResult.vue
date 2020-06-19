<template>
    <div>
        <ScoreInput :play-score="score" @update-score="updateNewScore" />
        <SubmitButton text="Submit changes" :inactive="inActive" @action="edit" />
        <RemoveButton text="Remove" @action="remove" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCurrentData } from '@/helper';
import { getRef } from '../../firebase/config';
import Radio from '@/components/Action/FormElements/Radio.vue';
import ScoreInput from '@/components/Action/FormElements/ScoreInput.vue';
import SubmitButton from '@/components/Action/FormElements/SubmitButton.vue';
import RemoveButton from '@/components/Action/FormElements/RemoveButton.vue';

export default {
    name: 'EditResult',
    components: {
        ScoreInput,
        SubmitButton,
        RemoveButton,
    },
    data() {
        return {
            score: '',
        };
    },
    computed: {
        ...mapGetters('edit', ['editItem']),
        inActive() {
            return !this.score;
        },
    },
    beforeMounted() {
        this.score = this.$store.getters['edit/score'];
    },
    methods: {
        updateNewScore(score){
            this.score = score;
        },
        edit() {
            if (this.score <= 0 || this.score > 5000) {
                alert('Score: Weird value!');
                return;
            }
            const key = getRef(this.role).child(this.key);

            key.child('edited').set(this.getCurrentData());
            key.child('winStatus').set(Number(this.winStatus));
            key.child('score').set(Number(this.score));

            this.$store.dispatch('edit/toggle');
        },
        remove() {
            getRef(this.editItem.role).child(this.editItem.key).remove();
            this.$store.dispatch('edit/toggle');
        },
    },
};
</script>

<style lang="scss">
</style>