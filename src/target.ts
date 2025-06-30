import { k } from "./shared";

const RADIUS = 50;

type makeTargetParams = {
  onClick: (accuracy: number) => void;
  autoDestroy?: boolean;
};

export default function makeTarget({
  onClick,
  autoDestroy = true,
}: makeTargetParams) {
  let c = k.add([
    k.pos(
      k.rand(RADIUS, k.width() - RADIUS),
      k.rand(RADIUS, k.height() - RADIUS),
    ),
    k.health(1),
    k.area(),
    k.circle(RADIUS),
    // k.sprite("target"),
    "circle",
  ]);

  c.onHurt((amount) => {
    let currentHp = c.hp() - amount;
    if (currentHp <= 0) {
      c.destroy();
    } else {
      c.setHP(currentHp);
    }
  });

  c.onClick(() => {
    let clickPos = k.mousePos();
    const dist = clickPos.dist(c.pos);
    const accuracy = Math.max(0, 100 - (dist / RADIUS) * 100);
    k.debug.log(`Accuracy: ${accuracy.toFixed(1)}%`);
    // c.hurt();

    onClick(accuracy);
  });

  if (autoDestroy) {
    k.wait(2, () => {
      c.destroy();
    });
  }

  return c;
}
