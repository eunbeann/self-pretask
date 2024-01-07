import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface postedStickerProps {
  postedStickerId: number;
  stickerImage: string;
  positionX: number;
  positionY: number;
}

export const postedSticker = atom<postedStickerProps[]>({
  key: "postedSticker",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
