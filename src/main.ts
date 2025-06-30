import { Font, initAssets, primaryColor } from "./assets";
import { makeButton } from "./button";
import { makeMonster, Monster } from "./monster";
import { k } from "./shared";

k.loadRoot("./");
initAssets();

enum Scene {
  Menu = "menu",
  Game = "game",
  Score = "score",
  Debug = "debug",
}

k.scene(Scene.Menu, () => {
  makeButton({
    text: "PLAY",
    onClick: () => {
      k.go(Scene.Game);
    },
    posX: k.width() / 2 - 110,
    posY: k.height() / 2,
  });
  k.add([
    k.sprite("title"),

    k.pos(k.width() / 2, k.height() / 4),
    k.anchor("center"),
  ]);
});

const GAME_DURATION_SECONDS = 30;
const LOOP_INTERVAL_SECONDS = 1;
const SCORE_WIDTH = 300;
const SCORE_HEIGHT = 60;

let alarmSound = k.play("alarm", {
  loop: true,
  volume: 0.25,
  speed: 0.9,
  paused: true,
});

k.scene(Scene.Game, () => {
  const scoreContainer = k.add([
    k.pos(SCORE_WIDTH / 2 + 10, SCORE_HEIGHT / 2 + 10),
    k.rect(SCORE_WIDTH, SCORE_HEIGHT, { radius: 8 }),
    k.outline(2),
    k.anchor("center"),
  ]);
  const score = scoreContainer.add([
    k.text("Score: 0", { size: 42 }),
    k.color(14, 14, 14),
    k.pos(-30, 4),
    k.anchor("center"),
    { value: 0 },
  ]);

  const progress = k.add([
    k.rect(k.width() - 350, 40, { radius: 4 }),
    k.pos(320, 20),
    k.color(primaryColor.r, primaryColor.g, primaryColor.b),
    k.outline(2),
    k.timer(),
  ]);

  let progressWidthPerSecond = progress.width / GAME_DURATION_SECONDS;

  progress.loop(0.25, () => {
    progress.width = progress.width - progressWidthPerSecond / 4;
  });

  progress.wait(GAME_DURATION_SECONDS, () => {
    k.go(Scene.Score, { score: score.value });
  });

  k.wait(GAME_DURATION_SECONDS - 5, () => {
    alarmSound.paused = false;
    progress.color.r = 240;
    progress.color.g = 10;
    progress.color.b = 10;
  });

  const increaseScore = (scoreValue: number) => {
    score.value += scoreValue;
    score.text = `Score: ${score.value}`;
  };

  k.loop(LOOP_INTERVAL_SECONDS, () => {
    makeMonster({
      kind: Monster.Bean,
      onKill: increaseScore,
    });
    if (k.rand(0, 3)) {
      makeMonster({
        kind: Monster.Bag,
        onKill: increaseScore,
      });
    }
    if (k.rand(0, 5)) {
      k.wait(0.3, () => {
        makeMonster({
          kind: Monster.Ghosty,
          onKill: increaseScore,
        });
      });
    }
    if (k.rand(0, 12)) {
      k.wait(0.6, () => {
        makeMonster({
          kind: Monster.Glady,
          onKill: increaseScore,
        });
      });
    }
  });
});

k.scene(Scene.Score, ({ score }) => {
  alarmSound.paused = true;
  k.add([
    k.text(`Score: ${score}`, { size: 64 }),
    k.color(14, 14, 14),
    k.pos(k.width() / 2, k.height() / 2 - 50),
    k.anchor("center"),
  ]);
  makeButton({
    text: "REPLAY",
    onClick: () => {
      k.go(Scene.Game);
    },
    posX: k.width() / 2 - 110,
    posY: k.height() / 2,
  });
});

k.scene("debug", () => {
  makeMonster({ kind: Monster.Glady });
  makeMonster({ kind: Monster.Ghosty });
});

k.go(Scene.Menu);
