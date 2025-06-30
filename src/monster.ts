import { match } from "ts-pattern";
import { k } from "./shared";
import { SoundEffect } from "./assets";

export enum Monster {
  Bean = "bean",
  Bag = "bag",
  Glady = "glady",
  Ghosty = "ghosty",
}

k.loadSprite(Monster.Bean, `sprites/${Monster.Bean}.png`);
k.loadSprite(Monster.Bag, `sprites/${Monster.Bag}.png`);
k.loadSprite(Monster.Glady, `sprites/${Monster.Glady}.png`);
k.loadSprite(Monster.Ghosty, `sprites/${Monster.Ghosty}.png`);

const SIZE = 60;

type makeMonsterParams = {
  kind: Monster;
  onKill?: (scoreValue: number) => void;
};

export const makeMonster = ({ kind, onKill }: makeMonsterParams) => {
  let c = k.add([
    k.pos(k.rand(SIZE, k.width() - SIZE), k.rand(SIZE, k.height() - SIZE)),
    k.health(
      match(kind)
        .with(Monster.Bean, () => 1)
        .with(Monster.Bag, () => 1)
        .with(Monster.Ghosty, () => 2)
        .with(Monster.Glady, () => 3)
        .exhaustive(),
    ),
    k.area(),
    k.opacity(1),
    k.sprite(kind),
    "monster",
    {
      scoreValue: match(kind)
        .with(Monster.Bean, () => 1)
        .with(Monster.Bag, () => 2)
        .with(Monster.Ghosty, () => 3)
        .with(Monster.Glady, () => 5)
        .exhaustive(),
    },
  ]);

  c.onHurt(() => {
    let currentHp = c.hp();

    k.play(
      match(kind)
        .with(Monster.Glady, () => SoundEffect.BossHit)
        .otherwise(() => SoundEffect.Hit),
    );

    if (currentHp <= 0) {
      onKill ? onKill(c.scoreValue) : null;
      c.destroy();
    } else {
      c.setHP(currentHp);
      k.wait(0.16, () => {
        c.opacity = 1;
      });
    }
  });

  c.onClick(() => {
    c.opacity = 0.7;
    c.hurt();
  });

  return c;
};
