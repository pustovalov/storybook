import { AngularCompilerPlugin } from '@ngtools/webpack';
import path from 'path';
import { ContextReplacementPlugin, Configuration } from 'webpack';
import autoprefixer from 'autoprefixer';
import getTsLoaderOptions from './ts_config';
import createForkTsCheckerInstance from './create-fork-ts-checker-plugin';

export function webpack(
  config: Configuration,
  { configDir }: { configDir: string }
): Configuration {
  const tsLoaderOptions = getTsLoaderOptions(configDir);
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack',
        },
        {
          test: /\.html$/,
          use: [{ loader: 'html-loader' }],
        },
        {
          test: /\.css$/, // for legacy purposes
          use: [{ loader: 'raw-loader' }],
        },
        {
          test: /\.s(c|a)ss$/,
          use: [
            { loader: 'raw-loader' },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                plugins: [autoprefixer()],
              },
            },
            { loader: 'sass-loader' },
          ],
        },
        //   {
        //     test: /\.tsx?$/,
        //     use: [
        //       {
        //         loader: 'ts-loader',
        //         options: tsLoaderOptions
        //       },
        //       { loader: path.resolve(__dirname, 'ngx-template-loader') }
        //     ]
        //   },
        {
          test: /[/\\]@angular[/\\]core[/\\].+\.js$/,
          parser: { system: true },
        },
        //   {
        //     test: /\.html$/,
        //     loader: 'raw-loader',
        //     exclude: /\.async\.html$/
        //   },
      ],
    },
    resolve: {
      ...config.resolve,
    },
    plugins: [
      ...config.plugins,
      new AngularCompilerPlugin({
        tsConfigPath: tsLoaderOptions.configFile,
        mainPath: path.join(__dirname, '../client/preview/angular/helpers.js'),
        skipCodeGeneration: true,
        sourceMap: true,
        directTemplateLoading: true,
      }),
      // See https://github.com/angular/angular/issues/11580#issuecomment-401127742
      // new ContextReplacementPlugin(
      //   /@angular(\\|\/)core(\\|\/)(fesm5|bundles)/,
      //   path.resolve(__dirname, '..')
      // ),
      // createForkTsCheckerInstance(tsLoaderOptions),
    ],
  };
}
