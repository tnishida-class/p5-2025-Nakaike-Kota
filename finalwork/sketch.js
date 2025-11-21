//最終課題を制作しよう
let x, y;
let vx, vy;
const g = 1;
let enemies;
let message;
let messageTimer;
let nextEnemyFrame;
let gameState; // "start", "playing", "clear","gameover","continue","rule"
let defeatedCount; // 倒した敵の数
let life; // プレイヤーの残機

function setup(){
  createCanvas(windowWidth, windowHeight);
  player();
  enemies = []; 
  message = "";
  messageTimer = 0;
  nextEnemyFrame = 120; // 最初の敵が出るフレーム数
  gameState = "start"; // ゲーム開始前
  defeatedCount = 0; // 倒した敵の数
  life = 5; //残機は５
}

function player(){
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // スタート画面
  if(gameState === "start"){
    comment(48,"ジャンプゲーム", width / 2, height / 2 - 50);
    comment(24,"ENTERキーを押してスタート", width / 2, height / 2 + 20);
    comment(20,"目標: 敵を50体倒せ!", width / 2, height / 2 + 60);
    return;
  }

  if(gameState === "rule"){
    comment(48,"ルール説明", width / 2, height / 2 - 150);
    comment(20,"RIGHT_ARROW(→)：右移動", width / 2, height / 2 - 90);
    comment(20,"LEFT_ARROW(←)：左移動", width / 2, height / 2 - 60);
    comment(20,"Shift + 移動キーで加速", width / 2, height / 2 - 30);
    comment(20,"スペースでジャンプ", width / 2, height / 2);
    comment(20,"タイミングよくジャンプして敵を踏んだら撃破!", width / 2, height / 2 + 30);
    comment(24,"ENTERキーでゲーム開始", width / 2, height / 2 + 80);
    return;
  }
  
  // クリア画面
  if(gameState === "clear"){
    comment(48,"クリア!", width / 2, height / 2 - 50);
    comment(24,"50体の敵を倒しました!", width / 2, height / 2 + 20);
    comment(24,"ENTERキーで最初に戻る", width / 2, height / 2 + 60);
    return;
  }

  // コンティニュー画面
  if(gameState === "continue"){
    comment(48,"やられた!", width / 2, height / 2 - 80);
    comment(32,"残機: " + life, width / 2, height / 2 - 20);
    comment(24,"ENTERキーでCONTINUE", width / 2, height / 2 + 40);
    return;
  }

  // ゲームオーバー画面
  if(gameState === "gameover"){
    comment(60,"GAME OVER!", width / 2, height / 2 - 100);
    comment(24,"敵が強敵だったようだ、、、!", width / 2, height / 2 - 50);
    comment(24,"ENTERキーでもう一度プレイ", width / 2, height / 2 + 20);
    return;
  }
  // プレイヤーの操作
  vx = 0;
  
  // キャラクターの左右移動 
  if(keyIsDown(LEFT_ARROW)){vx -= 5;}
  if(keyIsDown(SHIFT) && keyIsDown(LEFT_ARROW)){vx -= 5;}
  if(keyIsDown(RIGHT_ARROW)){vx += 5;}
  if(keyIsDown(SHIFT) && keyIsDown(RIGHT_ARROW)){vx += 5;}

  // 重力とジャンプ
  vy += g;
  
  // ジャンプ(スペースキー)
  if(keyIsDown(" ".charCodeAt(0)) && y >= groundY - size / 2){
    vy = -20;
  }
  // 地面に着いたら止める
  else if(y >= groundY - size / 2){
    y = groundY - size / 2;
    vy = 0;
  }

  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  x += vx;   
  y += vy;
  
  // キャラクターを描く
  fill(224,18,15); //色をマリオっぽく
  ellipse(x, y, size, size);

  // 敵を作る
  // 敵が出てくるタイミングをランダムにする
  if(frameCount >= nextEnemyFrame){
    let e = {
      x: width + 50,  // 画面右端から出現
      y: groundY - size * 1.5 / 2, 
      vx: random(3,30),  //スピードはランダム
      size: size * 1.5, //敵の大きさはプレイヤーの1.5倍
    };
    enemies.push(e);
    // 敵が来たことを表示
    showmessage("敵が来た!");
    //  次の敵が出現するまでのフレーム数をランダムに設定
    nextEnemyFrame = frameCount + int(random(60, 180));
  }
  
  // 倒した敵な数を表示と残りの残機を表示
  fill(0);
  textSize(30);
  textAlign(RIGHT,TOP);
  text('倒した数:'+ defeatedCount + " / 50", width - 10, 10);
  text("残機: " + life, width - 10, 40);
  
  // 敵の更新と描画
  const aliveenemies = [];

  for(let i = 0; i < enemies.length; i++){
    let hit = false;
    let e = enemies[i];
    fill(51, 255, 105);  // 敵を黄緑っぽくしてノコノコっぽく
    ellipse(e.x, e.y, e.size);
    e.x -= e.vx;  // 左に移動
    if(e.x < -50) continue; //画面外にでたら敵が消えるように設定

    // プレイヤーと敵との当たり判定
    const dx = x - e.x;
    const dy = y - e.y;
    const d  = dx * dx + dy * dy;
    const R  = (size + e.size) / 2;

    if(d < R * R){
      // プレイヤーが敵の上からあったら、敵を撃破
      if(y < e.y){
        hit = true;
        defeatedCount++;
        showmessage("敵を倒した!");
        // 敵を15体、35体倒せたら一機増える
        if(defeatedCount === 15){
          life++;
          showmessage("1UP! 15体の敵を倒しました");
        }

        if(defeatedCount === 35){
          life++;
          showmessage("1UP! 35体の敵を倒しました");
        }
        // 念のため倒した数が50以上になったときとしておく
        if(defeatedCount >= 50){
          gameState = "clear";
          return;
        }
        continue; //この時点で敵は消える
      }
      // プレイヤーが敵と正面からぶつかったらコンティニューする
      else{
        life--;
        if(life <= 0){
          //  残機が０になったらゲームオーバー
          gameState = "gameover";
        }
        else{
          gameState = 'continue';
        }
        return; // ここでdraw関数を終了して、残りの敵の処理をスキップ(これがないと、やられたプレイヤーより前の敵が残ってしまう)
      }
    }
    if(!hit) aliveenemies.push(e); //プレイヤーが敵と当たらなかったら敵もプレイヤーも生き残る
  }
  enemies = aliveenemies;
  
  // messageTimerが正である間はメッセージを表示
  if(messageTimer > 0){
    comment(32,message,width / 2, height / 4)
    messageTimer--;
  }
}

function showmessage(t){
  message = t;
  messageTimer = 40; // 表示時間
}

function comment(s,t,x,y){
  push();
  fill(0);
  textSize(s);
  textAlign(CENTER, CENTER);
  text(t, x, y);
  pop();
}

function keyPressed(){
  // ENTERキーでゲーム開始/リセット
  if(keyCode === ENTER){
    if(gameState === "rule" ){
      gameState = "playing";
      player();
      enemies = [];
      defeatedCount = 0;
      life = 5;
      nextEnemyFrame = frameCount + 120;
    }
    else if(gameState === "start"){
      gameState = "rule";
    }
    else if(gameState === "continue"){
      gameState = "playing";
      player();
      enemies = [];
      nextEnemyFrame = frameCount + 120;
    }
    else if(gameState === "clear"|| gameState === "gameover"){
      gameState = "start";
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}