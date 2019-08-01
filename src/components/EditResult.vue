<template>
    <div>
        <p class="ttl">
            Edit result
        </p>
        <InfoSection
            v-model="info"
            />
        <Roles
            v-model="role"
            />
        <Wins
            v-model="winStatus"
            />
        <InsertScore
            placeholderText="Insert score"
            v-model="rank"
            />
        <SubmitButton
            text="Submit changes"
            :unactive="notActive"
            @action="edit"
            />
    </div>
</template>

<script>
import mixin from "@/mixins";
import InfoSection from '@/components/editModule/Infos.vue';
import Roles from '@/components/editModule/Roles.vue';
import Wins from '@/components/editModule/Wins.vue';
import InsertScore from '@/components/editModule/InsertScore.vue';
import SubmitButton from '@/components/editModule/SubmitButton.vue';

const fb = require("@/firebaseConfig.js");


export default {
    mixins: [mixin],
    data() {
        return {
            info: {
                season: 17,
                created: '',
                id: null,
            },
            role: 'tank',
            winStatus: 1,
            rank: '',
        };
    },
    components:{
        InfoSection,
        Roles,
        Wins,
        InsertScore,
        SubmitButton,
    },
    beforeMount() {
        this.info = this.$store.state['editModule'].info;
        this.role = this.$store.state['editModule'].role;
        this.winStatus = this.$store.state['editModule'].winStatus;
        this.rank = this.$store.state['editModule'].rank;
    },
    mounted() {
        console.log(this.rank);
    },
    computed: {
        key(){
            return this.$store.state['editModule'].key;
        },
        // info() {
        //     return this.$store.state['editModule'].info;
        // },
        // role() {
        //     return this.$store.state['editModule'].role;
        // },
        // winStatus() {
        //     return this.$store.state['editModule'].winStatus;
        // },
        // rank() {
        //     return this.$store.state['editModule'].rank;
        // },
        // rank:{
        //     get() {
        //         return this.rank;
        //     },
        //     set(rank) {
        //         // this.$store.dispatch('editModule/updateRank', rank);
        //         this.$store.commit('editModule/setRank', {rank});
        //     }
        // },
        isSkipped() {
            return this.$store.getters['auth/isSkipped'];
        },
        notActive() {
            return this.rank !== '' ? false : true;
        }
    },
    methods: {
        edit() {
            if (!checkWinStatus(this.winStatus)) return;
            if (!checkNewRank(this.rank)) return;

            const targetRef = getTargetRef(this.role);
            const data = {
                edited: this.getCurrentData(),
                season: this.info.season,
                // role: this.role,
                winStatus: this.winStatus,
                rank: this.rank,
            };
            const key = targetRef.child(this.key);
            key.child('edited').set(data.edited);
            key.child('season').set(data.season);
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

            function getTargetRef(curentRole) {
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
            }
        }
    }
};
</script>

<style lang="scss">
.ttl {
    font-size: 2.4rem;
    font-weight: bold;
    margin-bottom: 24px;
}
</style>