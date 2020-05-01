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

// Paths used for alias replacement
const paths = {
	scss: path.resolve(__dirname, "src/scss"),
	stores: path.resolve(__dirname, "src/stores"),
	modules: path.resolve(__dirname, "src/modules"),
	components: path.resolve(__dirname, "src/components"),
};

export default {
	input: "src/main.js",
	output: [{
		file: "public/bundle.js",
		sourcemap: emitSourcemaps,
		format: "iife",
		name: "app"
	}],
	plugins: [
		// Rewrite aliased imports as absolute paths
		alias({
			resolve: [".svelte", ".js"],
			entries: [
				{ find: /~\/styles\//, replacement: paths.scss + "/" },
				{ find: /~\/stores\//, replacement: paths.stores + "/" },
				{ find: /~\/modules\//, replacement: paths.modules + "/" },
				{ find: /^~\//, replacement: paths.components + "/" },
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
					includePaths: [paths.scss],
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