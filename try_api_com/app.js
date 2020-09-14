const NYTBaseUrl = "https://api.nytimes.com/svc/topstories/v2/";
const ApiKey = NYTIMES_API_KEY;

function buildUrl(url) {
  return NYTBaseUrl + url + ".json?api-key=" + ApiKey;
}

const vm = new Vue({
  el: "#app",
  data: {
    // results: [
    //   {
    //     title: "the very first post",
    //     abstract: "lorem ipsum some test dimpsum",
    //   },
    //   {
    //     title: "and then there was the second",
    //     abstract: "lorem ipsum some test dimsum",
    //   },
    //   {
    //     title: "third time's a charm",
    //     abstract: "lorem ipsum some test dimsum",
    //   },
    //   { title: "four the last time", abstract: "lorem ipsum some test dimsum" },
    // ],
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
