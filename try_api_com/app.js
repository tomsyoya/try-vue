const NYTBaseUrl = "https://api.nytimes.com/svc/topstories/v2/";
const ApiKey = NYTIMES_API_KEY;

function buildUrl(url) {
  return NYTBaseUrl + url + ".json?api-key=" + ApiKey;
}

Vue.component("news-list", {
  props: ["results"],
  template: `
  <section>
    <div class="row" v-for="posts in processedPosts">
    <div class="columns large-3 medium-6" v-for="post in posts">
      <div class="card">
        <div class="card-divider">{{ post.title }}</div>
        <a :href="post.url" target="_blank"
          ><img :src="post.image_url"/></a>
          <div class="card-section">
            <p>{{ post.abstract }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>`,
  computed: {
    processedPosts() {
      let posts = this.results;

      posts.map((post) => {
        let imgObj = post.multimedia.find(
          (media) => media.format == "superJumbo" //サイズが"superJumbo"になっている画像を取得
        );
        // 記事からサムネ用の画像を取得して設定
        post.image_url = imgObj
          ? imgObj.url
          : "http://placehold.it/300x200?text=N/A"; //取得できなかった場合は N/Aの文字を代わりに出す
      });

      // 記事を１行あたり４つ表示にして形を整える
      let i,
        j,
        chunkedArray = [],
        chunk = 4;
      for (i = 0, j = 0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i, i + chunk);
      }
      return chunkedArray;
    },
  },
});

const vm = new Vue({
  el: "#app",
  data: {
    results: [],
  },
  mounted() {
    this.getPosts("home");
  },
  methods: {
    // 指定された記事のカテゴリ名に応じてリクエストurlをgetする
    getPosts(section) {
      let url = buildUrl(section);
      axios
        .get(url)
        .then((response) => {
          this.results = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
