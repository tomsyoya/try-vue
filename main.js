Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    // html側で""product"コンポーネントを呼び出した際に出力されるテンプレート
    // 基本的にcomponentで定義されたプロパティやメソッドなどを参照することができる
    template: `
    <div class="product">
        <div class="product-image">
            <!-- v-bind : 属性値を動的に設定できるようになる -->
            <img v-bind:src="image"> 
        </div>
        <div class="product-info">
            <!-- computedで定義したtitle()を実行 title内部のパラメータなど依存関係にあるものが変化するたびに出力内容が変わる -->
            <h1>{{ title }}</h1>
            <!-- v-if : 記述した式の結果に応じて表示の有無を制御できる -->
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold out</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>

            <!-- v-for : vueのfor文 変数名 in 配列名 を記述することで、配列の中身を変数に一つづつ出して要素を生成できる-->
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <!-- v-on は @ で表現することもできる -->
            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(index)">
            </div>

            <!-- v-on : イベントハンドラを実装できる ここではmain.jsで実装したaddToCart()を呼び出している-->
            <!-- :class では、!inStockがtrue担った場合、class="disabledButton"という属性が生成される -->
            <button v-on:click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}">Add to Cart</button>
        </div>

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Review: {{ review.review}}</p>
                    <p>Rating: {{ review.rating }}</p>
                </li>
            </ul>
        </div>

        <!--review-submittedが呼ばれたら、addReviewを実行する-->
        <product-review @review-submitted="addReview"></product-review>
    </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            inventory: 11,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            reviews: []
        }
    },
    // 複数の関数を定義できる functionの部分は省略可
    methods: {
        addToCart: function(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function(index) {
            this.selectedVariant = index
            console.log(index)
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

//お問い合わせフォーム用コンポーネント
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please corect the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating"> <!-- numberは値をnumber型で扱う-->
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
        //v-modelで設定したformの初期値を設定
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                // formから取得した値をsubmitする
                this.$emit('review-submitted', productReview)
                // submit後は、formの中身を空にする
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if(!this.name) this.errors.push("Name Required.")
                if(!this.review) this.errors.push("Review Required.")
                if(!this.rating) this.errors.push("Rating Required.")
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})