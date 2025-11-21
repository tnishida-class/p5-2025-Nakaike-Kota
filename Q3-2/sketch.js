// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
// 下のコードは 1回だけ実行されるんじゃなくて、何回も何回も繰り返し実行されてる
function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);
  // ここにvx=0を置くのはないとif(keyIsDown(LEFT_ARROW)){vx -= 5;}これが実行されるとvx=-5となるのはいいが、このコードは何回も繰り返して実行されるためLEFT_ARROWを押していなくてもvx=-5となってしまい、x += vxにより押していなくてもずっと左に移動してしまう。 
  vx = 0
  // BLANK[1] キャラクターの左右移動 
  if(keyIsDown(LEFT_ARROW)){vx -= 5;}
  // shfit+LEFT_ARROWでしたが実行されるが、else ifじゃないので上の文も実行されてx -= 10になる
  if(keyIsDown(SHIFT)&&keyIsDown(LEFT_ARROW)){vx-= 5;}
  if(keyIsDown(RIGHT_ARROW)){vx += 5;}
  // shfit+RIGHT_ARROWでしたが実行されるが、else ifじゃないので上の文も実行されてx += 10になる
  if(keyIsDown(SHIFT)&&keyIsDown(RIGHT_ARROW)){vx+= 5; }

  // BLANK[2] 重力とジャンプ
  // 重力を加える
  vy += g;
  // 上によってジャンプ（スペースキー）を押したらvy=-20になり、y += vyより地面をy=0とし、上方向を負の軸とするとy=-20となるがその後はg=1ずつvyが更新されていき、y += vyよりy=-19→-18→...になってy >= groundY - size / 2まで行くとelse if が発動し、vy=0、y = groundY - size / 2となる

  // ジャンプ（スペースキー）＋地面にいるときだけ
  if(keyIsDown(" ".charCodeAt(0)) && y >= groundY - size / 2){
    vy = -20  ; // 上向きジャンプ
  }
  // 地面に着いたら止める
  // y >= groundY - size / 2はちょうど地面か地面より下
  else if(y >= groundY - size / 2){
    y = groundY - size / 2;
    vy = 0;
  }


  // 速くなりすぎないように制限
  // 下の二つにより速さ20以上になることはない（ジャンプの時のvyを-50にしても-20までしかジャンプしない
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  x += vx;   
  y += vy;
  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}