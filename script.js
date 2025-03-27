document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("start-btn");
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const fadeOverlay = document.getElementById("fade-overlay");
    
    // ゲーム開始の処理
    startBtn.addEventListener("click", function() {
        // スタートボタンをクリックしたら、白いオーバーレイを表示
        fadeOverlay.classList.remove("hidden");
        fadeOverlay.style.opacity = 1; // 白い画面を表示
        
        // キャラクターの読み込みを待機
        const characterImg = document.getElementById("character");
        
        // 画像の読み込みが完了したら
        characterImg.onload = function() {
            // ゲーム画面の表示
            setTimeout(function() {
                // 白い画面をフェードアウト
                fadeOverlay.style.opacity = 0;
                
                // ゲーム画面を表示
                startScreen.classList.add("hidden");
                gameScreen.classList.remove("hidden");
            }, 1000); // フェードアウトの後にゲーム画面を表示
        };
    });
});
