---
title: "WWDC20-10143-What's new in Mac Catalyst"
date: 2020/07/11
typora-root-url: ../.vuepress/public
typora-copy-images-to: ../.vuepress/public/assets/images/${filename}
level: basic
tags: 
  - 青铜
  - Computer-Platform-iOS-Cataclyst
---

[Mac Catalyst](https://developer.apple.com/mac-catalyst/) 是苹果在 2019 年的 WWDC 大会上宣布的一种新的技术，这种技术的目的是让我们能够非常简单的将已有的 iPad App 快速转为一个 macOS App。

这种技术的简单原理就是，在 macOS 上等价提供 UIKit 等 SDK 的 API 或者实现，让原本使用 UIKit 以及其他 iOS SDK 开发的 iPad App，在 macOS 上也能正常使用。.

这种技术推出后，有很多 App 就使用了这些技术来实现，例如大名鼎鼎的 [GoodNotes](https://apps.apple.com/cn/app/goodnotes-5/id1480793815?mt=12)、[PDF Viewer](https://apps.apple.com/cn/app/pdf-viewer-annotation-expert/id1475494784?mt=12) 等，少数派也有对这些 App 的一个实际 [测评](https://sspai.com/post/56926)，总体来看，这项技术是有很不错的实际价值的。那么今年 WWDC，苹果在这项技术上做了哪些更新呢？

<!--more-->

## Catalyst 有哪些更新？

简单来说，今年的 Catalyst 的更新算是一次比较常规的能力提升，主要体现在这几个方面：

- 更好的系统 SDK 兼容性
- 更多的 API 支持
- Optimized for Mac 方案
- 与 SwiftUI 的结合更为紧密
- Catalyst Extension 生命周期优化
- 开箱即用的 Universal Purchase
- 无缝对接的 macOS Big Sur 的样式变更

### 更好的系统 SDK 兼容性

> TLDR: 支持了更多 iOS SDK，同时提供了运行时代码隔离方案

在今年的 Catalyst 中，我们可以使用更多的 iOS SDK，他们包括：

![F5634243-4716-4387-AE10-E15B5CDEBE28](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/F5634243-4716-4387-AE10-E15B5CDEBE28.png)

尽管苹果的工程师做了很多的努力，但是在 macOS 依旧有很多 SDK 是无法使用的：

![90C83540-35CC-4679-AB60-BEB1AFC76315](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/90C83540-35CC-4679-AB60-BEB1AFC76315.png)

不过针对这些 SDK，在新的 Catalyst 中，开发者可以不再使用 targetEnvironment 来区分使用这些使用这些 SDK 的代码了，而是可以通过运行时判断的方式来让代码更具有可移植性。

例如 ARKit，在之前的 Catalyst 中，由于 macOS 并没有 ARKit，开发者们只能通过这种方式来区分代码：

![1586AFFF-C79E-43FD-AA81-380E04849EB0](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/1586AFFF-C79E-43FD-AA81-380E04849EB0.png)

现在，借助在 Catalyst 14.0 中新增的 [supported](https://developer.apple.com/documentation/arkit/arconfiguration/2923553-issupported) 属性，开发者可以不再使用 targetEnvironment 来区分代码了：

![D3848F3B-17E6-441D-920B-872911D27415](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/D3848F3B-17E6-441D-920B-872911D27415.png)

更多类似的判断性接口都会在苹果的 API 文档中体现，利用这些接口，我们就能写出更优雅的环境判断代码。

### 更多的 API 支持

> TLDR: 新的 Catalyst 中引入了一些新的 AppKit 的 API，同时原有的一些 UIKit 的 API 在 macOS 会有更好的表现

在 API 支持这一部分，苹果工程师提到两部分的 API 更新，一部分是在 Catalina 中就可以使用的，另一部分则是在 Big Sur 中才可以使用的。

我们先来看看在 Catalina 中就可以使用的这部分 API，主要包括：

- [pressBegan](https://developer.apple.com/documentation/uikit/uiresponder/1621134-pressesbegan) 和 [pressEnded](https://developer.apple.com/documentation/uikit/uiresponder/1621128-pressesended) 这两个方法的 [UIPress](https://developer.apple.com/documentation/uikit/uipress) 参数在 Catalyst 13.4 支持了 [key](https://developer.apple.com/documentation/uikit/uipress/3526315-key) 这个属性，让我们可以在响应者链中处理来自键盘的 press 事件，更多详细的内容可以参见 [Session 10094 Support hardware keyboards in your app](https://developer.apple.com/videos/play/wwdc2020/10094/) 
- 在 tvOS 被广泛使用的 [Focus Engine](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppleTV_PG/WorkingwiththeAppleTVRemote.html)（可以简单理解为在 tvOS 上决定哪个控件是当前用户选中的控件的事件体系） 现在在 Catalyst 中也可以被使用，使用 Focus Engine 可以更好的辅助用户用键盘操作基于 Catalyst 的 App
- 来自 AppKit 的[NSCursor](https://developer.apple.com/documentation/appkit/nscursor?language=objc)，使用 NSCursor ，开发者就可以控制 macOS 上光标的行为，例如利用 [hide](https://developer.apple.com/documentation/appkit/nscursor/1527345-hide) 或者 [unhide](https://developer.apple.com/documentation/appkit/nscursor/1532996-unhide) 在播放视频是隐藏或者显示光标，或者是利用 [image](https://developer.apple.com/documentation/appkit/nscursor/1527062-image) 属性来修改光标的样式

接下来是在 Big Sur 中才可以使用的这部分 API，主要包括：

[UITablView.selectionFollowsFocus](https://developer.apple.com/documentation/uikit/uitableview/3573921-selectionfollowsfocus?language=objc) 和 [UICollectionView.selectionFollowsFocus](https://developer.apple.com/documentation/uikit/uicollectionview/3573920-selectionfollowsfocus) 让用户在TableView 和 CollectionView 的 Cell 之间使用键盘的上下键来切换当前选中的 Cell：

![move cell](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/move-cell.gif)

使用 [UISceneActivationRequestOptions.collectionJoinBehavior](https://developer.apple.com/documentation/uikit/uisceneactivationrequestoptions/3623235-collectionjoinbehavior) 可以改变用户尝试创建新的 Tab 时的默认行为，目前提供了四种行为：

![C1860D6A-9CF2-47BB-9E9E-8B7300C8CAA8](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/C1860D6A-9CF2-47BB-9E9E-8B7300C8CAA8.png)

使用在 iOS 14 上新增的 UIColorWell 和 UIColorPickerViewController，可以分别在 iOS 和 macOS 上展示对应平台的默认样式：

![image-20200712141630858](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712141630858.png)

得益于 iPadOS 14 与 macOS Big Sur 在整体样式上的统一，原本可能样式完全不同的 UIKit 组件在 macOS 下也有了更好的表现，例如现在在 iOS 14、iPadOS 14 上日期选择器有了如下的变化：

![image-20200712142041633](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712142041633.png)

原本我们所习惯的 ActionSheet 也变成了 Pull Down Menu 的形式：

![image-20200712142301808](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712142301808.png)

而在 API 上，iOS 14 也为所有的 UIButton 添加了非常方便的展示 Pull Down Menu 的 API—— [init(frame: CGRect, primaryAction: UIAction?)](https://developer.apple.com/documentation/uikit/uibutton/3600349-init)，使用了这个 API 的 UIButton 在 macOS Big Sur 上也能得到良好的表现：

![image-20200712143035029](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712143035029.png)

如果想知道更多的类似这样的 UIControl 的变化，可以查看 [Session 10205 Design with iOS pickers, menus and actions](https://developer.apple.com/wwdc20/10205)。

另外，在 Big Sur 中，开发者所弹出的 ModalViewController 以及 PopoverPresentationController 都将会以独立的 Window 形式存在。这意味着，我们通过 `prensentViewController:animated` 所弹出的 ModalViewController 在 macOS 是可以单独被拉伸缩放窗口大小的：

![2020-07-12 15-17-39.2020-07-12 15_18_30](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/ModalViewController.gif)

而我们弹出的 PopoverPresentationController 的内容也可以拓展到主 Window 之外：

![image-20200712152054631](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712152054631.png)

另外，在 macOS Big Sur 中，Catalyst 对 SF Symbols 有了更好的支持，开发者可以完全放心的使用几乎所有的 SF Symbols 的功能。

### Optimized for Mac 方案

> TLDR: Optimized for Mac 可以让基于 Catalyst 技术的 App 在类似文字大小、排版布局、控件映射等方面获得更好的体验 

由于 iOS/iPadOS 上默认文字是 17pt， 而 macOS 则是 13pt， Catalyst 会将 iPad App 中的文字在 macOS 中缩放为原来的 77%，苹果将解决类似这种排版布局问题的方案称之为 Scaled to mach iPad。

这种方式会导致在 macOS 上的 iPad App 看起来和 iPad 上不太一样。为了解决这些问题，今年的 Catalyst 给出了 Optimized for Mac 这样一个新的方案，基本思路是通过底层优化让 iPad App 在 iPadOS 和 macOS 上有相同的表现。

![image-20200712161333929](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712161333929.png)

由于这部分内容相对比较多，因此苹果工程师开启了一个专门的 Session （[Session 10056 Optimize the interface of your Mac Catalyst app](https://developer.apple.com/wwdc20/10056)）来讲解其中的内容。我们的专栏中也针对该部分内容做了相应总结，参见 [WWDC20 10056 - 美化 Mac Catalyst app](https://xiaozhuanlan.com/topic/9701235486)。

### 与 SwiftUI 的结合更为紧密

> TDLR: 基于 Catalyst 的 App 在 SwiftUI 中获得了更多的支持

作为苹果跨平台开发的排头兵，SwiftUI 对 macOS 平台和 iOS、iPadOS 上特性功能的支持度很大程度上影响了他本身的开发体验。

在如今的 SwiftUI 中，开发者可以使用到更多的和平台相关的能力。

例如，如今在 SwiftUI 中开发者可以设置 App 的菜单栏：

![img](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/8157560cly1gg63nqbb6qj20qo0f0af1.jpg)

同时也可以设置之前 SwiftUI 所不支持的 Toolbar：

![img](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/8157560cly1gg63nqzqulj20qo0f045t.jpg)

更多的内容可以参见 [Session 10041 What's new in SwiftUI](https://developer.apple.com/videos/play/wwdc2020/10041/?time=3)，对应的小专栏文章为 [WWDC20 - What's new in SwiftUI](https://xiaozhuanlan.com/topic/0389615274)

### Catalyst Extension 生命周期优化

> TLDR: Catalyst 支持了 Photo Editing Extension，同时在用户退出 Extension 的时候不会立马关闭

在之前的 Catalyst 技术中，针对 iOS 的很多 Extension 是不能在 macOS 上被使用的。而如今，Photo Editing Extension 可以被 Catalyst 技术带到 macOS 中使用。

除此之外，Catalyst Extension 的生命周期相对于之前也有所变化。当用户不再使用 Extension 时，Extension 不会立马进入 Not Running 状态，而是会先进入 Suspended 状态。当用户再次使用的时候，Extension 会恢复到 In Use 状态。同时，在 macOS 上 Extension 还获得了更为贴近 iOS 的内存限制（在之前的 Catalyst 中基本对内存没有太多的限制）。能够看出 Catalyst 在尽力让 macOS 上的 iPad App 与运行在 iPadOS 中的状态更为贴近。

![image-20200712172555306](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712172555306.png)

### 开箱即用的 Universal Purchase 

> TLDR: 所有基于 Catalyst 的 App 默认都支持 Universal Purchase，不过开发者也可以关掉这项优化，让 macOS App 和 iOS/iPadOS App 分别付费。

Universal Purchase 是苹果在 2020 年初推出的一项面向开发者的新能力，通过这项能力，用户在开发者任意一个苹果平台的应用内购买都可以在其他苹果平台中使用。

如果开发者不想使用这一能力，只要在 Xcode 中将 "Use iOS Bundle identifier" 选项关闭即可。

![image-20200712174836489](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712174836489.png)

如果开发者是目前开发的 macOS App 并不是基于 Catalyst 开发的，或者开发的 Catalyst App 是面向 Catalina 开发的，那么可以参照  [Offering Universal Purchase](https://developer.apple.com/support/universal-purchase/) 的文档来完成 Universal Purchase 的设置。

### 无缝对接的 macOS Big Sur 的样式变更

> TLDR: 看到今年 macOS 和 iOS 系统十分相似的新 UI 了吗？这些变动就是来帮助 Catalyst 的，大部分的样式变更 Catalyst 都会帮你处理的十分完美的。

我们举几个例子，首先我们可以来看看 Toobar 的新样式：

![image-20200712175532895](/assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712175532895.png)

这些所有的 Toolbar 新样式，在 Catalyst 中都可以通过 [UITitleBar.toolbarStyles](https://developer.apple.com/documentation/uikit/uititlebar/3604076-toolbarstyle) 来设置，并且这个设置由于是在 UIWindowScene 上的，因此我们也可以针对每一个 Window 设置不同的 Toolbar 样式。

如果想知道更多的类似这种的细节信息，可以查阅 [Session 10104 Adopt the new look of macOS](https://developer.apple.com/videos/play/wwdc2020/10104/)

## 一些个人想法

由于个人目前日常的工作内容集中在 Flutter 上，所以能够明显感受出在跨平台这条路上，苹果和谷歌走出了不同的路径。

谷歌的 Flutter 的目的是，同样一套代码，在各个平台都有完全一致性的表现，相对来说可能更追求代码的完全复用。

而苹果的 Catalyst 的目的是，同样一套代码，在各个平台拥有各个平台各自的特定的表现，代码复用率则是一个其次的目标。

之前就听不少开发 macOS App 的朋友吐槽 AppKit 多么的老掉牙，多么的难用，现在看来，苹果可能更倾向于让开发者都使用 Catalyst 这种技术来开发新的 macOS App。这一点从 Session 的数量对比就可以管中窥豹：

近两年 WWDC 和 AppKit 相关的 Session 只有 [一个](https://developer.apple.com/wwdc19/210)，并且在开头还着重的强调了一下如果你是一个从零开发的 App，建议使用 Catalyst 来构建你的 macOS应用。与此作为对比，近两年直接和 Catalyst 相关的 Session 就有五个之多，更不要提及 macOS Big Sur 那长得越来越 iOS 的新面孔了。在加上有 SwiftUI 的加持，可以看出苹果已经在跨苹果平台开发这条路上走的越来越坚实了。

如果你已经开发了一个很不错的 iPad App，那么，也许现在是一个把他搬到 macOS 上的好时候了！

