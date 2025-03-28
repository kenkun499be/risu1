let money = 0; // 初期所持金

// 所持金表示の要素を取得
const moneyDisplay = document.getElementById('money-display');
const moneyAmount = document.getElementById('money-amount');

// 所持金を更新する関数
function updateMoney(amount) {
    money += amount; // 所持金の増減
    moneyAmount.textContent = money; // 表示を更新
}

// 例えば、ショップアイテムを購入したときに所持金を減らす
document.querySelectorAll('.shop-item').forEach(item => {
    item.addEventListener('click', function() {
        // アイテムの価格（仮に100円）
        const itemPrice = 100;

        // 所持金が足りていれば購入
        if (money >= itemPrice) {
            updateMoney(-itemPrice); // 購入して所持金を減らす
            alert("アイテムを購入しました！");
        } else {
            alert("所持金が足りません！");
        }
    });
});
