import styled from "@emotion/styled";

export type ButtonStyle = "choose" | "complete";

export const CustomButton = styled.button<{ variant: ButtonStyle }>`
  position: fixed;
  bottom: 2rem;

  width: 34.4rem;
  height: 6rem;

  border-radius: 0.625rem;
  background-color: ${({ theme, variant }) => (variant === "choose" ? "orange" : "black")};
  color: "white";

  :disabled {
    background-color: "grey";
  }
`;
