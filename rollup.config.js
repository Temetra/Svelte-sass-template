import * as path from "path";
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import webWorkerLoader from "rollup-plugin-web-worker-loader";
import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import scss from "rollup-plugin-scss";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const production = !process.env.ROLLUP_WATCH;
const emitSourcemaps = !production;
const pathTo = (subdir) => path.resolve(__dirname, "src", subdir) + "/";

export default {
	input: "src/main.js",
	output: [{
		file: "public/bundle.js",
		sourcemap: emitSourcemaps,
		format: "iife",
		name: "app"
	}],
	plugins: [
		/*
		"alias" rewrites import statements before the file is resolved
		Three specific shortcuts are replaced anywhere in the import path
			~/scss/ ~/stores/ ~/modules/
		This works for web-worker imports
			import TestWorker from "web-worker:~/modules/test.worker";
		The last is a components shortcut which changes imports that start with ~/
			import Header from "~/Header.svelte";
		*/ 
		alias({
			resolve: [".svelte", ".js"],
			entries: [
				{ find: /~\/scss\//, replacement: pathTo("scss") },
				{ find: /~\/stores\//, replacement: pathTo("stores") },
				{ find: /~\/modules\//, replacement: pathTo("modules") },
				{ find: /^~\//, replacement: pathTo("components") },
			]
		}),

		// Locates modules using the Node resolution algorithm
		resolve({
			// Some package.json files have a "browser" field which specifies alternative files to load for people bundling for the browser
			browser: true,
			// Prevent bundling the same package multiple times 
			dedupe: ["svelte"]
		}),

		// Web workers
		webWorkerLoader(),

		// Compile Svelte components
		svelte({
			dev: !production,
			// Processes SCSS embedded within Svelte files
			preprocess: autoPreprocess({
				scss: {
					includePaths: [pathTo("scss")],
					sourceMap: emitSourcemaps,
				}
			}),
			// Emit CSS for scss plugin to bundle
			emitCss: true
		}),

		// Processes SCSS imported from other JS files and plugins
		scss({
			output: "public/bundle.css",
			outputStyle: production ? "compressed" : "",
			sourceMap: emitSourcemaps,
		}),

		// Convert CommonJS modules to ES6
		commonjs(),

		// Transpile
		production && babel({
			extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".svelte"],
			babelHelpers: "runtime",
			presets: [["@babel/preset-env"]],
			plugins: ["@babel/plugin-transform-runtime"]
		}),

		// Minify generated bundle if in production mode
		production && terser(),

		// Dev host
		!production && serve({
			open: false,
			contentBase: "public",
			host: "0.0.0.0",
			port: 5000
		}),

		!production && livereload(),
	],
	watch: {
		clearScreen: false
	}
};