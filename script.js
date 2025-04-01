document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const startBtn = document.getElementById('start-btn');
    const fadeOverlay = document.getElementById('fade-overlay');
    const snackBtn = document.getElementById('snack-btn');
    const dateBtn = document.getElementById('date-btn');
    const shopBtn = document.getElementById('shop-btn');
    const eventBtn = document.getElementById('event-btn');
    const character = document.getElementById('character');
    const speechBubble = document.getElementById('speech-bubble');
    const speechText = document.getElementById('speech-text');
    const startScreenBackground = document.querySelector('#start-screen .background');
    const gameBackground = document.querySelector('#game-screen .background');
    const snackUI = document.getElementById('snack-ui');
    const snackList = document.querySelector('.snack-list');

    let isAnimating = false; // アニメーション中かどうかを管理するフラグ
    let index = 0; // 文字表示位置を管理
    let isTextFullyDisplayed = false; // 文字がすべて表示されたかどうか
    let isCooldown = false; // 0.1秒のクールタイムフラグ
    let snack = 0; // スナックUIが表示されているかのフラグ
    let message2 = 0; // セリフ表示フラグ

    // セリフの配列
    const messages = [
        "かまってちゃん？",
        "なーに",
        "かわいいね！！よちよちよちよちー！！",
        "かまってかまってかまってーー",
        "えへへ",
        "えへへーー",
        "うへへ",
        "ん？"
    ];

    // ランダムにセリフを選ぶ関数
    function getRandomMessage() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    // スタート画面の背景もクリックでゲームを開始できるようにする
    startScreenBackground.addEventListener('click', function() {
        message2 = 0;
        snack = 0;
        startScreen.style.transition = 'opacity 1s';
        startScreen.style.opacity = 0;

        // フェードアウト後にゲーム画面を表示
        setTimeout(() => {
            startScreen.style.display = 'none';
            gameScreen.classList.remove('hidden');
            gameScreen.style.transition = 'opacity 1s';
            gameScreen.style.opacity = 1;
        }, 1000);
    });

    // スタートボタンのクリックイベント
    startBtn.addEventListener('click', function() {
        startScreen.style.transition = 'opacity 1s';
        startScreen.style.opacity = 0;
        snack = 0;
        message2 = 0;

        // フェードアウト後にゲーム画面を表示
        setTimeout(() => {
            startScreen.style.display = 'none';
            gameScreen.classList.remove('hidden');
            gameScreen.style.transition = 'opacity 1s';
            gameScreen.style.opacity = 1;
        }, 1000);
    });

    // キャラクターをタップしたときのイベント
    character.addEventListener('click', function() {
        // 吹き出しが表示されているときは非表示にする
        if (!speechBubble.classList.contains('hidden')) {
            // クールタイム中なら処理をしない
            if (isCooldown) return;

            if (isTextFullyDisplayed) {
                // 文字がすべて表示されたら、クリックでセリフを非表示
                speechBubble.classList.add('hidden');
                message2 = 0
            } else if (index < message.length) {
                // 文字がまだ表示されていない場合、残りの文字をすべて表示
                while (index < message.length) {
                    speechText.textContent += message.charAt(index);
                    index++;
                }
                isTextFullyDisplayed = true; // 文字がすべて表示された状態に
            }
            return; // それ以上の処理は行わない
        }

        if (snack == 0) {
            message2 = 1;
            // アニメーション中は処理を行わない
            if (isAnimating) return;

            // クールタイム開始
            isCooldown = true;

            // アニメーションが開始されたことを記録
            isAnimating = true;

            // "bounce" クラスを追加してアニメーション開始
            character.classList.add('bounce');

            // 吹き出しを表示
            speechBubble.classList.remove('hidden');
            speechText.textContent = ""; // 既存のテキストをクリア
            index = 0; // 文字のインデックスをリセット
            isTextFullyDisplayed = false; // 文字が完全に表示されていない状態にリセット

            // ランダムなメッセージを取得
            const message = getRandomMessage();

            // 文字を1文字ずつ表示する関数
            function displayNextChar() {
                if (index < message.length) {
                    speechText.textContent += message.charAt(index);
                    index++;
                    setTimeout(displayNextChar, 100); // 100msごとに1文字表示
                } else {
                    isTextFullyDisplayed = true; // 文字がすべて表示された状態に
                }
            }

            // セリフを徐々に表示
            displayNextChar();

            // アニメーションが終了した後にクラスを削除し、再度タップできるようにする
            setTimeout(() => {
                character.classList.remove('bounce');
                // アニメーションが終了したのでタップ可能にする
                isAnimating = false;
            }, 500); // アニメーションの時間（3000ms）後にタップを再度有効化

            if (!speechBubble.classList.contains('hidden')) {
                setTimeout(() => {
                    // アニメーションが終了したのでタップ可能にする
                    isAnimating = false;
                }, 0); // アニメーションの時間（3000ms）後にタップを再度有効化
            }

            // 0.1秒後にクールタイムを解除
            setTimeout(() => {
                isCooldown = false;
            }, 100); // 100ms後にクールタイムを解除   
        }
    });

    // 吹き出しがクリックされた時にセリフを非表示にする
    speechBubble.addEventListener('click', function() {
        // クールタイム中なら処理をしない
        if (isCooldown) return;

        if (isTextFullyDisplayed) {
            // 文字がすべて表示されたら、クリックでセリフを非表示
            speechBubble.classList.add('hidden');
            message2 = 0
        } else if (index < message.length) {
            // 文字がまだ表示されていない場合、残りの文字をすべて表示
            while (index < message.length) {
                speechText.textContent += message.charAt(index);
                index++;
            }
            isTextFullyDisplayed = true; // 文字がすべて表示された状態に
        }
    });

    // 背景がクリックされた時にセリフを非表示にする
    gameBackground.addEventListener('click', function() {
        // クールタイム中なら処理をしない
        if (isCooldown) return;

        if (isTextFullyDisplayed) {
            // 文字がすべて表示されたら、クリックでセリフを非表示
            message2 = 0
            speechBubble.classList.add('hidden');
        } else if (index < message.length) {
            // 文字がまだ表示されていない場合、残りの文字をすべて表示
            while (index < message.length) {
                speechText.textContent += message.charAt(index);
                index++;
            }
            isTextFullyDisplayed = true; // 文字がすべて表示された状態に
        }
    });

// 購入したアイテムの取得
const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];

// おやつのデータ（名前、画像、個数）
const snacks = [
    { name: 'いちご', image: 'textures/items/strawberry.png', count: 0 },
    { name: 'マカロン', image: 'textures/items/macaron.png', count: 0 },
    { name: 'ドーナツ', image: 'textures/items/donut.png', count: 0 }
];

// 購入したアイテムの個数を反映させる処理
snacks.forEach(snack => {
    // 購入履歴の中で該当するアイテムの個数をカウント
    const itemCount = purchasedItems.filter(item => item === snack.name).length;
    snack.count = itemCount; // 該当する個数を設定
});

// ユーザーが持っているおやつ（購入したアイテムのみ）
const ownedSnacks = snacks.filter(snack => snack.count > 0);

// おやつボタンを押した時におやつUIを表示
snackBtn.addEventListener('click', function() {
    if (message2 == 0) {
        snackUI.classList.remove('hidden'); // おやつUIを表示
        snackList.innerHTML = ''; // リストをクリア
        snack = 1;

        // ユーザーが持っているおやつをリストに追加
        ownedSnacks.forEach(snack => {
            const snackItem = document.createElement('div');
            snackItem.classList.add('snack-item');
        
            // 画像を表示
            const snackImage = document.createElement('img');
            snackImage.src = snack.image;
            snackItem.appendChild(snackImage);

            // アイテム名と個数を表示
            const snackName = document.createElement('p');
            snackName.textContent = `${snack.name} - ${snack.count}個`; // 個数も表示
            snackItem.appendChild(snackName);

            // おやつをクリックしたときの処理
            snackItem.addEventListener('click', function() {
                snackUI.classList.add('hidden'); // UIを非表示
            });
            snackList.appendChild(snackItem);
        });
    }
});


    // UIを閉じる処理（キャラクタータップ、背景タップ、閉じるボタン）
    character.addEventListener('click', function() {
        snackUI.classList.add('hidden');
        snack = 0;
    });

    gameBackground.addEventListener('click', function() {
        snackUI.classList.add('hidden');
        snack = 0;
    });

    shopBtn.addEventListener('click', function() {
        window.location.href = 'shop.html';  // shop.htmlページに遷移
    });
});
