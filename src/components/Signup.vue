<template>
<div>
    <div class="layout">
        <div>
            <h1>Sign Up</h1>
        </div>
        <div>
            <form @submit.prevent="userSignUp">
                <div>
                    <label for="email">Your Email Address</label>
                    <input
                        type="text"
                        id="email"
                        v-model="email">
                </div>
                    <div>
                        <label for="password">Enter Password</label>
                        <input
                        type="password"
                        id="password"
                        v-model="password">
                </div>
                <button class="btn btn-primary">Sign Up</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            email: 'web00chepvl90@gmail.com',
            password: '',
        }
    },
    methods: {
        userSignUp() {
            this.$store.dispatch('userSignUp', {
                email: this.email,
                password: this.password
            })
        }
    }
}
</script>
