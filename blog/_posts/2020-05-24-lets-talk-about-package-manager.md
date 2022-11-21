---
title: 包管理器的前世今生
date: 2020/05/24
typora-root-url: ../.vuepress/public
typora-copy-images-to: ../.vuepress/public/assets/images/${filename}
tags: 
  - 白银
  - Computer-Tools-PackageManager
---

本文来自于一次内部分享，主要针对 Cocoapods、Homebrew、Gem 这一类十分相似的包管理器进行了对比和研究，尝试从一个更高维度、更抽象的层面去汇总这些包管理器的内部思路。

<!--more-->

## 为什么想写这篇文章？

相信很多 iOS 开发同学一开始接触 Cocoapods 都会看到这两个最基本的命令：

```shell
pod install
pod update
```

然后当我们入门一点儿 Ruby，开始使用 Gem 和 Bundler 之后，我们就会接触到这些命令：

```shell
gem install
gem update
bundle install
bundle update
```

![image-20200524230704416](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524230704416.jpg)

此时问题就来了：

- bundle 和 gem 以及 pod 都有 install 和 update，他们做的事情是一样的么？
- 为什么 Ruby 的世界中存在 bundle 和 gem 这两个命令，而 pod 只有一个命令？

上面的两个问题，第二个问题在 [为什么我们要使用 RVM / Bundler](https://forelax.space/why-we-use-rvm-and-bundler/) 已经解答了，那么第一个问题，我们就慢慢的从包管理器的定义以及历史说起：

![image-20200524231228993](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524231228993.jpg)

## 包管理器的定义

根据维基百科的定义：

> A **package manager** or **package management system** is a collection of software tools that automates the process of **installing**, **upgrading**, **configuring**, and **removing** computer programs for a computer's operating system in a consistent manner.

简单来说，一个包管理器是一个负责**自动化**在操作系统中**安装、升级、配置、移除过程**的软件集合。Cocoapods、Gem 以及 Bundler 其实都符合这个定义，只不过不同的是，Bundler 是基于 Gem 的扩充，有点类似 Yarn 和 Npm 的关系。

## 包管理器的历史

包管理器的历史也比较悠久，下面这张图对我们日常能够用到的包管理器做了一个简单的时间线上的梳理：

![image-20200524234657906](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524234657906.jpg)

可以看到，从 1994 年开始，包管理器就在程序员的世界里发挥着他的作用了。

最开始的 dpkg 、rpn、apt 以及再稍微晚一点的 MacPorts、yum 这些包管理器，他们都属于 “系统” 范畴的包管理器，也就是说他们安装的 “包” 都是针对当前系统的。而再晚一点的 Gem、Bundler、npm、Cocoapods、Carthage 则就是针对某个语言或者某个工程了，他们属于 “语言” 或者说 “工程” 范畴的包管理器。

![image-20200525001010157](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525001010157.jpg)

额外再多做一点小调查的话，我们可以看到我们用的比较多的这几个包管理器中的 “包” 的数量依次为（2018 年的数据）：

![image-20200524235221535](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524235221535.jpg)

从包的数量就可以看出，JS 社区的高活跃度，带来了各种第三方包数量上的绝对优势。

## 包管理器的通用概念

不管是哪个包管理器，由于他们的基本功能无外乎 安装、配置、更新、移除 这四个任务，因此他们都会有这样一些通用的概念：

![image-20200524235838804](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524235838804.jpg)

如上图所示，对于一个包管理器来说，他们一般都会有一个 Client 存在于我们的开发机上，同时在某个服务器上还会有一个 Registry 存在。

对于 Client 来说，他的工作就是根据本地我们所编写的 Manifest 文件，分析依赖，然后去请求 Registry 上面的信息，然后根据 Registry 上面存储的信息，下载下来 Package。一般来说，Package 会带有两部分的内容，分别为 Package 的元信息，也就是 Meta ，包括版本号、包名称等；以及这个 Package 对应的 Code。

### 欢迎来到 Cocoapods 的世界

那么对于 Cocoapods 来说，上面这些概念映射下来就是：

![image-20200525000224004](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525000224004.jpg)

可以看到，pod 命令对应了 Client，Podfile 则对应了 Manifest 文件，Pod Repo 对应了 Registry，而 Package 则对应了 Pod。

看完了整体上的逻辑，我们 再来看看 Cocoapods 细节上的逻辑。

首先第一步，当我们执行了 `pod install` 这个命令以后，pod cli 首先会在本地的 Local Repo 中去查找 Podfile 中出现的 podspec 的定义，然后进行进一步的依赖分析以确定每个 pod 的具体版本号。

Cocoapods 的 Loca Repo 其实就是将远端的 Repo 用 Git 直接拉下来的（当然在最新的 Cocoapods 中，由于开源库所使用的 Master Remote Repo 过慢等问题，已经替换成 CDN 而非一个 Git 仓库）。当我们执行 `pod update` 或者 `pod install --repo-update` 的时候 pod cli 就会去更新这个 Local Repo。

![image-20200525064848126](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525064848126.jpg)

在完成本地 Repo 的搜索后，Cocopaods 就会得到一堆解析好的依赖版本。

![image-20200525085235211](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525085235211.jpg)

接下来，Cocoapods 就会用这些解析好的依赖版本以及从 Local Repo 获取到的元信息，利用他自己的 Downloader 从远端去下载代码。

![image-20200525085547135](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525085547135.jpg)

从远端 Git 仓库下载下来的代码会首先被 Cocoapods 放置在他的缓存目录中，也就是 `~/Library/Caches/CocoaPods/` 目录。然后在 pod install 剩余的过程中 Cocoapods 会将这些代码拷贝到 Pods 目录下。

![image-20200525085916282](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525085916282.jpg)

接下来的过程就是 Cocoapods 相对比较独特的部分了。由于 Xcode 使用 xcproj 文件来组织所有的代码，因此 Cocoapods 需要针对这些移动到 Pods Dir 中的代码针对性的在 Pods.xcporj 中创建 Target，然后将他们用一个 Pods-Target 整体打包并和原本的 xcproj 关联，也就是 Cocoapods 概念中的 User Target。

![image-20200525090823652](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525090823652.jpg)



![image-20200525090845400](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525090845400.jpg)

### 再来到 Gem 和 Bundler 的世界

首先我们继续来看看前面所说的通用概念在 Gem 和 Bundler 中的对应映射。

![image-20200525092217724](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525092217724.jpg)

如果要和 Cocoapods 对比一下的话，就是如下的名词对比：

![image-20200525092415348](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525092415348.jpg)

由于 Gem 和 Bundler 是 Ruby 这门语言的包管理器，因此在实际实现上，他会和 Cocoapods 有所不同。

对于每个 Ruby 脚本来说，当代码中出现了 `requrie`时，Ruby 会从系统的 $LOAD_PATH 中尝试去查找 `require `所要求的 Ruby 脚本。 例如，当我们执行了 `require 'cocoapods'` 时，Ruby 就会从 LOAD_PATH 中的目录中尝试查找 cocoapods.rb。

![image-20200525092803452](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525092803452.jpg)

### 最后再来了解一下 Homebrew

有了前面的通用概念，我们再去理解 Homerbrew 的时候，看到他的那些名词可能就比较好理解了。

![image-20200525093009196](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525093009196.jpg)

由于 Homebrew 是一个 “系统” 包管理器，因此他基本没有根据 Manifest 解析依赖的过程，而是直接去安装一个个的依赖。不得不说，从 Homebrew 所使用的这些名词本意来说，Homebrew 的命名还是很有趣的：

- Homebrew - 家酿酒
- Tap - 水龙头，对应的概念是之前提到的 Registry，我们可以从这个地方获得酒
- Cellar - 地窖，酒窖，这个地方就是专门存储我们获取到的酒的，也就是我们下载的包的内容都会放在这里
- Formula - 配方，用配方来指代包的元信息是十分贴切的
- Keg - 小桶的酒，Homebrew 用这个来指代源码发布的包
- Bottle - 瓶装酒，Homebrew 用这个来指代二进制发布的包
- Cask - 大酒桶装的酒，Homebrew 用这个来指代以 App 形式发布的包

最后来看一下，Keg / Bottle / Cask 实际的样子到底是什么样子的：

![image-20200525093847249](/assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525093847249.jpg)
