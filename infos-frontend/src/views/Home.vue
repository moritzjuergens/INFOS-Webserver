<template>
  <div class="home">
    <div class="banner">
      <div class="grid" style="row-gap: 0; grid-template-columns: auto auto">
        <h1 class="header-1">Super Safe Blog</h1>
        <button class="button" @click="openForm">+</button>
        <h2 class="header-5">The Safest Place for your Thoughts</h2>
        <p>Add your own!</p>
      </div>
    </div>

    <div class="content">
      <div class="grid">
        <div class="card" id="add">
          <form action="">
            <div class="card__grid">
              <label for="title" class="form__label">Title</label>
              <input type="text" id="title" class="form__input" />
              <label for="content" class="form__label">Content</label>
              <input type="text" id="content" class="form__input" />
              <button type="submit" value="Submit" @click="postPost">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div
          v-for="(post, index) in posts"
          :key="index"
          class="card"
          :id="post.id"
        >
          <div class="card__grid">
            <div class="grid" style="grid-template-columns: auto auto">
              <div class="card__date">Posted on: 01 Jan 2022</div>
              <div style="place-self: flex-end; color: #999999">
                <button @click="deletePost(post.id)" class="button">
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div class="card__title">
              {{ post.title }}
            </div>
            <div class="card__content">
              <p v-html="post.content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CloseIcon from "vue-material-design-icons/Close.vue";
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    CloseIcon,
  },
  data() {
    return {
      posts: [],
      title: String,
      content: String,
    };
  },
  created() {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => (this.posts = response.data));
  },
  methods: {
    postPost() {
      this.title = document.getElementById("title").value;
      this.content = document.getElementById("content").value;
      // let formData = new FormData();
      // formData.append("title", "title");
      // formData.append("content", "content");
      axios
        .post("http://localhost:3000/posts", {
          title: this.title,
          content: this.content,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.title = "";
      this.content = "";
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
    },
    deletePost(id) {
      console.log(id);
      axios
        .delete(`http://localhost:3000/posts/${id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      document.getElementById(id).style.display = "none";
    },
    openForm() {
      let formDisplay = document.getElementById("add");

      if (formDisplay.style.display == "none") {
        formDisplay.style.display = "block";
      } else {
        formDisplay.style.display = "none";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  margin: 0 100px;
  flex-direction: column;
}
.banner {
  width: 60rem;
  height: 10rem;
  display: flex;
  place-content: center;
}
.header-1 {
  font-size: 56px;
  font-weight: bold;
  margin: 0;
  text-align: left;
}
.header-5 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  text-align: left;
}
.content {
  width: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
}
.card {
  box-sizing: border-box;
  padding: 30px;
  margin: 20px;
  height: fit-content;
  max-height: 30rem;
  width: 60rem;
  overflow: hidden;
  border: 1px solid #e2e2e2;
  border-radius: 5px;

  &__date {
    font-size: 14px;
    color: #999999;
    text-align: left;
    margin: 0;
  }

  &__title {
    color: #000000;
    font-size: 32px;
    font-weight: bold;
    text-align: left;
  }

  &__content {
    text-align: left;
    font-size: 18px;
    line-height: 25.2px;
  }

  &__grid {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto;
    row-gap: 10px;
  }
}
.grid {
  display: grid;
  grid-template-columns: auto;
  width: 100%;
}
.button {
  background: white;
  border: none;

  font-size: 53px;
  color: #999999;
  cursor: pointer;
}
.form {
  &__label {
    font-size: 28px;
    text-align: left;
    font-weight: bold;
  }
  &__input {
  }
}
#add {
  display: none;
}
</style>
