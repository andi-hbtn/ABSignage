import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Imazh i vetëmjaftueshëm për Docker (Easypanel/Contabo).
   *
   * `standalone` e bën `next build` të nxjerrë te `.next/standalone` një server Node me
   * VETËM varësitë që përdoren vërtet. Pa të, imazhi i prodhimit do të duhej të mbante
   * krejt `node_modules` — qindra megabajt që nuk ekzekutohen kurrë.
   */
  output: "standalone",
};

export default nextConfig;
