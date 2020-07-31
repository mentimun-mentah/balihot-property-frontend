export const FadePage = {
  initial: {
    opacity: 0,
    y: "-100vh",
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
  },
};

export const Fade = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

export const Zoom = {
  initial: { opacity: 0, scale: 0 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0 },
};

export const BackdropModal = {
  initial: { opacity: 0 },
  in: { opacity: 0.5 },
  out: { opacity: 0 },
};

export const LeftToRight = {
  initial: { x: 300, opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: 300, opacity: 0 },
};

export const RightToLeft = {
  initial: { x: 300, opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: -300, opacity: 0 },
};

export const TopToBottom = {
  initial: { y: 300, opacity: 0 },
  in: { y: 0, opacity: 1 },
  out: { y: -300, opacity: 0 },
};
