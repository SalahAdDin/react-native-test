// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.blacklistRE = /.*\.test\.(ts|tsx|js|jsx)$/;

config.resolver.sourceExts.push("cjs");

module.exports = config;
