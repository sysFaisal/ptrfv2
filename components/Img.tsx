import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
  fill?: boolean;
};

const fillStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

export default function Img({
  priority = false,
  fill = false,
  loading,
  decoding,
  fetchPriority,
  style,
  ...rest
}: Props) {
  return (
    <img
      loading={priority ? "eager" : loading ?? "lazy"}
      decoding={decoding ?? (priority ? "sync" : "async")}
      fetchPriority={priority ? "high" : fetchPriority}
      style={fill ? { ...fillStyle, ...style } : style}
      {...rest}
    />
  );
}