document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const startBtn = document.getElementById('start-btn');
    const snackBtn = document.getElementById('snack-btn');
    const dateBtn = document.getElementById('date-btn');
    const shopBtn = document.getElementById('shop-btn');  // touchBtnをshopBtnに変更
    const eventBtn = document.getElementById('event-btn');

    startBtn.addEventListener('click', function() {
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

    // ボタンイベント例
    snackBtn.addEventListener('click', function() {
        alert('おやつをあげました！');
    });

    dateBtn.addEventListener('click', function() {
        alert('デートに行きました！');
    });

    shopBtn.addEventListener('click', function() {
        alert('ショップに行きました！');
    });

    eventBtn.addEventListener('click', function() {
        alert('イベントが発生しました！');
    });
});
