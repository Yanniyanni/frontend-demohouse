const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const util = require('./util');

let CONFIG_FILE = path.resolve(os.homedir(), '.cute-config.json')
let OPTIONS = ['env', 'token', 'registry']

// 读取 config
async function readConfig () {
    let config
    if (!config) {
        try {
            config = await fs.readJson(CONFIG_FILE)
        } catch (e) {
            // todo 偷个懒，配置文件放着，可以将它提取出来，如存放在.rc文件
            config = {token: '', registry: 'https://github.com'}
            // 查看$HOME/.cute-config.json 可以看到配置文件已存在
            await fs.writeJson(CONFIG_FILE, config)
        }
    }
    return config
}
// 获取 config 数据
async function getConfig (key) {
    let config = await readConfig()
    if (key) return config[key]
    return config
}

// 设置 config
async function setConfig (key, val) {
    if (!OPTIONS.includes(key)) {
        util.logRed(`无效配置项 ${key}`)
        process.exit()
    }
    let config = await readConfig()
    if (key && val) {
        config[key] = val
        await fs.writeJson(CONFIG_FILE, config, 'utf-8')
    }
    return config
}

// 移除 config
async function removeConfig (key) {
    let config = await readConfig()
    delete config[key]
    await fs.writeJson(CONFIG_FILE, config, 'utf-8')
}

// 进入config流程
async function config (key, val, cmd) {
    let configKey = key
    let configVal = val
    let rm = cmd['rm']

    let config
    if(!configKey) {
        config = await getConfig()
        return util.log(config)
    }
    if (configKey) {
        if (rm) {
            // remove key
            await removeConfig(configKey)
            config = await getConfig()
            return util.log(config)
        } else if (!configVal) {
            config = await getConfig(configKey)
            return util.log(config)
        }
    }
    // set key
    if (configKey && configVal) {
        config = await setConfig(configKey, configVal)
        util.log(config)
    }
}

module.exports = (...args) => {
    return config(...args).catch(e => {
        console.error(e);
    });
};

