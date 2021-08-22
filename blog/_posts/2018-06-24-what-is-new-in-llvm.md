---
title: WWDC18-409-What's new in LLVM
date: 2018-06-24 00:37 +0800
typora-root-url: ../.vuepress/public
typora-copy-images-to: ../.vuepress/public/assets/images/${filename}
tags: 
  - 青铜
  - 计算机-工具-Compiler
---

## 一分钟速读

如果你日常写的比较多的，是业务代码，而非底层的基础库，那么此次 LLVM 的更新你可以基本不看，因为他对你的日常开发不会有太多改变，最多是你会发现 Xcode 变得更加严格了——原来正常的代码出现了新的编译器警告。来简单过一下此次 LLVM 的更新内容：

1. Xcode 10 的 ARC 支持在 C 结构体中直接使用 Objective-C 的对象指针
2. Xcode  10 增加了 100+ 个编译器诊断(Compiler Diagnostic)，你在写代码的时候可能会看到更多的 warning 警告
3. Xcode 10 的静态检查器新增了对 GCD 不当使用以及自动释放池变量不当使用的检查，同时提升了性能，优化了 Xcode 中 Analyze 后的界面展示方式
4. LLVM 编译器通过自动添加一些防御性代码，帮助你防范掉「Stack Buffer Overflow」和 「Stack Clash」两个二进制相关的安全漏洞
5. Xcode 10 中，你可以针对 iMac Pro / iPhone X / iPhone 8 / iPhone 8 Plus 这几款具有新 CPU 指令集扩展的设备进行针对性的优化，这些优化有的是需要自己写针对性的平台代码来实现，有的则是编译器自动帮你实现 。

## 在开始之前，我们再来回顾一下 LLVM 是什么

[LLVM](http://llvm.org)  是包括 Clang、LLDB、LLVM Core 在内的一系列编译器相关的项目的总称。这个项目的主要意义，就是在 GNU 的 GCC 体系之外，创建一套新的编译器以及相关工具的体系，让 Xcode 或者其他工具能够更好的集成进来。我们可以认为，我们的 OC / Swift 代码从编写到 Xcode 为我们生成最终的二进制代码中间的所有的过程，都离不开 LLVM 。即便你对编译器等相关知识不是那么熟悉，也应该记住我们如今习以为常的 ARC ，就是利用 LLVM 实现的。LLVM 的不断迭代，可以为我们带来：

1. 更简洁的编程体验（如 ARC）
2. 更全面的编译期错误检查
3. 更全面的静态分析
4. 更快的编译速度
5. 更高效的二进制代码

## 『What's new in LLVM』 具体讲了什么？

### Updates on ARC

在 Xcode 10 之前，如果我们在 C 的结构体中使用对象指针，编译器会毫不留情的给出我们一个红彤彤的错误警告：

![](/assets/images/2018-06-24-what-is-new-in-llvm/a9c58a651a9da1f1bfc475cf919455ff.jpg)

根据 [Clang 的 ARC 文档](https://clang.llvm.org/docs/AutomaticReferenceCounting.html#ownership-qualified-fields-of-structs-and-unions) 以及 2011 年的 [WWDC Session 323](https://download.developer.apple.com/wwdc_2011/adc_on_itunes__wwdc11_sessions__pdf/323_intro_to_arc_304repeat.pdf) 第 21 页，在之前的 ARC 代码中禁止 C 结构体中使用对象指针，是因为 ARC 要求编译器在编译期就知道结构体中对象指针的引用的变化情况。而在当时，这并不好实现。所以当时苹果的工程师直接建议大家使用类而不是结构体。也有 [SO 上的热心网友](https://stackoverflow.com/questions/14784973/fixing-arc-error-when-using-objective-c-object-in-struct)表示我们可以用 `__unsafe_unretained` 来去掉编译错误。也就是明确告诉编译器，这个对象指针的生命周期你不用管了，我们开发者来管。

现在，我们终于可以像 Swift 一样，在结构体中快乐的声明对象指针，同时避免了自己管理指针引用的担忧，因为对象的 `retain` 和` release`编译器都会自动帮我们完成：

![](/assets/images/2018-06-24-what-is-new-in-llvm/93949a6594a4f27282e40f9dce508965.jpg)

不过需要注意的是，如果我们用动态内存分配的方式使用结构体，我们仍然需要自己去手动将对象指针置为 nil:

![](/assets/images/2018-06-24-what-is-new-in-llvm/d3c2fe636661a1a60ebec4b818e462cc.jpg)

最后再来说说我个人认为这个变化给我们编程上带来的改变：

我们可以声明一些『轻量』的模型。比如我们有一非常简单的模型对象，就不用很麻烦的声明一个类，而是用一个结构体迅速解决战斗。虽然这里的结构体并不能像 Swift 中的结构体那样强大，但毕竟是一个进步。

**最后需要注意的是，带有对象指针的结构体，是不能引入到 Swift 中的。**

### New Diagnostics in Xcode 10

这一部分对我们最大的影响，就是我们在写代码的时候可以看到更多的编译警告了 😂。苹果的工程师宣称这一次他们增加了 100+ 个代码诊断项，以帮助我们写出更有质量的代码。在 Session 中，他挑了两个主要的诊断作为演示。

#### Swift and Objective-C Interoperability

我们知道，当我们想在 OC 的代码中使用 Swift 代码时，需要为 Swift 代码生成一个头文件。但是 Swift 有许多语言特性是 OC 没有的。比如逃逸闭包（Escape Closure）。所以 OC 就增加了` NS_NOESCAPE`这个宏来做兼容。

在 Xcode 10 之前，如果 OC 代码遵从了 Swift 协议又没有正确声明 `NS_NOESCAPE`，Xcode 不会给出任何提示，现在如果你这么做，Xcode 会告诉你，你需要把 block 声明为 `NS_NOESCAPE`的：

![](/assets/images/2018-06-24-what-is-new-in-llvm/3d142d1cc62d13d638b14c19cb079221.jpg)

#### Packing Struct Members with #pragma pack

这个新的检查项比较简单，一般来说如果我们声明结构体又有[字节对齐](https://zh.wikipedia.org/wiki/数据结构对齐)的需要时，会使用 `#pragma pack (push, 1)` 以及 `#pragma pack (pop)` 来实现。这两个 pragma 一般是成对出现的。在 Xcode 10 中，如果你没有成对使用它们，编译器就会给出警告：

![](/assets/images/2018-06-24-what-is-new-in-llvm/36b3f9539bbcf0a04e915e48aa33ae23.jpg)

### Clang Static Analyzer

静态检查器和编译诊断不同，静态检查需要我们手动的执行 Product -> Analyze 才能看到结果。在这一部分，苹果的工程师表示，我们努力了一年，为大家带来了两个新的静态检查， 同时优化了界面展示效果并提升了静态检查的性能。

#### Grand Central Dispatch performance anti-pattern

所谓 anti-pattern（反模式），一般指的是哪些乍一眼看上去还 OK ，但是实际运行起来往往得不偿失没有益处的代码编写模式。一个典型的例子莫过于『单例模式』，当大家滥用单例模式以后，单例模式就成了反模式。

而在使用 GCD 的过程中也有一种不太好的模式，我们先来看下面一段代码：

```objc
+ (NSString *)requestCurrentTaskName {
    __block NSString *taskName = nil;
    dispatch_semaphore_t sema = dispatch_semaphore_create(0);
    NSXPCConnection *connection =
    [[NSXPCConnection alloc] initWithServiceName:@"MyConnection"];
    id remoteObjectProxy = connection.remoteObjectProxy;
    [remoteObjectProxy requestCurrentTaskName:^(NSString *task) {
        taskName = task;
        dispatch_semaphore_signal(sema);
    }];
    dispatch_semaphore_wait(
                            sema,
                            dispatch_time(DISPATCH_TIME_NOW, 100)
                            );
    return taskName;
}
```

乍一看，这段代码好像没有什么问题，我们使用信号量来保证当前方法在异步获取到 taskName 之后才会返回。然后仔细推敲一下，这段代码是有问题的：

1. 当前线程在等待另外一个异步线程结束，而这个异步线程一般是优先级比较低的线程，因此就出现了优先级高的线程等待优先级低的线程这种优先级逆转的不合理现象。
2. 新建了一个线程，并使用了锁，产生了多余的线程间交互的成本

Xcode 10 会帮我们检查出来这样的问题代码，并给与我们善意的提醒：

![](/assets/images/2018-06-24-what-is-new-in-llvm/89d6b6281b61faa511771d89e1ad344d.jpg)

那这段代码应该如何改正呢？

一种方法是如果当前的返回值是同步的，就使用同步版本的底层 API：

![](/assets/images/2018-06-24-what-is-new-in-llvm/628bb5c16606fd603cfee4e5eea7a053.jpg)

另外一种是，将当前的方法风格改为异步回调风格：

![](/assets/images/2018-06-24-what-is-new-in-llvm/12e8f3acac46b1e95eba2aad6f2d593d.jpg)

#### Autoreleasing variables outliving autorelease pool

我们都知道，在 `@autoreleasepool` 中的对象会在离开 `@autoreleasepool`作用域后释放。Xcode 10 新增了静态检查器帮助查出来哪些在 `@autoreleasepool` 以外访问变量地址的问题代码。

比如我们有这样的错误代码：

![](/assets/images/2018-06-24-what-is-new-in-llvm/cc4406c268852f61f54ad76b2f5f3eba.jpg)

error 在执行完当前方法后就会被释放，而此时如果外界去访问 error 对象，就会喜闻乐见了 Boom —— 发生 crash 。Xcode  10 的静态检查器可以帮我们在编译器就检查出来这样的问题。

#### Improved Performance and Report Visualizations

在这一部分，苹果的工程师表示，Xcode 10 上的静态检查器在同样的时间内，平均比 Xcode 9 多检查出来 15% 的问题。

同时他们也优化了问题复现路径的展示，去掉了一些不必要的路径。比如在 Xcode 9 中一个检查结果会这么展示：

   ![](/assets/images/2018-06-24-what-is-new-in-llvm/2f9ca65862d8dcd585f27982d1213f47.jpg)

而在 Xcode 10 中就会仅展示关键的部分：

![](/assets/images/2018-06-24-what-is-new-in-llvm/ab90b3c4f2bd4c74b5030f32cdd994c0.jpg)

### Increased Security

这一部分的内容可能绝大多数 iOS 开发者都不太会关心，除非是做底层安全防护的的开发者。

#### Stack Protector

Stack Protector 这个特性，主要是为了防护 [Stack Buffer Overflow](https://en.wikipedia.org/wiki/Stack_buffer_overflow) Attack。什么意思呢？我尽量用简单的语言解释一下。

假设我们有一个 `dlog`函数，接收一个字符串作为参数。当调用` dlog`函数时，CPU 会先在内存上记录一下当前的函数地址，也就是红色的 Return Address，然后根据 `dlog`的局部变量的大小分配对应的栈。

![](/assets/images/2018-06-24-what-is-new-in-llvm/9702066a102dec614736849d5b380840.jpg)

假如，我们的 `dlog`函数中有一个类似 `strcpy`这样能够写内存的方法，并把函数的参数作为参数，那么，这里就可能会出现一个安全漏洞：Return Address 可能会被改写。

![](/assets/images/2018-06-24-what-is-new-in-llvm/67cb06c3d7936b027b3e7c625d3aca75.jpg)

别有用心的攻击者只要将传入的参数的 length 设置为大于 buffer 长度的字符，就可以改写 Return Address 的值，进而控制当前函数执行结束后，下一个调用的函数地址。

![](/assets/images/2018-06-24-what-is-new-in-llvm/822219e4485f7d092be99a58acca3b96.jpg)

一般代码编写者在编写的过程中，需要自己去注意这个问题，写对应的判断逻辑，避免预期之外的内存写入：

![](/assets/images/2018-06-24-what-is-new-in-llvm/5f511c5cb79c30a494a08209780f10c7.jpg)

而苹果工程师表示他们在编译器层面给出了解决方案。他们在 Return Address 和栈之间增加一个中间区域，叫做 canary，然后自动的在 return 之前检查一下 canary 是否被写入内容，如果写入，就利用 `abort()`当前程序的执行，阻止攻击者的攻击。

 ![](/assets/images/2018-06-24-what-is-new-in-llvm/75b4a378c38ecaaec6ebe50c48d78fd7.jpg)

#### Stack Checking

上一部分的漏洞主要是攻击者利用 Stack Buffer Overflow 来进行攻击，而这一部分则是利用 Stack Clash 来进行攻击。该漏洞的影响可以参考 [2017-06-20 的这篇信息安全新闻](https://www.ithome.com.tw/news/115015)。同时 StackExchange  论坛也有关于此的[讨论](https://askubuntu.com/questions/927188/what-is-stack-clash-and-what-can-i-do-about-it)。

简单来说，假如我们在栈上为局部变量分配了过多的内存，操作系统就会将堆进行分页：

![](/assets/images/2018-06-24-what-is-new-in-llvm/2c0e01cd6120b9527d2612919ff7c3e0.jpg)

如果这个局部变量足够大，那么最终分页后的栈就有可能一直占用到其他的内存空间，比如堆，攻击者就可以利用这一点去改写其他内存空间上的内容：

![](/assets/images/2018-06-24-what-is-new-in-llvm/e403abd402417c669119079d7642b582.jpg)

而苹果的工程师表示，他们的解决方案是，自动在局部变量分配前插入检查代码，如果局部变量会让栈覆盖到其他的内存空间，就利用 `abort()`终止应用的执行。

![](/assets/images/2018-06-24-what-is-new-in-llvm/537ad795ccd3cef9c62d5c35442ffe42.jpg)

### New Instruction Set Extensions

终于来到了最后一部分，在这一部分中，苹果的工程师告诉我们，新的 Xcode 中的 LLVM 编译出的代码支持了新的指令集扩展(Instruction Set Extension)，这些扩展可以帮助你在 iMac Pro / iPhone X / iPhone 8 / iPhone 8 Plus 发挥出更好的性能。

#### New Vector Extension: AVX-512

第一部分的扩展内容，是对 Intel 的 [AVX-512](https://www.intel.cn/content/www/cn/zh/architecture-and-technology/avx-512-overview.html) 扩展的支持，这个扩展简单来说，就是在 Intel 的至强(Xeon)处理器上，我们可以使用最大 512 bit 的向量来提升计算密集型工作的效率。

在 Xcode 的 build settings 中， 有一个叫做 `Enable Additional Vector Extensions` 的选项，可能我们大部分人都不会注意到：

![](/assets/images/2018-06-24-what-is-new-in-llvm/d975c3f30143b94a5b942d5fbeb1009d.jpg)

通过这个选项，你可以针对某些特定架构的机器，编译出支持特定指令集扩展的代码。比如我们这里可以针对 iMac Pro 编译出支持 AVX-512 指令集扩展的代码。

那么，用 AVX-512 意义是什么呢？不严谨的说，我们可以把向量的大小类比成 CPU 的字长，64 位的 CPU 在效率上是优于 32 位的。而越大的向量，在并行计算的时候也就越有效率。由于深度学习的的基本原理就是将现实问题向量化，并通过并行计算获得最优解，所以在 iMac Pro 上，你可以利用这一点，让你的深度学习模型学习的更有效率。不过需要注意的是，这是对 CPU 的提升，现在的深度学习应该还是主要用 GPU 来做学习运算的，其具体意义，可以参考知乎网友的[讨论](https://www.zhihu.com/question/51649408) 以及这篇[博客](http://linuxperformance.top/index.php/archives/94/)

不管意义如何，毕竟 Xcode 增加了新特性，我们用用也没有坏处，那么，我们应该如何在代码中用上这个新特性呢？大体来说，需要两步：

1. 利用  `__attribute__`声明针对某个架构的方法
2. 引入带有 512 bit 向量的头文件，在我们声明的方法中，使用这个向量

![](/assets/images/2018-06-24-what-is-new-in-llvm/d23480274e41c14f2ed35bc95857ff12.jpg)

除此之外，苹果工程师还给出了三个使用建议：

1. 只在 AVX-512 的方法之间传递 512 bit 的大向量
2. 注意 AVX-512 向量的字节对齐问题
3. 使用 Accelerate.framework 

#### ARM v8.1 Atomics 

在这一部分，苹果的工程师表示，对于那些使用了 A11 处理器的新机器，他们的 CPU 拥有了更多的核心，同时也就允许开发者使用更多的线程，而线程之间又可能会有更多的沟通需求，于是他们让 Xcode 10 编译出来的代码使用  A11 处理器上的 ARM v8.1 Atomics 这个指令集扩展的特性。

这个特性简单来说，就是利用了 A11 处理器上的新的原子指令，让原来需要四个甚至更多条指令才能完成的工作现在只需要一条指令就可以完成。详情可以参见 [ARM 社区网友的问答](https://community.arm.com/processors/f/discussions/8772/v8-2-atomic-instructions)。

这个特性并不需要我们手动的去指定，LLVM 会自动根据平台编译出合适的代码。对我们的影响，可能就是我们用 GCD 或者 pthread 等 API 写出来的线程同步代码，在  iPhone X / iPhone 8 / iPhone 8Plus 上会跑的更有效率一些。

#### ARM v8.2 Float 16

这个特性相比来说就更简单了，在 iPhone X / iPhone 8 / iPhone 8Plus 上，除了单精度浮点数(Float) 和双精度浮点数(Double)，我们还可以使用[半精度浮点数(Half)](https://en.wikipedia.org/wiki/Half-precision_floating-point_format)。这让我们在对浮点数精度要求不高的时候拥有了更多的选择，节省更多的空间。

## 写在最后

都说程序员的三大浪漫是编译器、图形学和操作系统，之所以浪漫，就是因为这是三个短时间很难有大的成果的领域。LLVM 应该算是其中的编译器的这个领域。虽然这次 LLVM 并没有像 ARC 这样惊天动地的新特性出现，有的只是一些原有功能的优化以及底层新特性的支持，我们也不要太失望，毕竟，长城不是一天盖起来的。新的牛逼的编译器技术也不是一年两年就可以积累起来的。好的，今年的 『What's new in LLVM』赏析就到这里了，感谢观看，我们明年见~
