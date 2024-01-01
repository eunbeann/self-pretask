import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface positionStateProps {
  x: number;
  y: number;
}

export const positionState = atom<positionStateProps>({
  key: "positionState",
  default: { x: 0, y: 0 },
  effects_UNSTABLE: [persistAtom],
});
