<template>
<div class="progress">
    <h1>This is a progress page</h1>
    <h2>TODOS</h2>
    <div>
        <input type="text" v-model="newTodoName">
        <button type="submit" @click="createTodo()">Create</button>
    </div>
    <br>
    <div>
      <button type="submit" @click="showTodoType = 'all'">Show All</button>
      <button type="submit" @click="showTodoType = 'active'">Show non completed</button>
      <button type="submit" @click="showTodoType = 'complete'">Show Completed</button>
    </div>
    <ul v-for="(todo, key) in filteredTodos" :key="key">
        <li><input class="toggle" type="checkbox" v-model="todo.isComplete" @click="updateIsCompleteTodo(todo, key)">{{ todo.name }}</li>
        <button type="submit" @click="deleteTodo(key)">Delete</button>
    </ul>
    <hr>
    <h2>Progress</h2>
    <ul v-for="(item, key) in filteredResults" :key="key">
        <li>
          <span style="margin-right:10px">Score: {{ item.score }}</span>
          <span style="margin-right:10px">Result: {{ item.winStatus }}</span>
          <button type="submit" @click="deleteTodo(key)">Delete</button>
        </li>
    </ul>

</div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'progressList',
    data() {
        return {
            database: null,
            todosRef: null,
            newTodoName: '',
            showTodoType: 'all',
            todos: [],


            resultsRef: null,
            resultList: [],
        }
    },
    created() {
        this.database = firebase.database();
        this.todosRef = this.database.ref('todos');
        this.resultsRef = this.database.ref('results');

        this.todosRef.on('value', snapshot => this.todos = snapshot.val());
        this.resultsRef.on('value', snapshot => this.resultList = snapshot.val());
    },
    computed: {
        filteredTodos: function () {
            let result;
            if (this.showTodoType == 'all') {
                result = this.todos;
            } else {
                let showIsComplete = (this.showTodoType == 'complete') ? true : false;

                let filterTodos = {};
                for (let key in this.todos) {
                    let todo = this.todos[key];
                    if (todo.isComplete == showIsComplete) {
                        filterTodos[key] = todo;
                    }
                    result = filterTodos;
                }
            }
            return result;
        },
        filteredResults: function(){
          let result;
          // let filterResults = {};
          result = this.resultList;

          return result;
        },
    },
    methods: {
        createTodo() {
            if (this.newTodoName == "") return;
            const thisRef = this.todosRef.push();
            const newData = {
                name: this.newTodoName,
                isComplete: false,
            };
            thisRef.push(newData);

            this.newTodoName = "";
        },
        updateIsCompleteTodo(todo, key) {
            todo.isComplete = !todo.isComplete
            var updates = {};
            updates['/todos/' + key] = todo;
            this.database.ref().update(updates);
        },
        // deleteTodo(key) {
        //     this.database.ref('todos').child(key).remove();
        // },
        deleteTodo(key) {
            this.database.ref('results').child(key).remove();
        },
    },
}
</script>

<style lang="sass">

</style>
