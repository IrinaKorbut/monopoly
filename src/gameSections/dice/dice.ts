function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number,
  height: number, radius: number, fill: boolean) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
}

function drawDice(ctx: CanvasRenderingContext2D, x: number, y: number, size: number,
  value: number) {
  const dots = [];
  ctx.save();
  ctx.fillStyle = '#4167cd';
  ctx.translate(x, y);
  roundRect(ctx, 0, 0, size, size, size * 0.1, true);
  const padding = 0.25;
  let dotX;
  let dotY;
  dotX = padding * size;
  dotY = padding * size;
  dots.push({ x: dotX, y: dotY });
  dotY = size * 0.5;
  dots.push({ x: dotX, y: dotY });
  dotY = size * (1 - padding);
  dots.push({ x: dotX, y: dotY });
  dotX = size * 0.5;
  dotY = size * 0.5;
  dots.push({ x: dotX, y: dotY });
  dotX = size * (1 - padding);
  dotY = padding * size;
  dots.push({ x: dotX, y: dotY });
  dotY = size * 0.5;
  dots.push({ x: dotX, y: dotY });
  dotY = size * (1 - padding);
  dots.push({ x: dotX, y: dotY });
  let dotsToDraw: Array<number>;
  if (value === 1) dotsToDraw = [3];
  else if (value === 2) dotsToDraw = [0, 6];
  else if (value === 3) dotsToDraw = [0, 3, 6];
  else if (value === 4) dotsToDraw = [0, 2, 4, 6];
  else if (value === 5) dotsToDraw = [0, 2, 3, 4, 6];
  else dotsToDraw = [0, 1, 2, 4, 5, 6];
  ctx.fillStyle = '#332';
  for (let i = 0; i < dotsToDraw.length; i += 1) {
    ctx.beginPath();
    const j = dotsToDraw[i];
    ctx.arc(dots[j].x, dots[j].y, size * 0.07, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.translate(-x, -y);
}

export default function roll() {
  const firstDiceValue = Math.floor(Math.random() * 6) + 1;
  const secondDiceValue = Math.floor(Math.random() * 6) + 1;
  const canvas = <HTMLCanvasElement> document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawDice(context, 15, 22, 110, firstDiceValue);
  drawDice(context, 170, 22, 110, secondDiceValue);
  return firstDiceValue + secondDiceValue;
}
