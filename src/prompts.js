import inquirer from 'inquirer';
import emailValidator from 'email-validator';
import validateNpmPackageName from 'validate-npm-package-name';
import isSemver from 'is-semver';
import chalk from 'chalk';

import isGitHubUsernameValid from './isGitHubUsernameValid';
import {
  PACKAGE_TYPES,
  PACKAGE_FEATURES,
} from './constants';

const prompts = async () => (
  inquirer.prompt([
    {
      name: 'packageType',
      message: chalk.bold.magentaBright('📦  Select a package type'),
      type: 'list',
      choices: [
        PACKAGE_TYPES.NODE,
        PACKAGE_TYPES.REACT,
      ],
    },
    {
      name: 'packageFeatures',
      message: chalk.bold.cyanBright('✅  Select package features'),
      type: 'checkbox',
      choices: [
        PACKAGE_FEATURES.COMMITLINT,
        PACKAGE_FEATURES.SEMANTIC_RELEASE,
      ],
    },
    {
      name: 'packageName',
      message: chalk.bold.greenBright('📛  Input a package name'),
      type: 'input',
      validate: packageName => validateNpmPackageName(packageName).validForNewPackages || chalk.bold.redBright(`😞  ${packageName} is an invalid package name`),
    },
    {
      name: 'packageDescription',
      message: chalk.bold.redBright('🏷️  Input a package description'),
      type: 'input',
      validate: answer => answer && answer.length > 0,
    },
    {
      name: 'packageVersion',
      message: chalk.bold.yellowBright('🌱  Input an initial package version'),
      type: 'input',
      validate: answer => isSemver(answer) || chalk.bold.redBright(`😞  ${answer} is an invalid package version`),
    },
    {
      name: 'targetDirectory',
      message: chalk.bold.magentaBright('📍  Input the relative package location'),
      type: 'input',
      validate: answer => answer && answer.length > 0,
    },
    {
      name: 'authorEmailAddress',
      message: chalk.bold.cyanBright('📥  Input your email address'),
      type: 'input',
      validate: emailAddress => emailValidator.validate(emailAddress) || chalk.bold.redBright(`😞  ${emailAddress} is an invalid email address`),
    },
    {
      name: 'gitHubUsername',
      message: chalk.bold.greenBright('👤  Input your GitHub username'),
      type: 'input',
      validate: async (username) => {
        if (await isGitHubUsernameValid(username)) {
          return true;
        }

        return chalk.bold.redBright(`😞  ${username} is an invalid GitHub username`);
      },
    },
  ])
);

export default prompts;
