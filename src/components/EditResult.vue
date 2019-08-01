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
            v-model="newRank"
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
    // props: ['showed'],
    data() {
        return {
            info: {
                season: 17,
                created: '',
                id: null,
            },
            // seasonNo: 17,
            role: 'tank',
            winStatus: 1,
            newRank: '',
        };
    },
    components:{
        InfoSection,
        Roles,
        Wins,
        InsertScore,
        SubmitButton,
    },
    computed: {
        isSkipped() {
            return this.$store.getters['auth/isSkipped'];
        },
        notActive() {
            return this.newRank !== '' ? false : true;
        }
    },
    methods: {
        edit() {
            if (!checkWinStatus(this.winStatus)) return;
            if (!checkNewRank(this.newRank)) return;

            const targetRef = getTargetRef(this.role);
            const newData = {
                created: this.getCurrentData(),
                season: this.info.season,
                role: this.role,
                winStatus: this.winStatus,
                rank: this.newRank,
            };
            const getID = new Promise((resolve, reject) => {
                targetRef.once('value').then(function(snapshot) {
                    resolve(snapshot.numChildren() + 1);
                });
            });

            getID.then(value =>{
                newData.id = value;
                targetRef.push(newData);
            });
            this.reset();

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