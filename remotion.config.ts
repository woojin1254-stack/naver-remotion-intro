/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

// Optimization for high-quality rendering
Config.setVideoImageFormat("png"); // Use PNG for higher quality frames during rendering
Config.setOverwriteOutput(true);

// Increase concurrency for faster rendering if system supports it
Config.setConcurrency(8);

Config.overrideWebpackConfig((config) => {
    return enableTailwind(config);
});
