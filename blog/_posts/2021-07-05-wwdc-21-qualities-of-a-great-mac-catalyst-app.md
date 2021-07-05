---
title: "WWDC21-10053-Qualities of a great Mac Catalyst app"
date: 2021-07-05 00:00 +0800
typora-root-url: ../.vuepress/public
typora-copy-images-to: ../.vuepress/public/assets/images/${filename}
---

Catalyst 这项技术是苹果于 2019 年的 WWDC 上推出的新技术，其目的在于让开发者能够很快的将一个 iPad App 转换成一个能够跑在 Mac 上的 App。三年来的积累也给这项技术带来了足够丰富的特性。那么，面对 Catalyst 中丰富的各种能力，如何才能让我们所创建的 App 在 Catalyst 下有更好的体验呢？在 [WWDC 21-10053-Qualities of a great Mac Catalyst app](https://wwdc.io/share/wwdc21/10053) 中，苹果的工程师向我们指明了一些我们在使用 Catalyst 过程中需要关注的点。

整个 Session 的内容主要分为如下三个部分展开：

- Migrate to Mac Catalyst：从整体视角上阐述了初次使用 Catalyst 时 App 会发生的变化，可以帮助作为开发者的我们从宏观角度上明确我们需要做的迁移工作
- Specific things you can do：从一些代码细节讲解了应该如何让我们的 App 在 Mac 上能够有更好的用户体验，这部分内容是本次 Session 中最主要的部分
- Distribution：主要提及了一发布环节些 Catalyst App 需要关注的一些信息，这部分内容相对较少也比较简单

那么接下来，让我们来逐一看看苹果工程师给我们的建议吧！

### Migrate to Mac Catalyst

虽然是整体视角，但是在这一部分苹果的工程师仍然提及了很多的细节点，这里我们将其拆分成两个部分，分别从开始迁移之前和迁移过程中两个角度进行阐述。

#### 在开始迁移之前需要关心的

##### 检查自己的 App 是否在 iPad 和 M1 Mac 上良好运行

“好的开始是成功的一半”。在我们准备将我们的 App 用 Catalyst 迁移到 Mac 之前，我们最好确认一下我们的 App 是否适配了 iPad 上的这些特性：

- [Multitasking](https://developer.apple.com/design/human-interface-guidelines/ios/system-capabilities/multitasking/)
- [UIMenuBuilder](https://developer.apple.com/documentation/uikit/uimenubuilder)
- Copy / Paste
- [Drag / Drop](https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/drag-and-drop/)

如果我们的 App 在 iPad 上很好的适配了这些 API，那么在 Mac 上我们的 App 会自动拥有这些能力：

- Multiple Window
- [App Menu Bar](https://developer.apple.com/design/human-interface-guidelines/macos/menus/menu-bar-menus/) / [Contextual Menu](https://developer.apple.com/design/human-interface-guidelines/macos/menus/contextual-menus/)
- Copy / Paste
- [Drag / Drop](https://developer.apple.com/design/human-interface-guidelines/macos/user-interaction/drag-and-drop/)

除此之外，如果我们手边还有 M1 的 Mac，我们也可以检验一下我们的 App 是否可以直接在没有任何修改的情况下运行在 M1 的 Mac 上。对应的，WWDC 21 中也有一个关于如何在 M1 上提高 App 质量的 [Session](https://developer.apple.com/videos/play/wwdc2021/10056/)，感兴趣的小伙伴可以看一看。

> 小 Tips：
>
> 为什么确认这两点对我们接下来的迁移工作非常重要？
>
> 我们可以发现 Multiple Window / App Menu Bar / Contextual Menu / Copy / Paste / Drag / Drop 这些特性对于一个 Mac App 来说是比较基本的能力，一些基于 Electron 的 App 可能在这些方面上就做的不够好，这可能也是我们觉得这种类型 Mac App “不好用” 的原因之一。
>
> 而能够在 M1 的 Mac 上无修改的运行，说明我们的 App 没有使用到一些在 Mac 上不存在的能力（例如 AR、陀螺仪等），这也能让我们的 App 在后续的适配过程中无需关注类似的问题。

##### 明确自己的 App 适合使用 Mac Idiom 还是 iPad Idiom

这可能是在整个适配过程中，作为开发者的我们要做出的最重要的决定了。

当我们在 Xcode 中利用 Catalyst 将 App 的迁移到 Mac 上时，我们可以从 “Scale Interface to Match iPad”（iPad Idiom）和 “Optimize Interface for Mac”（Mac Idiom）中进行选择： 

![](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213550617.png)

这两种 idiom 各有优劣，不过现在我们只需要记住整体的结论：

- iPad Idiom 适配的工作量更少，但是细节不足
- Mac Idiom 适配的工作量更多，但可以更好的打磨 Mac App 的细节

如果想知道这两种 idiom 的各自的一些细节，好进一步做出更准确的决断，可以回顾一下 [WWDC20 10056 - 美化 Mac Catalyst app](https://xiaozhuanlan.com/topic/9701235486) 中的内容😃。

#### 在迁移过程中需要关心的

##### 确保使用 Mac 上支持的能力

在迁移过程中，我们需要注意 Xcode 给出的编译时警告和错误，同时也需要关心运行时给出的异常信息。

例如，如果迁移后编译失败，我们首先需要检查的就是是否使用了一些标记为废弃的框架，我们需要将其替换成对应的新框架：

| Catalyst 上不可用的框架 | 应该迁移到的框架 |
| ----------------------- | ---------------- |
| UIViewView              | WKWebView        |
| AddressBook             | Contacts         |
| OpenGLES                | Metal            |

除此之外，第三方二进制库也可能会导致我们的 App 在 Catalyst 下编译失败，如果这些二进制库使用了 XCFrameworks，我们需要确保这些第三方二进制库在 XCFramework 中提供了针对 Mac 的二进制。

##### 关心 App 的生命周期

由于 Mac App 和 iPad App 的形态上有很多区别，因此，二者在生命周期上会有很多的不同点，主要体现在这几点：

| 不同点                                                        | 原因                                                                                                                                                                         | 解决方案                                                                                                          |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Window 的切换更依赖 SceneDelegate 而不是 AppDelegate 中的事件 | AppDelegate 原有的 API 设计不足以支撑多 Window 场景的复杂情况                                                                                                                | 更多的使用 SceneDelegate 而不是 AppDelegate 中的生命周期事件                                                      |
| SceneDelegate 中的 sceneDidEnterBackground 触发的更少         | 在 Mac 上只有当用户关闭或者最小化 Window 时，sceneDidEnterBackground 才会被触发，一个 Widnow 失焦时并不会触发该事件；与之对应的，iPad 上只要 Window 不可见，该事件就会被触发 | 如果 App 依赖该事件来做一些类似自动保存这样的功能，在 Mac 上需要使用 timer 来定时执行，以保证该功能能够正常的生效 |
| App 还处于前台运行状态但是没有一个 Scene 存在                 | 在 Mac 上 App 可以在前台运行但没有一个 Window（例如当我们关闭 Safari 的所有页面，但仍然可以在 MenuBar 中看到当前运行的 App 是 Safari）                                       | 在 Mac 上不要依赖 Scene 的数量来判定当前 App 是否处于前台                                                         |

##### 确保 App 提供各种分辨率下的图片

由于在 Mac 上我们的 App 可能会在各种分辨率下运行，因此我们有必要在 xcassets 中给我们的 App 提供 Mac 下的 1x 和 2x 图：

![](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213606327.png)

> Tips：
>
> 图中 xcassets 中的 iPad - Mac Scaled 是选择 iPad Idiom 时使用的图片，而底下的 Mac 则是使用 Mac Idiom 时会使用的图片

##### 确保 App 布局性能足够好以丝滑适配 Window 大小变化的情况

由于在 Mac 上，用户很可能会调整 App Window 的大小，因此我们需要关注 App 的布局性能，以保证 Window 大小在调整时不会有卡顿情况的发生。

##### 关注控件在 iPad 和 Mac 上的外观

当我们开启了 Mac Idiom 后，我们所使用的 UIControl 如果可能会以 Mac AppKit 风格的形式被展示出来。不过针对 button 和 slider，我们可以单独对其外观进行配置，以让其在 Mac 上不以 Mac 风格的控件展示（参见 [WWDC 21 - 10052 - What's new in Mac Catalyst - 支持在 Mac Idiom 下保持自定义的 button 和 slider 样式](https://www.yuque.com/docs/share/0cd4deb1-f0ae-4635-9cf5-4ba03558354d#Y6iAu)），尤其是针对 button，我们可以实现更多细节上的控制（参见 参见 [WWDC 21 - 10052 - What's new in Mac Catalyst - 更多的按钮样式](https://www.yuque.com/docs/share/0cd4deb1-f0ae-4635-9cf5-4ba03558354d#INjVT) ）

另外，考虑到 App 在 Mac 上的表现，我们在编写自定义控件的时候也需要更加谨慎，因为很多系统控件在 Mac Catalyst 环境下会渲染成适合 Mac 平台风格的控件（而这样的特性是自定义控件所没有的）。例如，UISwitch 在 `style` 属性被设置为 `checkbox` 时，配合仅在 `checkbox` style 下生效的 `title`  属性，我们就可以很快速的得到一个 CheckBox 控件（相比于 Switch，CheckBox 更符合 Mac 平台的风格）。

![](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213619095.png)

### Specific things you can do

讲解完了整体需要关注的点，我们再来看看细节上需要关注的内容。

#### 尽可能用 ChildView 替代 ModalPresentation 和 Popover

由于在 Mac 上 App 拥有更大的展示空间，所以如果 App 使用了很多 ModalPresentation 和 Popover 的方式来承载功能，那么在 Mac 上可以考虑将其用 ChildView 的形式进行展示：

![](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213628425.png)

#### 考虑到用户不能使用触摸板或者滚动时的场景

由于 Mac 上不是所有的设备都使用了触摸板（有一些鼠标甚至不支持滚动），因此 Pinch/Scroll 这些在 iPad 上非常基本的手势在 Mac 上不能得到百分百的支持。这种情况下，我们需要让我们的 App 中提供相应的按钮来完成这些手势本来要完成的功能。在这方面最典型的可能就是苹果自带的地图 App。在地图 App 中，旋转和缩放都可以仅通过鼠标来完成：

![](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213639069.png)

除此之外，让 Tap/Pan 手势与键盘快捷键进行组合也是一个不错的办法，例如在地图 App 中，我们可以通过按住 Shift 并在地图中摁住鼠标左键并上下拖动的方式，来快速的实现地图页面的缩放。

#### 增加对 MenuBar 和快捷键的支持

一个好的 Mac App 应该有很多的快捷键可以供用户使用，从 iOS 13 开始，开发者可以使用 UIResponder 的 [keyCommands](https://developer.apple.com/documentation/swiftui/uihostingcontroller/keycommands#) API 来为响应者链上的某个元素增加快捷键支持，同时也可以使用 UIMenuBuilder 这个 API 为 Mac App 增加顶部的 MenuBar 上的快捷键的支持。

> Tips：
>
> 快捷键的支持可以在 [WWDC 20 - 10109 - Support hardware keyboards in your app](https://developer.apple.com/videos/play/wwdc2020/10109/) 中了解具体使用方式；
>
> UIMenuBuilder 的使用方式可以在 [Adding Menus and Shortcuts to the Menu Bar and User Interface](https://developer.apple.com/documentation/uikit/uicommand/adding_menus_and_shortcuts_to_the_menu_bar_and_user_interface) 中了解具体使用方式；

在 iOS 15 之前，iPad 上的 [Shortcuts Overlay](https://support.apple.com/library/content/dam/edam/applecare/images/zh_CN/ipad/ipad/ipad-pro-2nd-gen-smart-keyboard-shortcuts.jpg)（就是长按 ⌘ 时页面出现的浮层），展示的是开发者在 UIResponder 的 keyCommands 中返回的 UIKeyCommand 对象所指定的快捷键：

![image-20210705213656350](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213656350.png)

在这种情况下，UIMenuBuilder 只能用来给 Mac Catalyst App 增加 Menu Bar 的支持而不能用来在 iPad 上展示快捷键，这不得不说一个比较割裂的设计。在 iOS 15 中，这个问题得到了解决，iPad 上会按照类似 Mac 上 MenuBar 的形式来展示 Shortcuts Overlay：

![image-20210705213708091](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213708091.png)

与此同时，需要注意的是，由于快捷键的实现是基于响应者链的，所以我们不应该修改整个响应者链体系（也就是说不要重写 `nextResponsder`）。如果确实一些功能需要不在响应者链中的对象来处理，可以使用 [target(forAction:withSender:)](https://developer.apple.com/documentation/uikit/uiresponder/1621146-target) 来实现：

```swift
final class MyView: UIView {
    override func target(forAction action: Selector, withSender sender: Any?) -> Any? {
        if action == #selector(Model.setAsFavorite(_:)) {
            return myModel
        } else {
            return super.target(forAction: action, withSender: sender)
        }
    }
}
```

另外，由于一些快捷键是否能够启用是和当前的 First Responder 有关的，如果我们的 App 有更多的 View 可以成为 First Responder，那么当用户选中或者聚焦在某些 View 上时，用户就能够使用更多的快捷键，所以如果能够让更多的 View 利用  [canBecomeFirstResponder](https://developer.apple.com/documentation/uikit/uiresponder/1621130-canbecomefirstresponder#) 和 [canBecomeFocused](https://developer.apple.com/documentation/uikit/uiview/1622584-canbecomefocused#) 响应用户的操作，对 App 的整体体验也是大有裨益的。更多的细节，可以参考 [WWDC 21 - 10260 - Focus on iPad keyboard navigation](https://developer.apple.com/videos/play/wwdc2021/10260)。

#### 使用 UIWindowScene 来处理 Mac 上的多 Window 场景

对 Mac App 来说，同时打开多个 Window 可能是非常常见的场景，但是对于大部分的 iOS App 来说，整个 App 生命周期中只需要关注一个  Window 即可。为了能够更好的处理 Mac 上的多 Window 场景，苹果的工程师建议我们使用 [UIWindowScene](https://developer.apple.com/documentation/uikit/uiwindowscene#) 来更好的处理这些 Window 之间的关联。

为了能够区分不同的 UIWindowScene，我们可以在 Info.plist 的 Application Scene Manifest 中通过给每一个 Scene 增加 Scene Configuration 来告诉系统一个 UIWindowScene 应该使用哪个类、哪个 Storyboard 以及哪个父类来初始化：

![](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213720573.png)

接下来，当我们需要展示一个新的 UIWindowScene 的时候，我们可以用 NSUserActivity 配合 UIApplication 的 `requestSceneSessionActivation(_:userActivity:options:errorHandler:)` 来创建一个新的 UIWindowScene。例如，我们可以在页面被双击的时候创建一个新的 viewDetail 类型的 UIWindowScene，同时将当前被点击的 item 的 ID 通过 userInfo 传入：

```swift
// Requesting a new scene
let viewDetailActivityType = "viewDetail"
let itemIDKey = "itemID"

final class MyView: UIView {
    @objc func viewDoubleClicked(_ sender: Any?) {
        let userActivity = NSUserActivity(activityType: viewDetailActivityType)
        userActivity.userInfo = [itemIDKey: selectedItem.itemID]
        UIApplication.shared.requestSceneSessionActivation(nil,
            userActivity: userActivity,
            options: nil,
            errorHandler: { error in //...
        })
    }
    //...
}
```

接下来，我们需要自己在 AppDelegate 中，实现对该 UserActivity 的响应。这里我们根据 NSUserActiviy.activityType 返回对应的 UISceneConfiguration ：

```swift
// Responding to a new scene request
let viewDetailActivityType = "viewDetail"

final class AppDelegate: UIApplicationDelegate {
    func application(_ application: UIApplication, 
        configurationForConnecting session: UISceneSession, 
        options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        if let activity = options.userActivities.first {
            if activity.activityType == viewDetailActivityType {
                return UISceneConfiguration(name: "DetailViewer", sessionRole:session.role)
            }
        }
        return UISceneConfiguration(name: "Default Configuration",
            sessionRole: session.role)
    }
    //...
}
```

接下来，我们需要在 SceneDelegate 中响应这个 NSUserActivity，将其中保存的 itemID 设置到当前的根视图控制器中：

```swift
// Setting item ID on new scene's root view controller
let itemIDKey = "itemID"

final class SceneDelegate: UIWindowSceneDelegate {
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession,
        options: UIScene.ConnectionOptions) {
        if let userActivity = connectionOptions.userActivities.first {
            if let itemId = userActivity.userInfo?[itemIDKey] as? ItemIDType {
               // Set item ID on new view controller
            }
        }
        //...
    }
    //...
```

利用 UISceneConfiguration，我们还可以让我们的 App 支持 [Restore State](https://developer.apple.com/design/human-interface-guidelines/macos/app-architecture/restoring-state/)。只要我们的 SceneDelegate 实现了 `stateRestorationActivity(for:)` 方法：

```swift
final class SceneDelegate: UIWindowSceneDelegate {
    func stateRestorationActivity(for scene: UIScene) -> NSUserActivity? {
        //...
    }
}
```

当 App 被退出时，系统会调用 `stateRestorationActivity(for:)` 方法，我们可以在其中返回一个 UIUserActivity 对象并在其中存储此时 App 的一些状态信息。并在下一次应用启动的时候，调用 AppDelegate 的 `application(_:configurationForConnecting:options:)` 方法。这样一来，我们就可以复用之前写好的创建新 UIWindowScene 的代码。

```swift
final class AppDelegate: UIApplicationDelegate {
    func application(_ application: UIApplication, 
        configurationForConnecting session: UISceneSession, 
        options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        //...
    }
}
```

更多详细的内容可以在 [WWDC 19 - 212 - Introducing Multiple Windows on iPad](https://developer.apple.com/videos/play/wwdc2019/212/) 查看（或者是查看 [WWDC 内参 - iPad 上的多窗口](https://xiaozhuanlan.com/topic/0342159876)）。

#### 确保 App 能够更好的分享数据

无论是在 Mac 还是在 iPhone/iPad 上，分享都是一个相对高频的操作。在 macOS Monterey 中，顶部的 Toolbar 上利用 NSSharingServicePicker 添加的分享按钮，能够自动使用当前 UIWindowScene 中返回的 UIActivityItemsConfiguration 来配置分享内容（Siri 的 Share This 功能使用的也是相同的 API）：

![](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213734104.png)

具体的实现方式为在 Scene 的根视图控制器中通过 `activityItemsConfiguration` 这个 API 来返回想要分享的内容：

```swift
final class RootViewController: UIViewController {
    override var activityItemsConfiguration: UIActivityItemsConfigurationReading? {
      get { UIActivityItemsConfiguration(objects: [image]) }
      //...
    }
}
```

除了使用 Toolbar 上的分享按钮，我们可能还会需要使用 Context Menu 来分享图片或者是其他的一些东西：

![](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213745914.png)

要实现这样的功能，我们除了要在 View 上实现 `activityItemsConfiguration`，还需要在页面被加载的时候，通过 `addInteraction ` 给当前的 View 增加 `UIContextMenuInteraction` 来增加对 Context Menu 的支持。

```swift
final class MyView: UIView {
    override var activityItemsConfiguration: UIActivityItemsConfigurationReading? {
      get { UIActivityItemsConfiguration(objects: images) }
      //...
    }

    func viewDidLoad() {
      let contextMenuInteraction = UIContextMenuInteraction(delegate: self)
      addInteraction(contextMenuInteraction)
    }
}
```

#### 确保 App 能够使用 “连续互通” 相机功能

如果 App 使用了 UITextView 来展示富文本内容，那么 App 就自动获得了使用 “[连续互通](https://support.apple.com/zh-cn/HT209037)” 来从 iPhone 或者 iPad 上导入图片的能力：

![](/assets/images/2021-07-05-wwdc-21-qualities-of-a-great-mac-catalyst-app/image-20210705213756173.png)

除此之外，我们也可以通过 UIPasteConfiguration 来给任意 View 增加 “连续互通” 的能力（通过这种方式也能给任意 View 同时在 Mac 和 iPad 上支持 Drag/Drop）：

```swift
final class MyView: UIView {
    override var pasteConfiguration: UIPasteConfiguration? {
      get { UIPasteConfiguration(forAcceptingClass: UIImage.self) }
      //...
    }

    func willMove(toWindow: UIWindow) {
       addInteraction(contextMenuInteraction)
    }

    override func paste(itemProviders: [NSItemProvider]) {
       for itemProvider in itemProviders {
            if itemProvider.canLoadObject(ofClass: UIImage.self) {
                if let image = try? await itemProvider.loadObject(ofClass:UIImage.self) {
                    insertImage(image)
                }          
                //...
```

### Distribution

在发布这部分，苹果工程师只是非常简单的提及了几个信息：

- Mac Catalyst App 和普通的 Mac App 一样，可以通过 Mac App Store、TestFlight、App Notarization 来发布
- 对于框架开发者，确保使用 XCFrameworks 来分发自己框架的二进制文件，以便让自己的分发产物可以支持各个平台
