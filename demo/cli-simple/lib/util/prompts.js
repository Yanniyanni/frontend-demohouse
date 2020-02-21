module.exports = function (projectName) {
    const prompts = [];
    prompts.push({
        type: 'input',
        name: 'name',
        message: '请输入项目名称',
        default: projectName
    });
    prompts.push({
        type: 'input',
        name: 'description',
        message: '请给项目添加一点描述吧'
    });
    prompts.push({
        type: 'list',
        name: 'page',
        message: '请选择应用类型',
        choices: [
            { name: '单页应用', value: 'single', checked: true },
            { name: '多页应用', value: 'multi' }
        ]
    });
    prompts.push({
        type: 'confirm',
        name: 'router',
        message: '是否使用 vue-router'
    });
    prompts.push({
        type: 'list',
        name: 'routerMode',
        when(data) {
            return data.router;
        },
        message: '请选择路由模式',
        choices: [
            { name: 'hash模式', value: 'hash', checked: true },
            { name: 'history模式', value: 'history' }
        ]
    });
    prompts.push({
        type: 'confirm',
        name: 'vuex',
        message: '是否使用 vuex'
    });
    return prompts;
};
