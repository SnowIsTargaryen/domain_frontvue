<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="postTitles" @removeTodo="removeTodo"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
  import TodoHeader from "./components/TodoHeader.vue";
  import TodoInput from "./components/TodoInput.vue";
  import TodoList from "./components/TodoList.vue";
  import TodoFooter from "./components/TodoFooter.vue";
  import axios from "axios";

  // Vue.prototype.$axios = axios;

  export default {
    data(){
      return{
        todoItems: [],
        postTitles: []
      }
    },
    methods: {
      addTodo(todoItem) {
        console.log("appvue :",todoItem)
        this.addPost(todoItem);
        // localStorage.setItem(todoItem,todoItem);
        // this.todoItems.push(todoItem);
      },
      clearAll(){
        axios.delete('/api/board/delete/all')
              .then(res =>{
                console.log("delete all 성공 :",res)
                this.postTitles=[];
              })
              .catch(err =>{
                console.log("delete all 실패",err)
              })
        // localStorage.clear();
        // this.todoItems=[];
      },
      removeTodo(todoItem, index){
        // localStorage.removeItem(todoItem);
        console.log(todoItem,index)
        this.deletePost(todoItem);
        this.postTitles.splice(index,1);
        // this.todoItems.splice(index,1);
      },
      deletePost(param){
        axios.delete('/api/board/delete/'+param.id, param)
              .then(res =>{
                console.log('delete 성공 :',res)
              })
              .catch(err =>{
                console.log("delete 실패 :",err)
              })
      },
      addPost(item){
        axios.post('/api/board/save',item)
                .then(res =>{
                  this.axBoardList()
                  console.log("post 성공:",res)
                })
                .catch(err => {
                  console.log("post 실패:",err)
                })
      },
      axBoardList(){
        axios.get('/api/board/list')
                .then(res =>{
                  console.log('성공 : ',res)
                  this.postTitles=[];
                  res.data.map(el => el).forEach(el=>{
                    // this.postTitles.push(el.title)

                    this.postTitles.push(el)
                  })
                })
                .catch(err =>{
                  console.log('실패 : ',err)
                })
      }
    },
    created(){ //vue 인스턴스가 생성되자마자 뷰 데이터에 접근
      this.axBoardList();
      console.log(this.postTitles)
      // if(localStorage.length>0){
      //   for (let i=0; i<localStorage.length;i++){
      //     this.todoItems.push(localStorage.key(i))
      //   }
      // }
    },
    components:{
      'TodoHeader': TodoHeader,
      'TodoInput': TodoInput,
      'TodoList' : TodoList,
      'TodoFooter' : TodoFooter
    }
  }
</script>

<style>
  body {
    text-align: center;
    background-color: #F6F6F8;
  }
  input {
    border-style: groove;
    width: 200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }
</style>
