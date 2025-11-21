// 小手調べ
function setup(){
  createCanvas(100, 100);
  noFill();
  for(let i = 0; i < 10; i++){
    // BLANK[1] 条件分岐を使って、前半は赤、後半は青で円を描こう
    let size = (i + 1) * 10;
    noFill();
    if(i < 6){
      stroke(0, 0, 255); // 青
    } else {
      stroke(255, 0, 0); // 赤
    }
    ellipse(50, 50, size, size);
  }
}
