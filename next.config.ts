import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
