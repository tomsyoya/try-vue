const draggable = window["vuedraggable"];

new Vue({
  el: "#app",
  components: {
    draggable: draggable,
  },
  data: {
    items: [
      { no: 1, name: "キャベツ", categoryNo: "1" },
      { no: 2, name: "ステーキ", categoryNo: "2" },
      { no: 3, name: "リンゴ", categoryNo: "3" },
    ],
    // items2: [
    //     { no: 4, name: 'レタス', categoryNo: "1" },
    //     { no: 5, name: 'ハンバーグ', categoryNo: "2" },
    //     { no: 6, name: 'バナナ', categoryNo: "3" },
    //   ],
    newNo: 4,
  },
  computed: {
    myList: function () {
      return this.items;
    },
  },
  methods: {
    //   要素の追加
    doAdd: function () {
      var self = this;
      var no = 0;

      if (self.items.concat().length > 0) {
        no =
          Math.max.apply(
            null,
            self.items.concat().map(function (item) {
              return item.no;
            })
          ) + 1;
        self.newNo = self.newNo < no ? no : self.newNo;
      }

      this.items.push({
        no: this.newNo,
        name: "追加リスト" + this.newNo,
        categoryNo: "5",
      });
    },
    //   要素の削除
    doDelete: function (index) {
      this.items.splice(index, 1); //配列の指定したindexの要素を削除
    },
  },
});
