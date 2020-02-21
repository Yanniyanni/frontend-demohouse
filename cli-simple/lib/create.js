const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const globby = require('globby');
const ejs = require('ejs')
const util = require('./util')
const getPrompts = require('./util/prompts')

// 读取 tpl 模板信息
async function generateProject (projectName, tpl, answer) {
    await fs.copy(tpl, projectName, {
        filter: function (src) {
            // todo 偷个懒，在这里过滤交互命令里的内容，可以改成更高级的写法
            if (!answer.router) {
                return !/tpl(\\|\/)node_modules/.test(src) && !/tpl(\\|\/)router/.test(src)
            }
            if (!answer.vuex) {
                return !/tpl(\\|\/)node_modules/.test(src) && !/tpl(\\|\/)vuex/.test(src)
            }
            return !/tpl(\\|\/)node_modules/.test(src)
        }
    })
}

// 渲染 ejs 文件
async function renderEjs (files, context) {
    for(let tpl of files) {
        await render(tpl)
    }
    util.logGreen('项目初始化完成')
    async function  render(tpl) {
        let content = await ejs.renderFile(tpl, context, {async: true})
        await fs.writeFile(tpl.replace('.ejs', ''), content, 'utf8')
        await fs.remove(tpl)
    }
}

// 进入create流程
async function create(projectName, options = {}) {
    const cwd = options.cwd || process.cwd();
    const targetDir = path.resolve(cwd, projectName);
    const tplDir = path.resolve(__dirname, '../', 'tpl')

    // 目标目录是否存在
    if (fs.existsSync(targetDir)) {
        console.log(`\n 当前目录下${chalk.cyan(projectName)} 已存在，请换一个项目名...`);
        return;
    }

    // 进入命令交互
    const featurePrompt = inquirer.createPromptModule()
    let answer = await featurePrompt(getPrompts(projectName))
    console.log('answer>>>>>', answer)
    
    // 拉取 & 渲染模板
    await generateProject(projectName, tplDir, answer)
    const projectEjs = globby.sync('**/*.ejs', {cwd: projectName, absolute: true, dot: true})
    await renderEjs(projectEjs, answer)

};

// 记得export出去的时候是一个函数哦
module.exports = (...args) => {
    return create(...args).catch(e => {
        console.error(e);
    });
};
