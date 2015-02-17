module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/thrift/lib/js/src/thrift.js',
      'src/*.js',
      'test/**/*.js'
    ],

    browsers: ['PhantomJS']
  });
};
