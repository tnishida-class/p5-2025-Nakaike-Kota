// チェッカー
function setup() {
  createCanvas(200, 200);
  const size = width / 8; // マスの一辺の長さ
  noStroke();
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      // BLANK[1] ヒント： rectのx座標は size * i, y座標は size * j
      // rect(size*i,size*j,size,size);

      if ((i + j) % 2 == 0) {
        fill(255); 
      } 
      else {
        fill(164, 164, 166);   
      }
      rect(i * size, j * size, size, size);

      // 駒の描画（黒マスにのみ置く）
      if ((i + j) % 2 != 0) {
        if (j < 3) {
          fill(255, 0, 0); // 赤い駒（上3段）
          ellipse(i * size + size / 2, j * size + size / 2, size ,size);
        } 
        else if (j > 4) {
          fill(0); // 黒い駒（下3段）
          ellipse(i * size + size / 2, j * size + size / 2, size,size);
        }
      }
    }
  }
}