/**
 * Created by huangxiaogang on 16/12/26.
 * 视图渲染工具类
 */
const path = require('path');
const fs = require('fs');
let { staticConfigs } = global._appConfig;
const STATIC_RESOURCE_NAME = "staticResource";

let {
        staticResourceConfigURL,
        staticResourceURL,
        devResourceURL
    } = staticConfigs;

/**
 * 提供给ejs模板渲染的函数
 * 类似于后端以前的velocity getURL
 */
let MethodNameSpace = {

    getURL : (tagName)=>{
        var resourceName = '';
        //开发环境的静态始终拿本地
        if(process.env['NODE_ENV'] == 'dev'){
            resourceName =  devResourceURL + tagName;
        }else {
            //test:beta ==> 如果本地调线上，则只需要
            try {
                let staticJson = require('../../utils/index')['getResourceJSON']();
                resourceName = staticJson[tagName]
            } catch (err) {
                global.log_info(err);
                //加载本地静态资源
                resourceName = devResourceURL + tagName;
            }
        }
        global.log_info(`using  resource ${resourceName}`);
        return resourceName;
    }
};
/**
 * 基本工具类
 */
let addTemplate = function(source,tagOption){
    return Object.assign(source,tagOption)
};
let addConst = function(source){
    return Object.assign(source,staticConfigs,{datacollectUrl:''})
};
let addMethods = function(source){
    return source.MethodNameSpace = MethodNameSpace
};
module.exports = {
    addMethods,
    addTemplate,
    addConst
};