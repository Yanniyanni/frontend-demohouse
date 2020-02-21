#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const didYouMean = require('didyoumean');
const package = require('../package.json');
const cleanArgs = require('../lib/util/cleanArgs');
const enhanceErrorMessages = require('../lib/util/enhanceErrorMessages');

// 查看版本
program
    .version(package.version, '-v --version', '获取当前版本')
    .helpOption('-h, --help', '输出帮助文档')
    .usage('<command> [options]');

// 添加create命令
program
    .command('create <app-name>')
    .description('创建一个新的项目')
    .action((name, cmd) => {
        const options = cleanArgs(cmd);
        require('../lib/create')(name, options);
    });

// 添加config命令
program
    .command('config')
    .arguments('[key] [val]', '设置或者读取全局配置如`token`、`env`、`host`等')
    .option('-r, --rm', '移除配置')
    .action((key, value, cmd) => {
        require('../lib/config')(key, value, cmd);
    });

// 输入错误命令时给与提示
program
    .arguments('[command]')
    .action(cmd => {
        program.outputHelp();
        console.log(`\n ${chalk.red('Unknown Command：')} ${chalk.yellow(cmd)} \n`);
        suggestCommands(cmd);
    });

// handle 错误信息显示优化
enhanceErrorMessages('missingArgument', argName => {
    return `\n Missing required argument ${chalk.yellow('<' + argName + '>')}.`;
});

enhanceErrorMessages('unknownOption', optionName => {
    return `\n Unknown option ${chalk.yellow(optionName)}.`;
});

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
    return `\n Missing required argument for option ${chalk.yellow(option.flags)}` + (
        flag ? `, got ${chalk.yellow(flag)}` : ''
    );
});

// 解析命令行参数
program.parse(process.argv);

// 如果只输入cute，则显示-h内容
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

// 给与命令提示
function suggestCommands(unknownCommand) {
    const availableCommands = program.commands.map(cmd => {
        return cmd._name;
    });
    const suggestion = didYouMean(unknownCommand, availableCommands);
    
    if (suggestion) {
        console.log('  ' + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
    }
}

