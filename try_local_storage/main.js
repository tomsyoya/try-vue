const app = new Vue({
  el: "#app",
  data: {
    name: "",
    age: 0,
  },
  mounted() {
    //ページ読み込み時にlocalStorageにパラメータが保存されていたら、formにパラメータを表示
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.age) {
      this.age = localStorage.age;
    }
  },
  //watchを使ったらformに入力された時点でlocalStorageに値が格納される
  //   watch: {
  //     name(newName) {
  //       localStorage.name = newName;
  //     }
  //   },
  methods: {
    // ボタンクリック時にlocalStorageにパラメータを保存する
    persist() {
      localStorage.name = this.name;
      localStorage.age = this.age;
      console.log("now pretended I did more stuff....");
    },
  },
});
