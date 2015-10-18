/**
 * Created by Leon on 2015/9/10.
 */

module.exports = [
    {
        module: 'amazeui',
        desc: '前端UI框架',
        src: [
            './bower_components/amazeui/dist/css/amazeui.min.css',
            './bower_components/amazeui/dist/fonts/**',
            './bower_components/amazeui/dist/js/amazeui.min.js'
        ],
        base: './bower_components/amazeui/dist',
        dest: './statics/libs/amazeui'
    },
    {
        module: 'gridster',
        desc: '网格布局、拖拽插件',
        src: [
            './bower_components/gridster/dist/jquery.gridster.min.css',
            './bower_components/gridster/dist/jquery.gridster.min.js'
        ],
        dest: './statics/libs/gridster'
    },
    {
        module: 'jquery',
        desc: 'jquery',
        src: [
            './bower_components/jquery/dist/jquery.min.js'
        ],
        dest: './statics/libs/jquery'
    },
    {
        module: 'validator',
        desc: '验证工具',
        src: [
            './bower_components/validator-js/validator.min.js'
        ],
        dest: './statics/libs/validator'
    }
]
