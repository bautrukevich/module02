let config = {
  'templater': {
    'extName': 'pug',
    'options': {
      'pretty': true
    },
  },
  'preprocessor': {
    'extName': 'post.css',
    'entry': 'main'
  },
  'bundler': {
    'extName': 'js',
    'entry': 'main'
  },
  'build': './public/',
  'src': {
    'components': './src/components/',
    'pages': './src/pages/',
  },
};

export default config;
