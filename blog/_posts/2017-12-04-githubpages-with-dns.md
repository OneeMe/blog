---
title: 使用 github pages 搭建自己的博客 —— 自定义域名
date: 2017-12-04 00:37 +0800
typora-root-url: ../.vuepress/public
typora-copy-images-to: ../.vuepress/public/assets/images/${filename}
tags: 
  - 青铜
  - 计算机-网络
---

按照 GitHub 官方的[指导](https://help.GitHub.com/articles/quick-start-setting-up-a-custom-domain/)，如果我们想把自己购买的域名绑定到 GitHub pages 的页面，我们需要在仓库的设置中添加自己的域名，同时还需要在自己域名的经销商网站增加两条 A 类型的记录。我很好奇这些操作实际都做了什么，因此写下本文来说明这些操作的目的以及其意义。

<!--more-->

## 从问题出发

首先我们知道，有一种叫做 CNAME 的 DNS 解析记录，当你给你的域名增加这种解析记录后，对你的域名的解析就会转换成对你所设定的域名的解析。比如我给我的域名 forelax.space 增加一条 CNAME 记录，记录的值为 jd.com ，那么访问我的域名，最终就会跳转到京东的首页。

因此，按照我最初的想法，我只要用增加一条 CNAME 记录的方式，把我的域名指向 GitHub pages 提供的域名 forelaxx.GitHub.io ，就可以顺利完成博客的域名绑定。

于是，兴致勃勃的我，在阿里云的控制中心，增加了这样一条记录，将 test.forelax.space 指向了 forelaxx.GitHub.io：

![image-20200922134527369](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134527369.png)

然而，当我访问 test.forelax.space 时，得到的却是一个 404 的页面：

![image-20200922134535827](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134535827.png)


此时，我并没有按照 GitHub 官方的说明那样，在仓库的设置页面设置我的域名：

![image-20200922134543652](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134543652.png)


神奇的是，当我在这里设置了我的域名，访问 forelax.space 就可以顺利跳转到 GitHub pages 的页面。那么，我们来继续探这背后的原理。

## 探索原理

### 给 GitHub Pages 的 Custom Domain 设置域名后发生了什么？

当我尝试删除然后重新填入这个设置项后，我发现我仓库中多出了两个 commit:

![image-20200922134553566](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134553566.png)

而文件的内容也很简单，就是我们填入的域名：

![image-20200922134601246](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134601246.png)

由此看来，这个设置项所做的，仅仅是修改了仓库的 master 分支的一个叫做 CNAME 的文件而已。那么 GitHub pages 会怎么使用这个文件？

要解决这个问题，我们要从最初购买域名时，发生的事情说起。

### 当我在阿里云上购买了 forelax.space 这个域名后，发生了什么？

在看这里之前，建议先看看 https://howdns.works 这个可爱的网站，重温一下 DNS 解析的过程。

当我在阿里云成功购买了域名后，阿里云通过自己域名经销商的身份，向 .space 域名服务器增加了两条解析记录。当有人向 .space 域名服务器询问 forelax.space 的 IP 地址的时候，就告诉询问者，我不知道这个域名的 IP 是多少，但是你可以去 dns17.hichina.com 或者 dns18.hichina.com 这两个域名对应的服务器去问一下，他们知道。

之所以是这两个服务器，时因为我在购买域名的时候，选择了默认的域名解析服务器，所以给 .space 域名服务器中添加的记录是阿里云自己的域名服务器。如果有能力自己搭建 DNS 服务器，也可以在阿里云的控制台把 DNS 解析服务器改成自己的 DNS 服务器的 IP。如下图：

![image-20200922134610992](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134610992.png)

以上过程是我的猜想，那么我们如何证实这个猜想呢？我们可以用 `dig +trace test.forelax.space` 这个命令来看看域名解析过程中的每一步都发生了什么：

> `dig` 这个命令可以帮助我们发送解析域名的 DNS 协议包，同时将解析结果输出。这里的 +trace 表示将完整的解析过程都展示出来。


```sh
; <<>> DiG 9.9.7-P3 <<>> +trace test.forelax.space
# 上面只是输出 dig 的版本号以及我们这次命令的参数
;; global options: +cmd
# 上面表示 dig 这个命令默认还会加上 +cmd 选项
.			63324	IN	NS	e.root-servers.net.
.			63324	IN	NS	a.root-servers.net.
.			63324	IN	NS	c.root-servers.net.
.			63324	IN	NS	k.root-servers.net.
.			63324	IN	NS	l.root-servers.net.
.			63324	IN	NS	g.root-servers.net.
.			63324	IN	NS	f.root-servers.net.
.			63324	IN	NS	j.root-servers.net.
.			63324	IN	NS	h.root-servers.net.
.			63324	IN	NS	d.root-servers.net.
.			63324	IN	NS	i.root-servers.net.
.			63324	IN	NS	m.root-servers.net.
.			63324	IN	NS	b.root-servers.net.
;; Received 508 bytes from 192.168.31.1#53(192.168.31.1) in 38 ms
# 上面表示我们从本地的路由器中，得到了 13 台根 DNS 服务器的地址， 『.』 表示这是根服务器， 63324 表示 TTL，也就是这个信息还会缓存多久，在 63324s 内我们访问得到的还会是这个结果
# IN 表示我们返回的是 IP 协议，基本上我们都是 IP 协议，所以可以忽略他
# NS 表示这条记录是一个 Name Server 记录，告知请求者任何根目录以下的记录都可以找这个服务器
space.			172800	IN	NS	a.nic.space.
space.			172800	IN	NS	b.nic.space.
space.			172800	IN	NS	c.nic.space.
space.			172800	IN	NS	d.nic.space.
space.			86400	IN	DS	44251 8 1 36ACB68B734DFE465CC1112F9DAC08B8B66627CC
space.			86400	IN	DS	44251 8 2 A82D8ED2B07D66D6E7AF375E0E44B22A82F4479AD45F5D8E1859DF6F C170E67C
space.			86400	IN	RRSIG	DS 8 1 86400 20171202050000 20171119040000 46809 . Fg9GkuRICx7mfbOmfuQumQ5ofrxniMi4+lw0AKbE15CJO6Sqj8S1H45T 9LyVhdjxWZ5oRsLOG4YIJum7rAa1IlORTePVlSwLjwz1AuDDOdb603C4 ibqknFSkjYJgw82wTbx5K48SvWRUk8u7aIqvX29Tdl0YR/5FPicjOAvi 0hkRCir8vyg1DHebDNiKKl0/l2f4YJG9x2LUxdUYlRPHOwYbhgscMcJf 8q5TvqW4mC1BdfaysfwLUA1Uf+9qAO4y51QSnxAsXReZH5r296Er7/sQ 6pGigQXiGJhlm9etpKyzqtpe3EcK5TBVKcc6S8Xu2OLUSShbEx+3l9ga CBS0Fw==
;; Received 657 bytes from 198.41.0.4#53(a.root-servers.net) in 500 ms
# 上面表示我们从 a.root-servers.net 这个根服务器中得知了 .space 这个域名服务器的记录
# 其中 DS 表示这是一条 DS 类型的 DNS 记录，可以暂时理解为一种添加时要求更高的记录类型，比如这里就比 NS 多了很多的数据，细节有兴趣可以去维基百科查查 List of DNS record types

forelax.space.		3600	IN	NS	dns17.hichina.com.
forelax.space.		3600	IN	NS	dns18.hichina.com.
0eldeflreldugqhaejqrp17ppn34aaqp.space.	3600 IN	NSEC3 1 1 1 - 0FIBQMPFM95T51I962J7PVBKHVQGF4Q1 NS SOA RRSIG DNSKEY NSEC3PARAM
0eldeflreldugqhaejqrp17ppn34aaqp.space.	3600 IN	RRSIG NSEC3 8 2 3600 20171214211930 20171114215839 46195 space. nUIuP4ZS4WyiF4vdrPYeasfWR54ckTK4NBybw0vI42ZwWbcMV8kdwd0J VVDcYhR2OQTImjSoy945LwmSEM1nyV72EwldpjCX/ynIWfyH8FLJtuQr K2WP7IUAeAT9gBiI8bF+Y+Ir81Q9MDOHrDrPL5hZH8GFjQwkh+9aljjD nFc=
om8amflncknjroa3cjf9287ka296qfvm.space.	3600 IN	NSEC3 1 1 1 - ONF07RDF2DJM0FDED9AG6MC3HK38HQEJ NS DS RRSIG
om8amflncknjroa3cjf9287ka296qfvm.space.	3600 IN	RRSIG NSEC3 8 2 3600 20171214011525 20171114103910 46195 space. E9xkbsyIh6h+4faNQhAILNNALmF9EPveH5EiGzHPJpyJD0AIMzbcG1Iw b2+ahUtoHYgQjG+oqr/PvCV9ikub0i86WWrxIOwCnBLZG45t/so1P9Cz dQb1hZY39z5b0cv0Swzog/jyQnIQTWjZOgp0ZdP+Vtru+MbFmOtSGfZC zlQ=
;; Received 582 bytes from 194.169.218.51#53(a.nic.space) in 202 ms
# 上面表示我们从 a.nic.space 这个域名服务器得到了所有可以得知 test.forelax.space 这个域名地址的记录，这里我们看到了两个熟悉的阿里云的 DNS 解析服务器
```

也许你会疑惑，这里获取到根服务器的时候，并没有给出 IP 啊，那下一步是怎么知道根服务器的地址的？其实返回的请求里头是带有地址的，只是 `dig` 这个命令没有显示出来，用 WireShark 抓取这一次的返回包我们就可以看到返回的内容中是包含有根服务器的 IP 地址的：

![image-20200922134624760](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134624760.png)


### 当我在阿里云上增加了一条解析记录后，发生了什么？

当我在阿里云控制台增加一条 test.forelax.space 的解析记录后，阿里云在自己搭建的 DNS 解析服务器上，对应增加了一条新的 CNAME 记录。

如何确定呢？还是通过 `dig` 命令。上边执行的 `dig +trace test.forelax.space` 命令的输出其实最后还有一段：

```sh
test.forelax.space.		600	IN	CNAME	forelaxx.GitHub.io.
;; Received 74 bytes from 106.11.211.57#53(dns17.hichina.com) in 9 ms
# 最终，我们从 dns17.hichina.com 这个服务器中得到了我们添加的 CNAME 记录，表示我们如果想知道 test.forelax.space 的
# IP 地址，只要知道 forelaxx.GitHub.io 的 IP 地址就可以了
```

### 在我没有给仓库设置自定义域名时，访问 test.forelax.space，发生了什么？

当我们在浏览器中输入 test.forelax.space 时，如果这个域名浏览器从来没有访问过或者已经超过了之前解析结果的缓存时间，浏览器就会发送一个 DNS 的包去尝试解析这个域名对应的 IP 地址，这个步骤是在浏览器发送 HTTP 包之前完成的。我们可以继续上面的 `dig +trace test.forelax.space` 的结果，看看浏览器做了什么。

经过小小的等待，浏览器得知，如果想知道 test.forelax.space 的 IP 地址 ，只要得知 forelaxx.GitHub.io 的 IP 地址即可，于是浏览器继续发 DNS 包查询 forelaxx.GitHub.io 的地址。我们通过 `dig forelaxx.GitHub.io` 命令就可以模拟这一步骤：

```sh
....
;; ANSWER SECTION:
forelaxx.GitHub.io.	30	IN	CNAME	sni.GitHub.map.fastly.net.
sni.GitHub.map.fastly.net. 26	IN	A	151.101.73.147
....
```

命令的输出有很多，我们只挑选出我们关心的部分。从上面的结果来看，forelaxx.GitHub.io 的解析又被转到对 sni.GitHub.map.fastly.net 的解析。再经过一番解析，我们拿到了我们所需要的最终的 IP 地址 ——  151.101.73.147 。

当浏览器获得这个 IP 地址后，便利用这个 IP 地址构建 HTTP 请求：

![image-20200922134636354](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134636354.png)

然而，GitHub 的服务器返回给我们一个 404 的结果。为什么？

答案是，所有人创建的 GitHub pages 静态资源，最终都会部署在同一台服务器上，也就是我们这里看到的 IP 地址为 151.101.73.147 的这台服务器。

我们可以做个尝试，当我执行 `dig sketchk.xyz`  这条命令时，我得到解析结果依然是 151.101.73.147。

于是对于 IP 地址为 151.101.73.147 的服务器来说，就出现了一个问题：当他接收到一个 HTTP 请求时，他怎么知道到底要返回哪个博客的静态资源呢？

### 在我给仓库设置自定义域名后，访问 test.forelax.space，发生了什么？

在设置自定义域名后，我的仓库多出来了一个 CNAME 文件，里面写着我的域名。因此，IP 地址为 151.101.73.147 这台服务器，便得知 forelaxx.GitHub.io 这个域名是需要绑定到 forelax.space 这个域名上的。于是，他便给自己加了一条规则：当接受到的 HTTP 请求中， Host 字段是 forelax.space 时，返回 forelaxx.GitHub.io 对应仓库中的内容。

### 如果我想使坏，把我仓库的自定义域名设置改成别人的，行不行？

答案是 NO，GitHub 不会让你这样做的。在设置里，当我给自定义域名填写 sketchk.xyz 后，页面便不允许我保存了，并提示我这个域名已经被占用了。

即便我在仓库中修改了 CNAME 文件并强行 push 上去，GitHub 也不会根据这个 CNAME 文件做任何事情，并且会在设置项中给出警告：

![image-20200922134643631](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134643631.png)

### 那如我把自己的域名解析设置成别人的 GitHub.io 的地址，行不行？

答案也是 NO。

结合上面我们已知的内容，即便你把自己的域名解析改成别人的 GitHub pages 地址也是没有用的，因为别人的仓库中的 CNAME 并没有记录你的域名，所以访问你的域名跳转过去就会显示文章一开头的那个 404 页面。

### 为什么 GitHub 推荐我们给自己的主域名增加两条 A 类型的记录，而不是一条 CNAME 记录？

看到这里，我们可能会想，我们直接给自己的域名添加一条 CNAME 类型的记录，指向我们 GitHub Pages 的地址不就 OK 了？实际尝试以后，发现这个方式也确实可行。但是，在 GitHub 官方给出的自定义域名设置[指南](https://help.github.com/articles/setting-up-an-apex-domain/)中，建议我们给我们自己的主域名添加两条 A 类型的记录，并且不建议我们直接添加 CNANE 记录：


![image-20200922134652252](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134652252.png)

这是为什么呢？这里说的『issues with other services』又指的是什么呢？

这个问题直到我使用阿里云的企业邮箱才明白是怎么回事。当你要使用阿里云的企业邮箱时，你需要给你的域名添加一系列新的记录：

![image-20200922134658504](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134658504.png)


我们可以看到，使用邮箱服务的时候是需要给我们的主域名添加 MX 类型的解析记录的，如果我们使用 CNAME 类型的记录，就无法添加 MX 类型的记录，因为 CNAME 类型的记录不可以和其他任何记录共存，但 A 记录却可以和 MX 类型的记录共存，具体的记录冲突规则见下图：

![image-20200922134705383](/assets/images/2017-12-04-githubpages-with-dns/image-20200922134705383.png)

所以，GitHub 官方推荐我们添加 A 类型的记录~原因就在这里~


## 参考

- [List of DNS record types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
- [A Guide Of Making Your Personal Blog - Part 3](http://sketchk.xyz/2017/03/24/A-Guide-Of-Making-Your-Personal-Blog-Part-3/)
- [ICANN-Accredited Registrars](https://www.icann.org/registrar-reports/accredited-list.html)
- [从搭建hexo个人博客过程中理解学习DNS解析](http://coolcao.com/2016/10/19/从搭建hexo个人博客过程中理解学习DNS解析/)
