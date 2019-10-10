<template>
<div>
    <p class="editModule__wrapper__ttl">{{ ttl }}</p>
    <div class="editModule__wrapper__body">
        <InfoSection />
        <SelectedRoles :role="role" />
        <Wins />
        <InsertScore placeholderText="Insert score" v-model="rank" />
        <SubmitButton text="Submit changes" :unactive="notActive" @action="edit" />
        <RemoveButton text="Remove" @action="remove" />
    </div>
</div>
</template>

<script>
import mixin from "@/mixins";
import InfoSection from '@/components/editModule/Infos.vue';
import SelectedRoles from '@/components/editModule/SelectedRoles.vue';
import Wins from '@/components/editModule/Wins.vue';
import InsertScore from '@/components/editModule/InsertScore.vue';
import SubmitButton from '@/components/editModule/SubmitButton.vue';
import RemoveButton from '@/components/editModule/RemoveButton.vue';

const fb = require("@/firebaseConfig.js");

export default {
    mixins: [mixin],
    props: ['ttl'],
    data() {
        return {
            rank: '',
        }
    },
    components: {
        InfoSection,
        SelectedRoles,
        Wins,
        InsertScore,
        SubmitButton,
        RemoveButton,
    },
    mounted() {
        this.rank = this.$store.getters['editModule/getRank'];
    },
    computed: {
        info() {
            return this.$store.getters['editModule/getInfo'];
        },
        winStatus() {
            return this.$store.getters['editModule/getWinStatus'];
        },
        key() {
            return this.$store.getters['editModule/getKey'];
        },
        role() {
            return this.$store.getters['editModule/getRole'];
        },
        isSkipped() {
            return this.$store.getters['auth/isSkipped'];
        },
        notActive() {
            return this.rank !== '' ? false : true;
        }
    },
    methods: {
        getTargetRef(curentRole) {
            let result;

            switch (curentRole) {
                case 'tank':
                    result = fb.tankRef;
                    break;
                case 'damage':
                    result = fb.damageRef;
                    break;
                case 'support':
                    result = fb.supportRef;
                    break;
                default:
                    result = fb.resultsRef;
                    break;
            }
            return result;
        },
        edit() {
            if (!checkWinStatus(this.winStatus)) return;
            if (!checkNewRank(this.rank)) return;

            const targetRef = this.getTargetRef(this.role);
            const data = {
                edited: this.getCurrentData(),
                // season: this.info.season,
                winStatus: this.winStatus,
                rank: this.rank,
            };
            const key = targetRef.child(this.key);

            key.child('edited').set(data.edited);
            // key.child('season').set(data.season);
            key.child('winStatus').set(data.winStatus);
            key.child('rank').set(data.rank);

            this.$store.dispatch('editModule/hideEdit');

            function checkNewRank(value) {
                if (isNaN(value)) {
                    console.log('Rank: Not a number!');
                    return false;
                }
                if (value <= 0 || value > 5000) {
                    console.log('Rank: Weird value!');
                    return false;
                }
                return true;
            }

            function checkWinStatus(value) {
                if (isNaN(value)) {
                    console.log("Win status: Not a number!");
                    return false;
                }
                if (value === null) {
                    console.log("Win status: Empty!");
                    return false;
                }
                return true;
            }
        },
        remove() {
            const targetRef = this.getTargetRef(this.role);

            targetRef.child(this.key).remove();
            this.$store.dispatch('editModule/hideEdit');
        }
    }
};
</script>

<style lang="scss">
</style>
