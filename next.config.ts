import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // YouTube video thumbnails for the Courses section
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
  async redirects() {
    return ["about", "experience", "skills", "projects", "contact"].map(
      (section) => ({
        source: `/${section}`,
        destination: `/#${section}`,
        permanent: true,
      })
    );
  },
};

export default nextConfig;
