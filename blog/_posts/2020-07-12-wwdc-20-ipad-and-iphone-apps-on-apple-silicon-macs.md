---
title: "WWDC20-10114-iPad and iPhone apps on Apple Silicon Macs"
date: 2020-07-12 20:33 +0800
typora-root-url: ../.vuepress/public
typora-copy-images-to: ../.vuepress/public/assets/images/${filename}
tags: 
  - 青铜
  - Computer-Platform-iOS-Silicon
---

今年 WWDC 最为重磅的消息可能就是 Apple Silicon Mac——搭载着苹果自研芯片的 Mac。得益于 CPU 架构的统一，在 Mac上原生的运行 iPhone 或者 iPad App 似乎已经不是那么的遥不可及了。相信很多人都会好奇苹果将会用什么样的方式将这些移动设备上的 App 带到我们手中的 Mac 上。[Session 10114 iPad and iPhone apps on Apple Silicon Macs](https://developer.apple.com/videos/play/wwdc2020/10114/) 就是对这些疑问的一个统一回答。

<!--more-->

## 概述

简单来说，Session 10114 主要向我们传达了这几个信息：

- 运行方面：在不依赖 macOS 系统没有的 SDK 的前提下，所有的 iPhone/iPad App 在 Apple Silicon Mac 上都可以无需改动运行起来，只是很多地方看起来会不那么符合 macOS 风格，结合 Catalyst 会让我们的 App 在 macOS 上更好用
- 调试方面：调试运行在 Mac 上的 iPhone/iPad 的过程和在模拟器、真机上完全相同
- 发布方面：默认所有的 iPhone/iPad App 都可以发布到 Mac App Store，开发者可以选择手动关闭，同时像 Ad Hoc 或者企业分发这种 App Store 外的发布流程也和之前基本相同

接下来，我们来详细了解一下苹果的工程师都说了什么。

## 运行

在有 Apple Silicon Mac 之前，在 macOS 上我们一般会开发这四种类型的应用程序：

- Mac apps： 基于 AppKit 开发，比较老牌的一种开发方式
- Mac Catalyst apps：在 macOS Catalina 后才支持的开发方式，基于 UIKIt 开发
- Web Apps：基于前端技术栈开发，比较老牌的一种开发方式
- Games：基于 Metal 框架开发，相对比较新的一种开发方式

![image-20200712205637358](/assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712205637358.png)

得益于 Catalyst 在 macOS 上引入的 UIKit，在 Apple Silicon Mac 上，我们可以非常轻松的运行原本运行在 iPhone/iPad 上的 App。

![image-20200712210101406](/assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712210101406.png)

默认运行起来的这些 App 在很多方面上都可以获得类似 macOS App 的体验，包括：

- Standard window chrome（就是 Mac app 左上角的那三个按钮）
- Menu bar
- macOS app lifecycle
- Preferences panel
- Dock presence
- Dark Mode
- Open/save panels（CMD + O / CMD + S会打开的那个面板）
- Text behaviors
- Font and color panels
- Scroll bars
- Touch Bar
- Printing
- Alerts
- Drag and drop（和 iOS 上的类似，通过拖拽将一个 App 中的内容移动到另一个 App 中，参见 [Human Interface Guidelines - Drag and Drop](https://developer.apple.com/design/human-interface-guidelines/macos/user-interaction/drag-and-drop/)）

> 注意：
>
> 尽管以上这些内容是可以自动获得的，但仅仅有这些能力并不足以让一个 App 在 macOS 获得良好的体验，这些 App 仅仅是处于 “能用” 的状态。如果想要让 App 在 macOS 上“好用”，苹果的工程师建议我们使用 Catalyst 来优化 App 的体验。

不过获得以上这些体验的前提是，App 能够在 macOS 上正常的运行起来。

要想让 App 能够在 macOS 上正常的运行起来，开发者需要关注这几个方面的事情：

- App 没有依赖 macOS 上不存在的 API 或者是 SDK（包括系统的和第三方库的）
- App 没有依赖 macOS 缺失的功能
- App 没有依赖 Mac 所不具有的硬件能力

除此之外，在代码的健壮性上，开发者需要关注 iPhone/iPad App 在 Mac 上运行会有如下方面的不同：

- 硬件上的不同
- UI 上的不同
- 系统软件上的不同

### 硬件上的不同

硬件方面，苹果的工程师主要提及了三点不同：

- 鼠标与触摸事件的不同
- 环境传感器的不同
- 摄像头的不同

#### 鼠标与触摸事件的不同

在 iPhone/iPad 上用户输入都是以触摸为主，而 Mac 则是以鼠标键盘为主。macOS 会尽量将普通的点击等事件映射成对应的触摸事件。但如果 App 实现了一些自定义的触摸事件，那么开发者就需要自己测试一下自己的 App 在 Apple Silicon Mac 上是否表现正常。

#### 环境传感器的不同

iPhone/iPad 上都有着大量的环境传感器，例如加速剂、陀螺仪、GPS、磁力计、景深摄像头等，而在 Mac 上基本没有这些传感器。因此开发者要在代码做好没有这些传感器的对应处理。需要注意的是，没有传感器并不代表没有相应能力，例如在 Mac 上开发者依旧可以使用 CoreLocation 来获取设备当前的位置（只是不那么精确）。

#### 摄像头的不同

在 iPhone/iPad 上几乎所有的设备都拥有前置和后置摄像头，但是在 Mac 上这种假设并不一定成立。苹果的工程师建议开发者，用 [AVCaptureDevice.DiscoverySession](https://developer.apple.com/documentation/avfoundation/avcapturedevice/discoverysession) 这个 API 来获取摄像头设备的使用权限。

### UI 上的不同

在 macOS 中，很多系统控件的行为表现会和 iPhone/iPad 上不太一样，例如 Alert：

![image-20200712213344387](/assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712213344387.png)

所以 App 的代码中不要有任何类似假定系统控件弹出位置的代码，因为这些代码运行在 Mac 上时，会得到完全不同的结果。

同时注意，如果开发者的 iPad App 没有支持 [Multitasking](https://developer.apple.com/design/human-interface-guidelines/ios/system-capabilities/multitasking/)，会和 iPhone App 一样在 Apple Silicon Mac 上表现为一个不可以改变大小的窗口。

如果 iPad App 支持了 Multitasking，那么开发者需要保证布局代码足够的高效，以便用户在缩放窗口大小时能够得到流畅的体验。

### 系统软件上的不同

系统软件上的不同主要体现在两个方面：

- 文件系统
- 设备信息

#### 文件系统

和 iPhone/iPad App 不同，Mac App 可能被用户放置在任何一个地方，因此 App 的代码中不应该对 App Bundle 以及沙盒的位置做任何硬编码。

#### 设备信息

在 Mac 上，窗口的分辨率可能会有各种各样的变化，设备名称也可能有各种各样的变化，因此 App 内部不应该对设备的分辨率以及设备名称做任何假设（设备名称这一条 App 对应的后端服务也要注意，不要依赖设备名称）

## 调试

调试这部分可以讲述的东西不多，因为整体内容就可以用四个字来总结：完 全 一 致。不管是 Debug 的工作流，还是 Profile 的工作流，甚至单元测试的工作流都是完全一样的。

唯一值得一提的是，根据苹果工程师的说法，在 Apple Silicon Mac 上，使用 Xcode 打开 iOS 工程，在 Target 的 Destination Device 中会多一个 My Mac(Designed for iPad) 这样一个设备：

![image-20200712215659004](/assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712215659004.png)

选择这个设备，运行起来后就会看到这样的效果——没有模拟器，直接运行在 Mac 上的 iOS App：

![image-20200712220053235](/assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712220053235.png)



## 发布

如果说调试可以用四个字来形容，那么发布就可以用六个字来形容：基 本 完 全 一 致。

将 iPhone/iPad App 发布到 Mac App Store 的步骤和发布到 iOS App Store 的步骤是基本一致的，开发者需要做的就是同意新的开发者协议，然后把能够发布到 Mac 上的 App 勾选发布到 Mac 即可，整个过程就像是发布到一个新的设备类型一样。

![image-20200712221130312](/assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712221130312.png)

通过这种方式发布的 App 同样也可以使用 StoreKit 完成应用内购买、AppThing 以及 On-demand Resources 这些 iOS App Store 提供的功能，唯一有所区别的是，TestFlight 并不支持这种形式的 App。

同样的过程也体现在 Ad Hoc/Enterpirse/Development 发布的过程中，整个过程中开发者只要将 Mac 当做一个新的设备类型发布即可。

除此之外，在今年的晚些时候（熟悉的 Later in Summer），苹果还会提供一些新的开发者工具，帮助开发者更好的验证他们的 App 在 Apple Silicon Mac 上的表现。

## 总结

虽然形式非常不同，但是苹果 Catalyst + Apple Silicon Mac 的这套组合拳，让我不禁联想到了 IPad 早年推出的时可以运行 iPhone App 的操作。以成熟的生态带动一个不那么成熟的生态，进而创建/拉动一个新的生态。虽然现在只是一个开始，但说不定过几年再看我们会发现：

![image-20200712222100729](/assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712222100729.png)

