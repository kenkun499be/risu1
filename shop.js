// localStorage から所持金を取得（ない場合は 0 とする）
let money = Number(localStorage.getItem('money'));
if (isNaN(money)) {
    money = 0; // 所持金が NaN の場合は 0 とする
}

// 所持金表示の要素を取得
const moneyAmount = document.getElementById('money-amount');

// 初期表示の更新
moneyAmount.textContent = money;

// アイテム購入履歴の取得（ない場合は空の配列）
let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];

// 所持金を更新する関数
function updateMoney(amount) {
    money += amount; // 所持金の増減
    moneyAmount.textContent = money; // 表示を更新
    localStorage.setItem('money', money); // localStorage に新しい所持金を保存
}

// 購入したアイテムを記録する関数
function updatePurchasedItems(itemName) {
    // アイテムがすでに購入されているかを確認
    if (purchasedItems.includes(itemName)) {
        return; // 既に購入していれば何もしない
    } else {
        purchasedItems.push(itemName); // 新規アイテムを購入履歴に追加
    }
    // 購入したアイテムをlocalStorageに保存
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));

    // おやつリストを更新する
    updateSnackList();
}

// おやつリストを更新する関数
function updateSnackList() {
    // ユーザーが持っているおやつ（購入したアイテムのみ）を取得
    const snacks = [
        { name: 'いちご', image: 'textures/items/strawberry.png' },
        { name: 'マカロン', image: 'textures/items/macaron.png' },
        { name: 'ドーナツ', image: 'textures/items/donut.png' }
    ];
    
    const ownedSnacks = snacks.filter(snack => purchasedItems.includes(snack.name));

    // スナックリストを更新する処理を実装
    const snackList = document.getElementById('snack-list'); // ここでsnack-listの要素を取得します
    snackList.innerHTML = ''; // 既存のリストをクリア

    ownedSnacks.forEach(snack => {
        const snackItem = document.createElement('div');
        snackItem.classList.add('snack-item');
    
        // 画像を表示
        const snackImage = document.createElement('img');
        snackImage.src = snack.image;
        snackItem.appendChild(snackImage);
    
        // アイテム名を表示
        const snackName = document.createElement('p');
        snackName.textContent = snack.name;
        snackItem.appendChild(snackName);
    
        // おやつをクリックしたときの処理
        snackItem.addEventListener('click', function() {
            // おやつをクリックしたときの処理
            alert(`あなたは ${snack.name} を選びました！`);
        });

        snackList.appendChild(snackItem);
    });
}

// 例えば、ショップアイテムを購入したときに所持金を減らす
document.querySelectorAll('.shop-item').forEach(item => {
    item.addEventListener('click', function() {
        const itemPrice = 100; // アイテムの価格（仮に100コイン）
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
    localStorage.setItem('money', 5000);
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
});
