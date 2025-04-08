import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    webpack(config) {
        // Exclude svg from default file loader
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg"),
        );
        fileLoaderRule.exclude = /\.svg$/;

        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

export default nextConfig;
