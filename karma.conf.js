module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'src/**/*.js',
            'spec/**/*.js'
        ],
        reporters: ['spec', 'coverage'],
        preprocessors: {
            'src/**/*.js': ['coverage']
        },
        browsers: ['Chrome'],
        singleRun: false
    });
};