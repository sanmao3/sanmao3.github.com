### NPM命令
查看npm版本
```
npm -v
```
更新npm
```
npm install -g npm
```
卸载
```
npm uninstall <package>
```
如需从 package.json 文件中删除依赖，需要在命令后添加参数 --save
```
npm uninstall --save lodash
npm uninstall --save-dev <package>
```
更新
```
npm update <package>              #更新局部模块
npm update -g <package>           #更新全局模块
npm update -g <package>@version   #更新全局模块指定版本
```
其它命令
```
npm view <package> versions #查看包的所有版本
npm i vue@2.0.0 --save      #安装指定版本
npm root                    #查看本地安装的目录
npm root -g                 #查看全局安装的目录
npm info package            #查看包信息
npm ls                      #查看本地安装包
npm ls -g                   #查看全局安装包，包含依赖
npm ls -g --depth 0         #查看全局安装包，不包含依赖
npm outdated                #列出所有不是最新版的包，可以带参数
npm cache clean             #清除本地缓存
npm config ls -l            #查看npm配置
npm publish                 #发布包
npm access                  #设置发布包的访问级别
npm search modulNmae        #搜索包是否存在
```

### 淘宝镜像代理
临时使用
```
npm --registry https://registry.npm.taobao.org install express
```
永久使用
```
npm config set registry https://registry.npm.taobao.org
```
配置CNPM，npm访问官方，cnpm访问代理
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
恢复使用
```
npm config set registry https://registry.npmjs.org
```
验证设置
```
npm info express
or
npm config get registry
```