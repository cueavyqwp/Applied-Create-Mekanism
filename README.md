<div align = "center" >
    <h1>Applied Create & Mekanism</h1>

![标题](kubejs\assets\kubejs\textures\title.png)

*标题使用[MinecraftTitleGenerator](https://github.com/ewanhowell5195/MinecraftTitleGenerator)制作*

</div>

# 关于

**目前还处于早期开发阶段**

这是一个 `1.21.1` `NeoForge` 下的以`通用机械`与`机械动力`为主的整合包

## 附带的枪包

以下是整合包附带的枪包的原链接

[【TACZ】BlueArchive FPS Pack JP](https://www.curseforge.com/minecraft/customization/taczbluearchive-fps-pack-jp) by skylake1008

[[TaCZ]Blue Archive super gun pack](https://www.curseforge.com/minecraft/customization/tacz-blue-archive-super-gun-pack) by Chuila_Hinata

[[TaCZ]Create Armorer](https://www.curseforge.com/minecraft/customization/tacz-create-armorer-koei) by Koei

[[TaCZ]Immersive Armorer](https://www.curseforge.com/minecraft/customization/tacz-immersive-armorer-koei) by Koei

# 打包

## 前置工作

你需要 `Python`>=3.12 与 `VSCode`(可选)

### 下载源码

点击[这里](https://github.com/cueavyqwp/Applied-Create-Mekanism/archive/refs/heads/main.zip)下载

### 安装游戏

安装一个`1.21.1`版本的`NeoForge`客户端,命名为`Applied Create & Mekanism`

### 覆盖文件

把下载的源码解压覆盖到安装的游戏文件夹

确保你开启了版本隔离

### VSCode

然后在当前游戏文件夹打开VSCode

## 更新模组列表

使用`PCL2`导出整合包

注意先读取配置`export_config.txt`然后再导出

运行`info.py`来更新`modrinth.index.json`

## 打包客户端

运行`pack.py`

打包后的压缩包在`dist`文件夹下

## 打包服务端

运行`pack-server.py`

打包后的压缩包在`dist`文件夹下
