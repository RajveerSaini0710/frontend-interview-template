<template>
  <section>
    <div v-for="(post, index) in displayedPost" :key="index" class="card">
      <h1>
        {{ getUser(post.userId).name }}
      </h1>
      <p>{{ post.title }}</p>
      <p>{{ post.body }}</p>
      <p>
        {{ getUser(post.userId).email }}
      </p>
    </div>
    <button @click="previousPage" :disabled="currentPage === 1">
      Previous
    </button>
    <p>{{ currentPage }}</p>
    <button
      @click="nextPage"
      :disabled="currentPage * pageSize >= posts.length"
    >
      Next
    </button>
    {{ posts.length }}
    {{ currentPage * pageSize }}
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      posts: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    displayedPost() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = this.currentPage * this.pageSize;
      return this.posts.slice(startIndex, endIndex);
    },
  },
  mounted() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      this.users = res.data;
    });
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      this.posts = res.data;
    });
  },
  methods: {
    getUser(userId) {
      // console.log(findUser, "find User", userId, ":user id");
      return this.users.find((user) => user.id === userId);
    },
    nextPage() {
      this.currentPage++;
      console.log(this.currentPage);
    },
    previousPage() {
      this.currentPage--;
      console.log(this.currentPage);
    },
  },
};
</script>

<style>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
