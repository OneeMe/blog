---
title: WWDC18-401-What's new in Xcode11
date: 2018-06-25 00:37 +0800
typora-root-url: ../.vuepress/public
typora-copy-images-to: ../.vuepress/public/assets/images/${filename}
tags: 
  - 青铜
  - 计算机-工具-IDE-Xcode
---


此次 Xcode 11 的更新，总体来说还是有不少让人兴奋的新特性的，了解这些新特性也对我们日常工作会有很大帮助，我们首先来整体看看都有哪些~~主要~~我们大概率会用得到的特性：

- Xcode 11 中重新设计了 Assistant Editor 和 Version Editor 的使用方式，将这两个 Editor 切换按钮从最上层的工具栏中移除，使用起来更人性化一些。
- 原本在 Xcode 中，我们最多只能同时在一个屏幕中看两个文件的代码，现在利用 Xcode 11 中的分屏功能，我们可以任意在同一屏幕中拆分出不同的部分来看代码，借用喵神的话说就是："大屏用户的福音！想不到 Xcode 也能有今天"
- Xcode 11 拥有了和 Sublime、Visual Studio Code 一样的 Source Minimap 了，并且在功能上要青出于蓝而胜于蓝
- Xcode 11 集成了对 Swift Package Manager (SPM)  的支持，并且，**全平台可用！**
- Xcode 11 丰富了对于 git 的支持，例如我们现在可以在 Xcode 中执行 cherry-pick 了
- Xcode 11 中的 StoryBoard 的编辑页面中，增加了对 Dark Mode 的 UI 的预览功能
- 当我们想测试 App 在弱网条件下的表现时，我们无需再借助开发者选项或者 Xcode 的 Additional Tools，可以直接在 Xcode 11 中设置
- Xcode 11 提供的模拟器改成基于 Metal 构建后性能大大提升。同时得益于 watchOS 的升级，开启 watch 的模拟器的时候不需要先打开一个 iPhone 的模拟器了。

以上是本次 Session 的一个概览，更多的细节，我们将会根据  Session 的分类，在如下几个小节中仔细过一遍：

## Workflow Update

### Version Editor

在 Xcode 10 中，我们可以通过 Xcode 顶部工具栏的 Assistant Editor 和 Version Editor 按钮来分别完成比较基础的多文件查看功能和版本控制功能：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/adc5c10f44a2b4221ba1bb5bc9453112.png)

但之前的 Version Editor 的功能相对来说实在有些简单，我们只能查看两个文件之间的 Diff，而在 Xcode 11 中，我们可以通过使用隐藏在 Inspector 中的 History Inspector 来查看当前文件相关的 git 提交记录。例如，在某个工程中我们一共有三个提交，而在每个文件的 History Inspector 中，我们只会看到和当前文件的提交记录：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/22324c3ae154659b593351be21ff4c2e.png)

同时在 Hsitory Inpspector 中，我们也可以针对某一个 Commit 执行更为丰富的操作：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/1d8a0b3e3d7444f4394492136108e7b4.png)

经过这样一番设计，原本的 Version Editor 其实已经名不副实了(因为大部分 Version 相关的功能都被迁移到了 History Inspector 中)，为了适应这个变化，Xcode 11 中将原本的 Version Editor 按钮重命名为 Code Review：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/b5086d022c718238d598482c3d013f41.png)

### Assistant Editor 

在 Xcode 11 之前，Assistant Editor 是一个工具栏按钮，这也意味着，这个按钮的功能是针对当前 Window 生效的。例如，我们可能会在编辑 StoryBoard 的时候，打开 Assistant Editor，但当我们想要去编辑一个 .xcassets 文件时，由于 .xcassets 并没有对应的 Assistant Editor，我们就会看到 Xcode 显示出 "No Assistant Result" 的场景：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/0e2337990b7977f0541a50390320a95b.png)

在 Xcode 11 中，Assistant Editor 从工具栏中被移除，和原本 Version Editor 中的 Authors 功能一起来到了他们的新家：Editor Options

![](/assets/images/2018-06-25-what-is-new-in-xcode11/cb286e0ea220fe5a91df404158fd5ed0.png)

这样一来，Xcode 对**不同类型的文件（不是不同的文件）**就会打开不同的 Editor，而 Editor 之间的 Editor Options 是相互独立的，也就是说，在 Xcode 11 中，如果我们针对源码文件的 Editor 开启了 Authors 功能或者 Assistant 功能，在我们打开 StoryBoard 的时候是不会看到 Authors 或者 Assistant 界面的。我们再也不会为一不小心打开一个 StoryBoard 文件的 Authors 界面而感到懊悔了。

### Add Editor

作为开发者，如果我们非常幸运的拥有了一块儿特别大的屏幕，我们一定会尝试一件事：在屏幕上尽可能的同时展示多个代码文件。在 Xcode 11 之前，我们只能在打开的 Assistant Editor 中，通过点击右上角的 Add Assistant Editor 按钮，在 Assistant Editor 中纵向增加一个新的  Assistant Editor。这个功能对于拥有大屏幕的同学来可能说可能过于简单：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/d6e6e0fd2a9e50eca5155ab8358e4819.png)

而现在，在 Xcode 11 中，我们可以通过 Add Editor 这个功能，自由的上下左右随意的增加新的 Editor 界面。来看看拥有大屏幕的喵神的杰作：

![喵神的微博原图](/assets/images/2018-06-25-what-is-new-in-xcode11/a7b4466b3f38e347da1e98266ea747ae.jpg)

Add Editor 按钮位于 Editor Options 按钮的旁边，默认状态下是在右边添加新的 Editor，当我们按住 Option 的时候就可以切换成在下方添加新的 Editor。

![](/assets/images/2018-06-25-what-is-new-in-xcode11/2c82dbb306a7db3642061244063ec7c8.png)

> 来自作者的吐槽  (╯-_-)╯~╩╩
>
> Beta 版中 Add Editor 还是很容易被玩儿坏的，例如当我数次点击 Add Editor 后，Xcode 就变成了这个样子：
>
> ![](/assets/images/2018-06-25-what-is-new-in-xcode11/2021e5a20a770ae403d38b5cb2ad0dd2.png)
>
> 同时注意，Ediotr 的关闭快捷键并不是 Command + W，而是 Control + Option + Command + W (好难按)，所以当作者在 Happy 的打开了多个 Editor 并下意识的按了一下 Command + W 之后，一脸懵逼的发现整个窗口被关闭了。(在 Visual Studio Code、Sublime、IntelliJ 中完成类似分屏操作后，Command + W 的作用都是关闭当前选中的 Editor 而不是关闭整个窗口)

### Destination Chooser

在 Xcode 11 中，我们不仅能够使用 Add Editor 按钮增加新的 Editor ，还能够利用 Destination Chooser 来打开新的 Editor 或者替换已有的 Editor，方法是按住 Shift + Option 后，点击左侧 Project Navigator 中的某一个文件，Destination Chooser 就会出现，我们可以使用上下左右键或者是鼠标来控制他，然后使用 Return 键来决定我们选中的文件的最终归宿或者是按 Esc 来退出。我们可以通过下面这个简单的演示视频来一览究竟：

<video id="video" controls="" preload="none" style="width: 100%;" src="/assets/videos/what-is-new-in-xcode11/Jietu20190609-131701-HD.mp4"></video>

### Focus Mode

当我们打开了很多个 Editor 的时候，如果我们想专注于某个 Editor 中的内容，我们也可以将某个 Editor 设置为 Focus Mode(也就是将某个 Editor 最大化)：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/fbd83486ed380b680c0bac57ff0ba3db.gif)

### Source Minimap

此次 Xcode 11 中，还加入了早已在 Sublime 和 Visual Studio Code 中存在很久的 Source Minimap 中，不过令人惊喜的地方在于，Xcode 11 中加入的 Source Minimap 针对源码文件有了更加细致的展示，例如，如果我们在 Swift 中使用 `// MARK: ` 来为代码做分段，那么 `// MARK: `后面的内容在 Source Minimap 中会放大展示出来：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/db5d43c2202dccda44009ba9add25e8f.png)

同时当我们把光标放到 Source Minimap 上时，还可以看到当前光标指向部分的方法摘要信息(Session 中苹果工程师展示的是 Swift 源文件，但经过实际测试，OC 源文件和 Markdown 文件也支持显示这个摘要信息)：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/99f3c15307472041127ddd350bf4d560.png)

> 来自作者的小提示 (￣▽￣)~*
>
> 如果我们把光标放到 Source Minimap 的同时按住 Command 键，我们还会看到 Source Minimap 展示出来当前文件的所有摘要信息：
> ![](/assets/images/2018-06-25-what-is-new-in-xcode11/af6646c62f4d7d364a28cd32c084ff46.png)

除此之外，Source Minimap 还有其他的一些细节，例如当我们在搜索的时候，Xcode 会在 Source Minimap 中着重显示搜索命中文字。当我们添加了新的断点， Xcode 也会在 Source Minimap 中着重显示断点所在的位置。

### Source Code Edit Enhanced

在源码编辑方面，Xcode 11 也提供了更为强大的一些功能，这里举出来一些 Session 中提到的例子。

首先，Edit all in Scrope 功能也能修改注释中的变量了，这能够让我们的代码和注释能够保持更好的一致性(相信注释和实现不一致的代码绝对会让大多数人抓狂)

![](/assets/images/2018-06-25-what-is-new-in-xcode11/67992ca203cdafd8b729bc12397f4974.png)

另外，当我们给方法增加了参数以后，Add Document 这个 action 也可以帮助我们在注释中补充上新的参数：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/143d5717f258fd7622dda52135889065.gif)

Xcode 11 的代码补全能力也增加了不少，比如现在，我们所输入的编译指令 Xcode 也会为我们提供代码补全：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/edbae94d7fea2533126a483797dfe93c.png)

同时代码补全也支持了枚举值的补全：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/32f46c217b63fb8e97d93238242eb3dd.png)

Session 中苹果工程师表示，这些只是他们对代码补全的一部分提升内容。更多的补全优化，需当们自己实际上手用 Xcode 11 ，就会有更加深刻的体会。

## Swift Package Manager (SPM)

SPM 是在 2016 年随着 Swift 3 一起发布的，至今已经三年了，而在此之前，我们很少会使用他的一个根本原因就在于：SPM 并不支持 iOS 平台。终于，在 Xcode 11 中我们可以在 Apple 所有平台上使用 SPM 了，并且 Xcode 11 也内置了 SPM，并在 File -> Swift Package Manager 中提供了一些基本的 SPM 的操作：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/a907eb41f11bc2329db9557190e9e2da.png)

除了在这里添加 Package，我们也可以在 Project 面板中添加新的 Package：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/c181609b47fc6357dcb493679a2b6b9c.png)

然后我们就会看到这样的一个面板（需要在 Xocde 中登录 Github、Bitbucket 或者 Gitlab 的账号）：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/55125372c753be358bd8083b29a8161b.png)

> 来自作者的吐槽  (╯-_-)╯~╩╩
>
> 这个增加新 Package 的面板中，最顶部的输入框在作者这里完全无法使用，输入一个 Swift Package 的名称以后，就开始了无限转菊花。而输入仓库地址则是完全没有反应。
>
> 更神奇的是下方展示出来的这些 Repo，这些 Repo 是 Xcode 是获取了最近 30 个 Xcode 登录的账户中 star 的仓库后，按照字母排序展示出来的，并且不管这些 Repo 是否是一个包含 Swift Package 的 Repo，都会在这里被展示出来 =。=可以说，如果我们最近 star 了很多和 Swift 完全无关的 Repo，那么这个面板就完全没有什么作用了
>
> emm......考虑到这是 beta 版，忍了忍了。

这里我们选择先 star 一个 Swift 的 [Example Package](https://github.com/apple/example-package-playingcard.git")，然后在 Xcode 选中他，一通 Next 后，我们就看到了这样的界面：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/e6598e21e5c418199d8b7f975492e422.png)

好了，这下我们可以愉快的在我们的项目中使用新加入的 Swift Package 中的代码了~

> 来自作者的小提示 (￣▽￣)~*
>
> 现在在 Xcode 11 中，也可以直接创建一个新的 Swift Package 了：
>
> ![](/assets/images/2018-06-25-what-is-new-in-xcode11/33def192bf933817071e62cb1b1c6559.png)
>
> 如果想知道关于 Xcode 11 中 SPM 的更多信息，也可以查看如下三个 Session：
>
> - [Session 408:Adopting Swift Packages in Xcode](https://developer.apple.com/videos/play/wwdc2019/408/)
> - [Session 410:Creating Swift Packages](https://developer.apple.com/videos/play/wwdc2019/410/)
> - [Session 416:Binary Frameworks in Swift](https://developer.apple.com/videos/play/wwdc2019/416/)

不过总的来说，如果不算全平台支持这一点，当前 Xcode 11 对 SPM 的支持只能说还比较初级(可以参考一下 Xcode 中首次对 git 所支持的那些炒鸡简单的功能)，能用，但是不好用 >,<

## Source Control

Xcode 在这一部分没有太多的亮点，毕竟，大部分人都会使用 Source Tree 或者命令行来操作 git。不过我们还是来看看 Xcode 都更新了哪些内容。

首先，Xcode 11 也提供了 Inline Diff 功能：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/e70422b59a112468ea8410bec2ad70ef.gif)

其次，Xcode 11 中我们可以执行 Stash 了：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/04973c212adb7501c2c50acd2e5263d0.png)

然后在 Xcode 11 中，Source Control Navigator 的 git commit 历史可以执行 cherry-pick 了：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/2b97c8f8f70027c57aeb0460f30e815b.png)

## Design Tools

关于设计工具，Xcode 首先在 StoryBoard 中增加了对 Dark Mode 的预览支持：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/a333db43b30f6a27411b95b3d9f20694.png)

同时如果你的 iOS App 打开了对 Mac 设备的支持，还可以在 StoryBoard 的预览中查看当前 UI 在 macOS 上的表现：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/e938db60ddfd1b6c8aca097567ab1b35.png)

Xcode 11 也增加了对苹果最新推出的 SF Symbols 的支持，我们可以通过 Library 增加新的 SF Symbols：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/74f5110aa7f4f3a2e226d94a74897bdd.png)

同时也可以在 Inspector 中设置 SF Symbols 的各种属性：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/40e5407d05810276ee2c80e9fe6423b3.png)

为了能让我们更好的适配 Dark Mode，Xcode 11 中的 .xcasset 文件现在可以针对 Dark Mode 增加特定的图片和颜色了：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/98f8e900065e2ba97b3ac8d2c4fe2473.png)

在 Xcode 11 中，我们可以利用 Debug 面板中新的 Environment Overrides 选项来在运行时更新模拟器或者真机的一些行为（包括是否是 Dark Mode，系统设置的字体大小等等），方便我们在调试的时候看效果。

![](/assets/images/2018-06-25-what-is-new-in-xcode11/c1236fe77454d5af91a25281ac620f3f.png)

## Debug

在 Xcode 11 之前，如果我们想在真机中模拟弱网或者模拟设备在高温、低温等极端条件下的运行情况，我们需要求助于设置选项中的开发者选项或者额外安装 Xcode 的 Additional Tools，操作起来相对比较麻烦。在  Xcode 11 中，我们可以通过 Devices 界面中的 Device Conditions 面板，在 Xcode 中操作这一切：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/bca5a23999320a7a2433a3b9f9638f4f.png)

当我们使用了 Deviece Conditions 功能后，在设备的左上角会显示一个特殊的图标，我们可以通过点击来查看当前 Device Conditions 的状态：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/a5c0d99c3e9a4c55c37175121ceb3a60.png)

同时当我们断开调试应用和 Xcode 连接以后，这些调试选项就会自动关闭，再也不需要费劲的去开发者设置中关掉调试选项了~

## Testing

关于测试，Xcode 11 中引入了新的 TestPlan 的概念。在之前的 Xcode 中，我们如果想要执行测试，就只能 Command  + U 来很直接的执行测试。但当我们有很多比较类似的测试的时候，这种方式就显得不太够用了，比如说，我们想针对语言设置为中文、英文、法文的三种设备分别执行测试，在 Xcode 11 之前，我们只能分别在三个设备上，分别执行一次测试。这当然显得非常麻烦。而在 Xcode 11 中，我们可以通过创建一个 .testplan 的文件，在其中设置各种各样的测试参数，然后一次性的完成测试：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/55ff15b156545c4fb9f351daaa535b34.png)

> 来自作者的小提示 (￣▽￣)~*
>
> 想了解更多关于 Xcode 11 中 Testplan 的内容，可以参考：
>
> - [Session 413:Testing in Xcode](https://developer.apple.com/videos/play/wwdc2019/413/)

## Simulator

首先， Xcode 11 中的 watchOS 不再需要先打开 iPhone 的模拟器就可以独立跑了。

其次，之前的模拟器由于使用 OpenGL 来执行绘制，因此非常占用 CPU。在 Xcode 11 中，由于模拟器是基于 Metal 构建的，因此模拟器上的 Metal 应用会执行的非常流畅，同时模拟器上的 UIKit 的效率也会提升。那么效率提升了多少呢？Session 中的工程师骄傲的表示：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/560b0691e987387b869854520510b9e6.png)

## Instruments

Xcode 11 中，Instruments 中的每个 Track 现在可以分层次和分类展示了：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/c8f53b1bcbad2876170b6001c280f709.png)

同时也增加了针对 SwiftUI 的模板：

![](/assets/images/2018-06-25-what-is-new-in-xcode11/a75c50f39c57a309322f38bb15f09c7e.png)

## SwiftUI

严格的来说，此次 Session 并没有将任何关于 SwiftUI 比较实质的东西，在 Session 的最后两分钟，苹果的工程师提及了 SwiftUI，并表示 Xcode 11 针对 SwiftUI，在代码编辑、调试以及预览方面做了很多事情，然后告诉我们，SwiftUI 就是未来，SwiftUI 很好很 Nice，大家都来写 SwiftUI 吧。更像是一种态度的表达而非内容的输出。
