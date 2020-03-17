<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="header-wrap">
                <span>接口请求<span class="tips">(注意：请选择对应的脚本，否则数据不能正常显示)</span></span>
            </div>
            <el-form ref="form" 
                :model="form"
                :rules="rules"
                label-width="100px" 
                label-position='right'
                size="mini">
                <el-form-item label="接口地址:" prop="url" :show-message="false">
                    <el-input v-model="form.url" placeholder="请输入url"></el-input>
                </el-form-item>
                <el-form-item label="请求方式:" prop="method">
                    <el-select v-model="form.method">
                        <el-option value="get">get</el-option>
                        <el-option value="post">post</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请求参数:" class="params-wrap">
                    <div class="operate-wrap">
                        <el-button type="text" class="add" @click='addParam()' v-if="!isBulkEdit">新增参数</el-button>
                        <el-button type="text" class="import" @click='bulkEdit()'>{{isBulkEdit ? 'key-value 格式编辑': '批量编辑'}}</el-button>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="Headers" name="headers"></el-tab-pane>
                        <el-tab-pane label="Params" name="params"></el-tab-pane>
                        <el-tab-pane label="Body" name="body"></el-tab-pane>
                    </el-tabs>
                    <div class="table-wrap">
                        <el-table :data="tableList" v-if="!isBulkEdit">
                            <el-table-column prop="key" label="key">
                                <template slot-scope="{row}">
                                    <el-input v-model="row.key"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="value" label="value">
                                <template slot-scope="{row}">
                                    <el-input v-model="row.value"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="desc" label="描述">
                                <template slot-scope="{row}">
                                    <el-input v-model="row.desc"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="操作">
                                <template slot-scope="{row, $index}">
                                    <i class="el-icon-delete" @click='delParam($index)'></i>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="builk-edit-wrap" v-else>
                            <el-input v-model="bulkStr"
                            type="textarea" 
                            :autosize="{minRows: 5}" 
                            placeholder="请输入json格式的字符串"></el-input>
                            <div>{{errorTips}}</div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="描述:" prop="desc">
                    <el-input v-model="form.desc" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="comfirm">确定</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import http from './http'

export default {
    name: 'postmanSimple',
    props: {
      requestData: {
        type: [Object],
        default () {
          return {}
        }
      }
    },
    data () {
        return {
            form: {
                desc: '',
                url: '',
                method: 'get',
                headers: [
                    {
                        key: '',
                        value: '',
                        desc: ''
                    }
                ],
                params: [],
                body: []
            },
            rules: {
                url: [
                    { required: true, message: '' },
                ],
            },
            activeName: 'headers',
            tableList: [
            ],
            isBulkEdit: false,
            bulkStr: '',
            errorTips: ''
        }
    },
    watch: {
        bulkStr (v) {
            const isJson = this.isJSON(v)
            if (!isJson) {
                this.errorTips = '请输入符合json格式的字符串'
            } else {
                this.errorTips = ''
                const obj = JSON.parse(v)
                const tempArr = []
                for (let key  in obj) {
                    const _item = {
                        key: key,
                        value: obj[key],
                        desc: ''
                    }
                    tempArr.push(_item)
                }
                this.tableList = tempArr
                this.form[this.activeName] = this.tableList
            }
        }
    },
    mounted () {
        this.$nextTick(() => {
            Object.keys(this.form).forEach(key => {
                if (this.form.hasOwnProperty(key) && this.requestData[key]) {
                    this.form[key] = this.requestData[key];
                }
            });
            if (this.form.headers && this.form.headers.length > 0) {
                this.tableList = this.form.headers
            }
            if (this.form.url) {
                this.comfirm()
            }
        })
    },
    methods: {
        handleClick () {
            if (this.form[this.activeName].length == 0) {
                const _item = {
                    key: '',
                    value: '',
                    desc: ''
                }
                this.form[this.activeName].push(_item)
            }
            this.tableList = this.form[this.activeName]
        },
        addParam () {
            const _item = {
                key: '',
                value: '',
                desc: ''
            }
            this.tableList.push(_item)
        },
        delParam (index) {
            this.tableList.splice(index, 1)
        },
        bulkEdit () {
            this.isBulkEdit = !this.isBulkEdit
            this.bulkStr = JSON.stringify(this.arrToObj(this.tableList))
        },
        comfirm () {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    const headers = this.arrToObj(this.form.headers)
                    const params = this.arrToObj(this.form.params)
                    const data = this.arrToObj(this.form.body)
                    http({
                        method: this.form.method,
                        url: this.form.url,
                        headers: headers,
                        data: data,
                        params: params
                    }).then((res) => {
                        this.$emit('getData', 'success', this.form, res.data)
                    }).catch((err) => {
                        console.log(err)
                        this.$emit('getData', 'error', this.form, err)
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        arrToObj (arr) {
            const obj = {}
            if (arr && arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].key) {
                        obj[arr[i].key] = arr[i].value
                    }
                }
            }
            return obj
        },
        isJSON (str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str)
                    if (typeof obj == 'object' && obj) {
                        return true
                    } else {
                        return false
                    }
                } catch (e) {
                    return false
                }
            }
        },
    }
}
</script>
<style scoped>
.header-wrap .tips {
    font-size: 12px;
    margin-left: 20px;
    color: #faad14;
}
.operate-wrap {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
}
.operate-wrap .add {
    margin-right: 15px;
}
.builk-edit-wrap {
    max-width: 700px;
}
.builk-edit-wrap .el-textarea {
    font-size: 14px;
}
.table-wrap {
    min-height: 150px;
    max-height: 600px;
    overflow: auto;
}
</style>