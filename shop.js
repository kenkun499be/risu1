// localStorage から所持金を取得（ない場合は 0 とする）
let money = parseInt(localStorage.getItem('money')) || 0;

// 所持金表示の要素を取得
const moneyDisplay = document.getElementById('money-display');
const moneyAmount = document.getElementById('money-amount');

// 初期表示の更新
moneyAmount.textContent = money;

// アイテム購入履歴の取得（ない場合は空の配列）
let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || {};

// 所持金を更新する関数
function updateMoney(amount) {
    money += amount; // 所持金の増減
    moneyAmount.textContent = money; // 表示を更新
    localStorage.setItem('money', money); // localStorage に新しい所持金を保存
}

// 購入したアイテムを記録する関数
function updatePurchasedItems(itemName) {
    // アイテムがすでに購入されているかを確認
    if (purchasedItems[itemName]) {
        purchasedItems[itemName] += 1; // すでに購入されていれば数量を増やす
    } else {
        purchasedItems[itemName] = 1; // 新規アイテムなら1を設定
    }
    // 購入したアイテムをlocalStorageに保存
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
}

// 例えば、ショップアイテムを購入したときに所持金を減らす
document.querySelectorAll('.shop-item').forEach(item => {
    item.addEventListener('click', function() {
        // アイテムの価格（仮に100コイン）
        const itemPrice = 100;
        const itemName = item.querySelector('p').textContent; // アイテム名を取得

        // 所持金が足りていれば購入
        if (money >= itemPrice) {
            updateMoney(-itemPrice); // 購入して所持金を減らす
            updatePurchasedItems(itemName); // 購入したアイテムを記録
            alert(`${itemName} を購入しました！`);
        } else {
            alert("所持金が足りません！");
        }
    });
});

// ホームボタンをクリックしたときに index.html に遷移する
document.getElementById('home-button').addEventListener('click', function() {
    window.location.href = 'index.html'; // index.html へ遷移
});


// ページがアンロードされるときに所持金や購入アイテムを保存する
window.addEventListener('beforeunload', function() {
    // 所持金の保存
    localStorage.setItem('money', money);
    // 購入したアイテムの保存
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
});
