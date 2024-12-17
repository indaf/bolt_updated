import React from "react";
import { Color } from "../../types";

interface CrossProps {
  color: Color;
  size?: "md" | "lg" | "xs";
  onClick?: () => void;
}

export function Cross({ color, size = "md", onClick }: CrossProps) {
  const colors = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    black: "bg-black",
  };

  const sizeClasses = {
    xs: {
      container: "w-3 h-3",
      bar: "h-[3px]",
    },
    md: {
      container: "w-9 h-9",
      bar: "h-2",
    },
    lg: {
      container: "w-12 h-12",
      bar: "h-3",
    },
  };

  return (
    <div
      className={`relative cursor-pointer ${sizeClasses[size].container}`}
      onClick={() => (onClick ? onClick() : null)}
    >
      <div
        className={`absolute top-1/2 left-0 w-full ${sizeClasses[size].bar} -mt-1 ${colors[color]} rotate-45`}
      />
      <div
        className={`absolute top-1/2 left-0 w-full ${sizeClasses[size].bar} -mt-1 ${colors[color]} -rotate-45`}
      />
    </div>
  );
}
