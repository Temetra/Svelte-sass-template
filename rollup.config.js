import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import scss from "rollup-plugin-scss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

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
			presets: ["@babel/preset-env"],
			exclude: "node_modules/**"
		}),

		// Minify generated bundle if in production mode
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};