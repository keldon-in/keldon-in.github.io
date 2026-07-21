/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export for GitHub Pages (keldon-in.github.io serves the `out/` folder).
  output: "export",
  // Pages can't run Next's image optimiser; we use plain <img> anyway.
  images: { unoptimized: true },
  // Emit folder-style URLs (/products/ -> /products/index.html) so Pages serves them.
  trailingSlash: true,
};

export default nextConfig;
