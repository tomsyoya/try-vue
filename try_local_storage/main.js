const app = new Vue({
  el: "#app",
  data: {
    name: "",
    age: 0,
    cats: [],
    newCat: null,
  },
  mounted() {
    //ページ読み込み時にlocalStorageにパラメータが保存されていたら、formにパラメータを表示
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.age) {
      this.age = localStorage.age;
    }
    if (localStorage.getItem("cats")) {
      try {
        this.cats = JSON.parse(localStorage.getItem("cats"));
      } catch (e) {
        localStorage.removeItem("cats");
      }
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
      //   console.log("now pretended I did more stuff....");
    },
    addCat() {
      //formに何も入力されなかったら何もしない
      if (!this.newCat) {
        return;
      }

      this.cats.push(this.newCat);
      this.newCat = "";
      this.saveCats(); //cats配列をlocalStorageに保存
    },
    removeCat(cat) {
      this.cats.splice(cat, 1);
      this.saveCats(); //再駆除後の配列の状態をlocalStorageに保存
    },
    saveCats() {
      const parsed = JSON.stringify(this.cats); //オブジェクト型のcatsを配列にキャスト
      localStorage.setItem("cats", parsed);
    },
  },
});
