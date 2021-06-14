const esbuild = require('esbuild');

esbuild.buildSync({
  entryPoints: [
    './src/index.tsx',
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  bundle: true,
  minify: true,
  platform: 'browser',
  outfile: './out/index.js',
  target: 'es2017',
  sourcemap: true,
});
