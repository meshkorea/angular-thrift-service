module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mock/angular-mock.js',
      'bower_components/thrift/lib/js/thrift.js',
      'src/*.js',
      'test/**/*.js'
    ],

    browsers: ['PhantomJS']
  });
};
