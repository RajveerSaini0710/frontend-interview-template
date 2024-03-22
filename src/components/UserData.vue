<template>
  <section>
    <div v-for="(post, index) in displayedPost" :key="index" class="card">
      <h1>{{ getUser(post.userId).name }}</h1>
      <p>{{ post.title }}</p>
      <p>{{ post.body }}</p>
      <p>{{ getUser(post.userId).email }}</p>
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const users = ref([]);
    const posts = ref([]);
    const currentPage = ref(1);
    const pageSize = 10;

    const displayedPost = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = currentPage.value * pageSize;
      return posts.value.slice(startIndex, endIndex);
    });

    const getUser = (userId) => {
      return users.value.find((user) => user.id === userId);
    };

    const nextPage = () => {
      currentPage.value++;
      console.log(currentPage.value);
    };

    const previousPage = () => {
      currentPage.value--;
      console.log(currentPage.value);
    };

    onMounted(() => {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        users.value = res.data;
      });
      axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
        posts.value = res.data;
      });
    });

    return {
      users,
      posts,
      currentPage,
      pageSize,
      displayedPost,
      getUser,
      nextPage,
      previousPage,
    };
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
