import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import scss from "rollup-plugin-scss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;
const emitSourcemaps = false;

export default {
	input: "src/main.js",
	output: {
		file: "public/bundle.js",
		sourcemap: emitSourcemaps,
		// iife – A self-executing function, suitable for inclusion as a <script> tag
		format: "iife",
		// Global variable name representing your bundle; for iife/umd bundles
		name: "app",
	},
	plugins: [
		// Bundles SCSS imported from JS files
		scss({
			output: "public/global.css",
			sourceMapEmbed: emitSourcemaps
		}),

		// Compile Svelte components
		svelte({
			dev: !production,
			// Bundles SCSS embedded within Svelte files
			preprocess: autoPreprocess(),
			css: css => { css.write("public/bundle.css", emitSourcemaps); }
		}),

		// Locates modules using the Node resolution algorithm
		resolve({
			// Some package.json files have a "browser" field which specifies alternative files to load for people bundling for the browser
			browser: true,
			// Prevent bundling the same package multiple times 
			dedupe: ["svelte"]
		}),

		// Convert CommonJS modules to ES6
		commonjs(),

		// Minify generated bundle if in production mode
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};