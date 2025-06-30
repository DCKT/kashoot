import { k } from "./shared";

export enum SoundEffect {
  Hit = "hit",
  BossHit = "boss_hit",
  Alarm = "alarm",
}

export const primaryColor = {
  r: 108,
  g: 209,
  b: 92,
};

export enum Font {
  Title = "VT323",
}

export const initAssets = () => {
  k.loadBitmapFont(Font.Title, `fonts/${Font.Title}.png`, 68, 68, {
    chars:
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  });
  k.loadSprite("target", "sprites/target.png");
  k.loadSprite("title", "sprites/Kashoot.png");
  k.loadSound(SoundEffect.Hit, `sounds/${SoundEffect.Hit}.wav`);
  k.loadSound(SoundEffect.BossHit, `sounds/${SoundEffect.BossHit}.wav`);
  k.loadSound(SoundEffect.Alarm, `sounds/${SoundEffect.Alarm}.wav`);
};
