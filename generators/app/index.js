'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const _ = require('lodash');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
	initializing() {
		this.props = {};
	}

	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(`Welcome to the terrific ${chalk.red('generator-redux-observable-kit')} generator!`));

		const prompts = [
			{
				type: 'input',
				name: 'projectName',
				message: 'What is the name of the new project?',
				default: 'create-react-rx-app'
			},
			{
				type: 'input',
				name: 'projectTitle',
				message: 'Please input project title (webpack示例):',
				default: 'react-rx-kit'
			},
			{
				type: 'input',
				name: 'projectDesc',
				message: 'Please input project description:'
			},
			{
				type: 'list',
				name: 'projectLicense',
				message: 'Please choose license:',
				choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
			}
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {
		if (path.basename(this.destinationPath()) !== this.props.projectName) {
			this.log(
				'Your generator must be inside a folder named ' +
					this.props.projectName +
					'\n' +
					'I\'ll automatically create this folder.'
			);
			mkdirp(this.props.projectName);
			this.destinationRoot(this.destinationPath(this.props.projectName));
		}

		const readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
		this.fs.write(
			this.destinationPath('README.md'),
			readmeTpl({
				projectTitle: this.props.projectTitle,
				projectDesc: this.props.projectDesc
			})
		);

		this.fs.copy(
			this.templatePath('package.json'),
			this.destinationPath('package.json'),
			this.initPackage(),
			this.renderTplFile()
		);
	}
	initPackage() {
		let pkg = this.fs.readJSON(this.templatePath('package.json'), {});
		const {props} = this;

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
			'src/pages/home/components/home.js',
			'src/pages/home/containers/home.js',
			'src/pages/home/store/action.js',
			'src/pages/home/store/actionType.js',
			'src/pages/home/store/epic.js',
			'src/pages/home/store/reducer.js',
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
