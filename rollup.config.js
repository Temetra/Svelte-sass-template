import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import scss from "rollup-plugin-scss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import webWorkerLoader from "rollup-plugin-web-worker-loader";

const production = !process.env.ROLLUP_WATCH;
const emitSourcemaps = false;

export default {
	input: "src/main.js",
	output: [{
		file: "public/bundle.js",
		sourcemap: emitSourcemaps,
		format: "iife",
		name:"app"
	}],
	plugins: [
		// Web workers
		webWorkerLoader(),

		// Compile Svelte components
		svelte({
			dev: !production,
			// Processes SCSS embedded within Svelte files
			preprocess: autoPreprocess(),
			// Emit CSS for scss plugin to bundle
			emitCss: true
		}),

		// Bundles SCSS imported from JS files and other plugins
		// This outputs the sourcemap from svelte plugin regardless of settings
		scss({
			output: "public/bundle.css",
			outputStyle: production ? "compressed" : ""
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

		// Dev host
		!production && serve({
			open: true,
			contentBase: "public",
			port: 5000
		}),

		!production && livereload(),

		// Transpile
		production && babel({
			extensions:[".js", ".jsx", ".es6", ".es", ".mjs", ".svelte"],
			babelHelpers:"runtime",
			presets: [["@babel/preset-env"]],
			plugins: ["@babel/plugin-transform-runtime"]
		}),

		// Minify generated bundle if in production mode
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};