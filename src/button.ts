import { Font } from "./assets";
import { k } from "./shared";
import { Color } from "kaplay";

export const makeButton = ({ text, onClick, posX, posY }) => {
  const button = k.add([
    k.pos(posX, posY),
    k.rect(220, 60, { radius: 8 }),
    k.area(),
    k.color(108, 209, 92),
    k.opacity(1),
    k.outline(2, { r: 58, g: 176, b: 39 } as Color),
    "button",
  ]);

  button.add([
    k.text(text, { font: Font.Title }),
    k.anchor("center"),
    k.pos(110, 31),
    k.color(14, 14, 14),
  ]);

  button.onClick(() => {
    button.opacity = 0.8;
    onClick();
  });
  return button;
};
