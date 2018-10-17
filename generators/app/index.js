'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the terrific ${chalk.red(
          'generator-redux-observable-kit'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.initPackage(),
      this.renderTplFile()
    );
  }
  initPackage() {
    let pkg = this.fs.readJSON(this.templatePath('package.json'), {});
    const { props } = this;

    pkg = _.merge(pkg, {
      name: props.name,
      description: props.description
    });

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  renderTplFile() {
    let target = [
      'database/people.json',
      'public/favicon.ico',
      'public/index.html',
      'public/manifest.json',
      'src/page/home/components/home.js',
      'src/page/home/containers/home.js',
      'src/page/home/store/action.js',
      'src/page/home/store/actionType.js',
      'src/page/home/store/epic.js',
      'src/page/home/store/reducer.js',
      'src/routes/index.js',
      'src/store/configureStore.js',
      'src/store/epic.js',
      'src/store/reducer.js',
      'src/app.js',
      'src/index.js',
      'src/registerServiceWorker.js'
    ];

    _.forEach(target, file => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), this.props);
    });
  }

  install() {
    this.installDependencies();
  }
};
