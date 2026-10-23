# VBen v5.7.0 架构变形日志

## 移除

1. `apps/`保留`web-antdv-next`应用，其他应用均删除
2. 移除`.changeset`,`.github`,`./scripts/deploy`, `playground`目录
3. `package.json`
   - 将`antd`, `antdv-next`, `naive`, `tdesign`相关的script移除
   - 将`build:docker`脚本移除
   - 移除`changeset`相关的依赖
4. 移除文件`README.ja-JP.md`、`README.zh-CN.md`
5. 移除`docs/`目录
6. 移除`apps/web-antdv-next/src/views/demos`目录及相关路由
7. 移除`packages/effects/common-ui`模块下部分不用的组件
8. 移除`packages/effects/common-ui/src/ui/dashboard`目录
9. 移除`packages/styles`目录下`antd`, `antdv-next`, `naive`的样式重置目录
10. 移除项目中的dayjs及相关
11. 当前保留`apps/backend-mock`目录，用于页面查看，应用接入项目后端后可删除该mock目录，同时关闭`VITE_NITRO_MOCK`

## 调整

1. `package.json`仓库信息、名称、版本号、关键字等
2. `.vscode/launch.json` 修改信息
3. `vben-admin.code-workspace`移除删掉的工作空间信息，添加新增工作空间信息
4. `apps/web-antdv-next/src/router`移除部分路由，仅保留可能会用到的和不同类型场景的案例路由
5. 清空`apps/web-antdv-next/src/views/dashboard/analytics/index.vue`、`apps/web-antdv-next/src/views/dashboard/workspace/index.vue`的具体功能代码
6. `apps/web-antdv-next/src/locales/`目录下移除部分不需要的语言键值对
7. `web-antdv-next`改名为`web-admin`, 并更新`package.json`中的脚本代码
8. 移除应用中index.html文件中的百度统计代码

## 新增

1. `apps/web-system/`，规划是系统管理、权限管理等
