// 1. nav 要素内のリンク (<a>)
const navLinks = document.querySelectorAll("nav a");
console.log("nav 内のリンク:", navLinks);

// 2. 商品リスト (.product-list) 内の最初の商品 (.product-item)
const firstProduct = document.querySelector(".product-list .product-item");
console.log("最初の商品:", firstProduct);

// 3. カートアイコンの画像 (<img>)
const cartImage = document.querySelector(".cart img");
console.log("カートアイコンの画像:", cartImage);

// 4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素
const productPrices = document.querySelectorAll(".product-list .price");
console.log("商品の価格要素:", productPrices);

// 5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
const productImages = document.querySelectorAll(
  ".product-list .product-item img"
);
console.log("商品の画像:", productImages);

// 6. 検索バー (.search-bar) 内の検索ボタン (<button>)
const searchButton = document.querySelector(".search-bar button");
console.log("検索ボタン:", searchButton);

// 7. フッター (footer) 内のパラグラフ (<p>) 要素
const footerParagraph = document.querySelector("footer p");
console.log("フッター内のパラグラフ:", footerParagraph);

// 8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
// 0ベースで数えるため、1番目(index 0), 3番目(index 2)...が偶数番目
const evenProducts = document.querySelectorAll(
  ".product-list .product-item:nth-child(even)"
);
console.log("偶数番目の商品:", evenProducts);

// 9. ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
const accountImage = document.querySelector("header .account img");
console.log("アカウントの画像:", accountImage);

// 10. ナビゲーションリンクのうち、"会社情報" のリンク
const aboutLink = document.querySelector('nav a[href="#about"]');
console.log("会社情報のリンク:", aboutLink);
