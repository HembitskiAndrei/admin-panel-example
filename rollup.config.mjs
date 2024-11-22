import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import typescriptModule from 'typescript'
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import copy from "rollup-plugin-copy";
import htmlTemplate from 'rollup-plugin-generate-html-template';
import del from 'rollup-plugin-delete'

export default {
  input: "./src/client/index.tsx",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  onwarn(warning, warn) {
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
      return;
    }
    warn(warning);
  },
  plugins: [
    // del({ targets: 'dist/*' }),
    copy({
      targets: [
        {
          src: ["public"],
          dest: "dist",
        },
      ],
      copyOnce: true,
    }),
    htmlTemplate({
      template: 'templates/index.html',
      target: 'index.html',
    }),
    image(),
    postcss(),
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ["dist"],
      host: "localhost",
      port: 3000,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
    livereload({
       watch: "dist"      
    }),
    typescript({
      typescript: typescriptModule,
      outDir: 'dist',
      declarationDir: 'dist',
      declaration: true,
      sourceMap: true,
  }),
  ]
};
