/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "0340cc65fe60e91bcb204e9aa155ea3a"
  },
  {
    "url": "about.html",
    "revision": "01b56ad3e80a6eef6ea25c6b836bd2ce"
  },
  {
    "url": "assets/css/0.styles.e072e671.css",
    "revision": "86b5a5fce72426379b66a13f9423c555"
  },
  {
    "url": "assets/fonts/EJRVQgYoZZY2vCFuvAFbzr-_dSb_nco.9738e026.woff2",
    "revision": "9738e026c7397b4e3b543ae7f1cf4b6c"
  },
  {
    "url": "assets/fonts/EJRVQgYoZZY2vCFuvAFWzr-_dSb_.b450bfca.woff2",
    "revision": "b450bfca16a8beb05580180de7b678f0"
  },
  {
    "url": "assets/icons/email.png",
    "revision": "79b04374fe667befc243f2e0bea05482"
  },
  {
    "url": "assets/icons/github.png",
    "revision": "d22ee3727a7216019c3848df6eafa024"
  },
  {
    "url": "assets/icons/jike.png",
    "revision": "19b2b68a343b11eef1ff99c17c5e25e0"
  },
  {
    "url": "assets/icons/wechat.png",
    "revision": "a0a97b8f0fcc86fa4678ac01e9333d4b"
  },
  {
    "url": "assets/icons/weibo.png",
    "revision": "e9e04f5ce662383b65493ec59d07421a"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134527369.png",
    "revision": "7eb52a7e9db533812578134b30a36fd3"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134535827.png",
    "revision": "ba0594da4bf15c692b2267ea1794a2b2"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134543652.png",
    "revision": "d39e1db83933345720a2c060b36d82ee"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134553566.png",
    "revision": "79fede09ac386bb1dd8ec123d1f62d5a"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134601246.png",
    "revision": "2fe1c8b721e352fd1337ffb70c51d209"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134610992.png",
    "revision": "f10d9812b76e7ef01c55a3ac7ef780c3"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134624760.png",
    "revision": "c1b9d70553a743ac99e192c0591f8d90"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134636354.png",
    "revision": "add3cc536f2ee38704ac1d35106e80fd"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134643631.png",
    "revision": "1fd5ce4195efe1bc0b001e5f67a84ecc"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134652252.png",
    "revision": "c5171c8222decc7a36a32d0da4fc295c"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134658504.png",
    "revision": "3948d07b9abe22ac15348da626a4eb72"
  },
  {
    "url": "assets/images/2017-12-04-githubpages-with-dns/image-20200922134705383.png",
    "revision": "d18ce0bd2ee75d8e48fb0a8888999315"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/12e8f3acac46b1e95eba2aad6f2d593d.jpg",
    "revision": "70408256c0810fafaf26ba9837a9a753"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/2c0e01cd6120b9527d2612919ff7c3e0.jpg",
    "revision": "a088c57c4cbf861e7cc5ea460d09023b"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/2f9ca65862d8dcd585f27982d1213f47.jpg",
    "revision": "2889cfda085f93d2e7837a1f4e632809"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/36b3f9539bbcf0a04e915e48aa33ae23.jpg",
    "revision": "3035a884340e00a9313e618545cb3b85"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/3d142d1cc62d13d638b14c19cb079221.jpg",
    "revision": "c8ed79a17231ff76413c2c0dc77c6848"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/537ad795ccd3cef9c62d5c35442ffe42.jpg",
    "revision": "0afb1449cde0ce6ea29b67d1b71face0"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/5f511c5cb79c30a494a08209780f10c7.jpg",
    "revision": "396e121870b00356685e94a4d6fd4725"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/628bb5c16606fd603cfee4e5eea7a053.jpg",
    "revision": "a08fc7400095d9cdfe1730adb4e2224f"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/67cb06c3d7936b027b3e7c625d3aca75.jpg",
    "revision": "0e2ab8e79c543f2a70725455497a8cc6"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/75b4a378c38ecaaec6ebe50c48d78fd7.jpg",
    "revision": "3460f96b42c87f07d25ca07c87dbdb4c"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/822219e4485f7d092be99a58acca3b96.jpg",
    "revision": "91f72b820e988cded0cac688b9f57c93"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/89d6b6281b61faa511771d89e1ad344d.jpg",
    "revision": "d74fcc6dfe496baa2ee931644d50c40f"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/93949a6594a4f27282e40f9dce508965.jpg",
    "revision": "2d789fc0582fab6ccd19fd4f3d4d6e65"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/9702066a102dec614736849d5b380840.jpg",
    "revision": "1c47687937b2b2b5e0df93d2a0689582"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/a9c58a651a9da1f1bfc475cf919455ff.jpg",
    "revision": "6aa2f980d13525d408b091f516b91e47"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/ab90b3c4f2bd4c74b5030f32cdd994c0.jpg",
    "revision": "6fe4140981298b889dca86c1108b65eb"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/cc4406c268852f61f54ad76b2f5f3eba.jpg",
    "revision": "bca37c94f98f97a415332db2786c1869"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/d23480274e41c14f2ed35bc95857ff12.jpg",
    "revision": "7e60abee9a5548fa6b061a6ad02dec30"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/d3c2fe636661a1a60ebec4b818e462cc.jpg",
    "revision": "5bcaa62426ae8fb44577276aee808ee8"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/d975c3f30143b94a5b942d5fbeb1009d.jpg",
    "revision": "94f4e44f1865bb05cd21afcbf9615910"
  },
  {
    "url": "assets/images/2018-06-24-what-is-new-in-llvm/e403abd402417c669119079d7642b582.jpg",
    "revision": "411b9f2ee8dfc9ded0504813b50c87eb"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/04973c212adb7501c2c50acd2e5263d0.png",
    "revision": "959fc79dc5315742999a21fa8cbd7224"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/0e2337990b7977f0541a50390320a95b.png",
    "revision": "9f91a83a93d3e4d6029ac8de841346ac"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/143d5717f258fd7622dda52135889065.gif",
    "revision": "46f5c199d5ab573d372a8743e19dedf8"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/1d8a0b3e3d7444f4394492136108e7b4.png",
    "revision": "e89d84254099ce71cc3756601bd9f8ce"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/2021e5a20a770ae403d38b5cb2ad0dd2.png",
    "revision": "721d947c044200dcafb6726067b86a7a"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/22324c3ae154659b593351be21ff4c2e.png",
    "revision": "3c97d1b07522db553bd6f77df70a751b"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/2b97c8f8f70027c57aeb0460f30e815b.png",
    "revision": "c9726c44b19f6f4eef98b9367c7bcdd0"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/2c82dbb306a7db3642061244063ec7c8.png",
    "revision": "627a06abf826421a1f71d37226725d45"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/32f46c217b63fb8e97d93238242eb3dd.png",
    "revision": "8ef35cec1cd469917e27d639fc520b58"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/33def192bf933817071e62cb1b1c6559.png",
    "revision": "121bb9701a75c75b687b807b13ab90a9"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/40e5407d05810276ee2c80e9fe6423b3.png",
    "revision": "6a4940e92273c0280cd31ed97f54f5ef"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/55125372c753be358bd8083b29a8161b.png",
    "revision": "c24b880d096c1000c468c63ebf081584"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/55ff15b156545c4fb9f351daaa535b34.png",
    "revision": "99dec66a2f2fec861a53d74bebad05d7"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/560b0691e987387b869854520510b9e6.png",
    "revision": "dc5266d21c7e9fcae67e244baa40a65b"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/67992ca203cdafd8b729bc12397f4974.png",
    "revision": "58f8af9013caa5a044d191d47dfb442b"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/74f5110aa7f4f3a2e226d94a74897bdd.png",
    "revision": "8b6d2e013022f315c83b86effa0f3f3f"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/98f8e900065e2ba97b3ac8d2c4fe2473.png",
    "revision": "3e6b12f570e167c5a815e02fd66a3cea"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/99f3c15307472041127ddd350bf4d560.png",
    "revision": "fb2fe17ecc53d45e2a8869c865c62d7d"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/a333db43b30f6a27411b95b3d9f20694.png",
    "revision": "5f52ac0397455ae52a512fb14b299c1e"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/a5c0d99c3e9a4c55c37175121ceb3a60.png",
    "revision": "7d91770376ae224fbe227fe49510e478"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/a75c50f39c57a309322f38bb15f09c7e.png",
    "revision": "78be503354956f717867f3654ddeda33"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/a7b4466b3f38e347da1e98266ea747ae.jpg",
    "revision": "6bcfe10f78dfd8da307c0ffedf636397"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/a907eb41f11bc2329db9557190e9e2da.png",
    "revision": "b559cec8417308100f6a42b180c69ea9"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/adc5c10f44a2b4221ba1bb5bc9453112.png",
    "revision": "c60eb918f3bc955746a8b156e9880dec"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/af6646c62f4d7d364a28cd32c084ff46.png",
    "revision": "60dabbc804f7e6956874b420180b6f63"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/b5086d022c718238d598482c3d013f41.png",
    "revision": "2034b4629bcb086459e1ca6e9a1e1cc7"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/bca5a23999320a7a2433a3b9f9638f4f.png",
    "revision": "d3ca644584065e8f12d4bca927f81cec"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/c1236fe77454d5af91a25281ac620f3f.png",
    "revision": "d40fda2e36a136435466446db216bb3f"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/c181609b47fc6357dcb493679a2b6b9c.png",
    "revision": "d3ea9511e69cd683acb1afa148779d9a"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/c8f53b1bcbad2876170b6001c280f709.png",
    "revision": "5d6ac839e42c6e54f01fd7546774f73b"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/cb286e0ea220fe5a91df404158fd5ed0.png",
    "revision": "636b4fc658ed6de7c46451fa380795c2"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/d6e6e0fd2a9e50eca5155ab8358e4819.png",
    "revision": "6a75d5cca27272467ddb3d22d49b319b"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/db5d43c2202dccda44009ba9add25e8f.png",
    "revision": "90b502325908b68449093a2494783b4d"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/e6598e21e5c418199d8b7f975492e422.png",
    "revision": "89b3efd7c50e36fe54fb4bb8c648ceda"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/e70422b59a112468ea8410bec2ad70ef.gif",
    "revision": "910d5d8e72ebf6dd2765afc36f709751"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/e938db60ddfd1b6c8aca097567ab1b35.png",
    "revision": "e6af2bcd6c3af2ba9f99336324afb59c"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/edbae94d7fea2533126a483797dfe93c.png",
    "revision": "09cb3910dff7a85db6172829ae5ab612"
  },
  {
    "url": "assets/images/2018-06-25-what-is-new-in-xcode11/image-20210626214537051.png",
    "revision": "1568303a5d328f797cdd50029211e0e2"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524230704416.jpg",
    "revision": "9b5ff56e825ef23d1ca9e1351c7f0841"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524231228993.jpg",
    "revision": "a077e22a68a5533d580646f8a07b38d1"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524234657906.jpg",
    "revision": "263bddde967498c76d15ba2ddb8222d1"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524235221535.jpg",
    "revision": "def65d5c4c8a479d59dbaaab9fa08483"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200524235838804.jpg",
    "revision": "ca743b1c10237f5e58fe2050d0f58211"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525000224004.jpg",
    "revision": "d1a10cbee7de5329edc1956c9a649dda"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525001010157.jpg",
    "revision": "27d32c23e9eff33a033ffa94d76542c1"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525064848126.jpg",
    "revision": "57c268c821ee41d1ab8e457b397fe583"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525085235211.jpg",
    "revision": "307979284ffb757d14201a944e3037ca"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525085547135.jpg",
    "revision": "fcdda0e9298dbb0127266d35ab8e24bb"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525085916282.jpg",
    "revision": "72e073eaba026d29131fed4fe22fac25"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525090823652.jpg",
    "revision": "8c7a3a3acf16aa44f20de7137106bff3"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525090845400.jpg",
    "revision": "3b7d6c64b30fe4ebbaef5015fa6ab1cc"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525092217724.jpg",
    "revision": "0d1c203e9698d2769160872532c20081"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525092415348.jpg",
    "revision": "33e99509cc32861aedb23819b635d27f"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525092803452.jpg",
    "revision": "7a7a1858cbebf886d06b8252194f7c51"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525093009196.jpg",
    "revision": "bd9c4cda17efa03bef5abb5935eea438"
  },
  {
    "url": "assets/images/2020-05-24-lets-talk-about-package-manager/image-20200525093847249.jpg",
    "revision": "d9ebe0224c2b4124c84d8a6df5d14b59"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/1586AFFF-C79E-43FD-AA81-380E04849EB0.png",
    "revision": "10110bc38d341c2812ef6c9bb1dd3e02"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/8157560cly1gg63nqbb6qj20qo0f0af1.jpg",
    "revision": "04280729e2ff9b4811666bed8500aa15"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/8157560cly1gg63nqzqulj20qo0f045t.jpg",
    "revision": "812b8d4c310f94296bae31720776ea87"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/90C83540-35CC-4679-AB60-BEB1AFC76315.png",
    "revision": "4548fc5151b43ec5cd684bae3639f614"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/C1860D6A-9CF2-47BB-9E9E-8B7300C8CAA8.png",
    "revision": "f592a792d165c64b62a686b7934afd00"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/D3848F3B-17E6-441D-920B-872911D27415.png",
    "revision": "c942c727d3cab3540f2de6e6e64a1018"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/F5634243-4716-4387-AE10-E15B5CDEBE28.png",
    "revision": "143fdd0505fa289e886493d3c69c1128"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712141630858.png",
    "revision": "46d4aa1b4a6b7d64f7d007b8cf1a900d"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712142041633.png",
    "revision": "8328814fdc34f351a724f76d3734189d"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712142301808.png",
    "revision": "525183bd53e5dc987a705d0454848b96"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712143035029.png",
    "revision": "4fad9738ba685334a6d5291011ea4ed3"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712152054631.png",
    "revision": "fdf827a7110447cb82d89ea54127433c"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712161333929.png",
    "revision": "60098bebb9e78035a1fc9c9b9ab89fab"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712172555306.png",
    "revision": "12cf3e30e1a6f709aa107c9cb9eb378a"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712174836489.png",
    "revision": "02a8f5b48d0f7fa9c9d18437b13164db"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/image-20200712175532895.png",
    "revision": "9ce8389ab391ab0d6b8110c85a44c3a4"
  },
  {
    "url": "assets/images/2020-07-11-wwdc-2020-what-is-new-in-catalyst/move-cell.gif",
    "revision": "9b6d9b1618c45d0bc6357546ad547154"
  },
  {
    "url": "assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712205637358.png",
    "revision": "c3b5737f9041b6ba8e06a343766049f4"
  },
  {
    "url": "assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712210101406.png",
    "revision": "8ca93918774c03a14100776119ab2e82"
  },
  {
    "url": "assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712213344387.png",
    "revision": "5292e7611a9a20e8e0c1ed11ecd3cdab"
  },
  {
    "url": "assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712215659004.png",
    "revision": "01db9e64cc0e31af28e4d91c15da3cb6"
  },
  {
    "url": "assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712220053235.png",
    "revision": "78328033f6318e54e3da49a3c9710bc7"
  },
  {
    "url": "assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712221130312.png",
    "revision": "bfd606e31683dca021f1fe729cd538da"
  },
  {
    "url": "assets/images/2020-07-12-wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/image-20200712222100729.png",
    "revision": "00f27367129df6423a7880b17ab33495"
  },
  {
    "url": "assets/images/about/jike.png",
    "revision": "3a4395d7f6a399f760d82c6ad765d689"
  },
  {
    "url": "assets/images/me.jpg",
    "revision": "f1fe7d9c9cf7319ab7936902bf7dc18f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.0499a691.js",
    "revision": "5696ab997e46b1d33b93e643095b8edb"
  },
  {
    "url": "assets/js/11.1ced6ab3.js",
    "revision": "5f69cb49ce6d47aa6f49ad903653fec9"
  },
  {
    "url": "assets/js/12.8dbd30c2.js",
    "revision": "81fd6ddcbbab01e61d6f90e590c5acff"
  },
  {
    "url": "assets/js/13.347dbc79.js",
    "revision": "7f18ccb79acb4c50c82351571345af0d"
  },
  {
    "url": "assets/js/14.2adb8fa7.js",
    "revision": "ac871ac3514dbc0d10fce48e13921b91"
  },
  {
    "url": "assets/js/15.61edbf17.js",
    "revision": "21932f1f48dbbca184627d46feccccb6"
  },
  {
    "url": "assets/js/16.f6fb6f07.js",
    "revision": "3236bd33c3b7f218b2d8a2c149f12caa"
  },
  {
    "url": "assets/js/17.2624cae3.js",
    "revision": "66fdbf9dd2d0fcf9bd6410fbc7d291b0"
  },
  {
    "url": "assets/js/18.caae516a.js",
    "revision": "f850c9520605380d42c82d401f8cb0b6"
  },
  {
    "url": "assets/js/19.74468e7f.js",
    "revision": "5625014b9b1d988b68aa43c5f4fe3082"
  },
  {
    "url": "assets/js/20.db96440f.js",
    "revision": "fb6f3fbd81df976c727cd67e4266c248"
  },
  {
    "url": "assets/js/21.d6e772b1.js",
    "revision": "db826e8d48553b437274a5213d5ec7b2"
  },
  {
    "url": "assets/js/22.aa0557ab.js",
    "revision": "3057e654857508a2c8fb5f4a041a2242"
  },
  {
    "url": "assets/js/23.5151b5c1.js",
    "revision": "4cef2924be19e0587b92d25a271585d2"
  },
  {
    "url": "assets/js/24.9f10956c.js",
    "revision": "88768186d6cb7344a2accb47f0b59c44"
  },
  {
    "url": "assets/js/25.6555ae13.js",
    "revision": "d429bd150efda2d51efe52b94c5dca2b"
  },
  {
    "url": "assets/js/26.035b50f9.js",
    "revision": "e6d4dfee31cb2241e5587a0d2f95b627"
  },
  {
    "url": "assets/js/27.fec80cb8.js",
    "revision": "85b1ca6af821862079c0577eee303f75"
  },
  {
    "url": "assets/js/3.a2e370df.js",
    "revision": "73d7c191f4c088e9e91568d72658b5a9"
  },
  {
    "url": "assets/js/4.75a239aa.js",
    "revision": "5a5ece34ca3ecef8e4dc3d00773a0ab9"
  },
  {
    "url": "assets/js/5.8922c4b3.js",
    "revision": "82ae17d006dc77597da3c2fd161572ba"
  },
  {
    "url": "assets/js/6.4dc5f0a5.js",
    "revision": "bac08e624a71ac195fe756ba3c93d919"
  },
  {
    "url": "assets/js/7.72183347.js",
    "revision": "b0b4c1ea080dbd18711f93eabe704691"
  },
  {
    "url": "assets/js/8.de39a2df.js",
    "revision": "ef9e1695bb05f1bfebfb216e9ae32607"
  },
  {
    "url": "assets/js/9.4ce6e40a.js",
    "revision": "f255094b3e4c321b1ee23841853947d2"
  },
  {
    "url": "assets/js/app.9cbc85f0.js",
    "revision": "53c6e18a81020226d8f79636f145abd5"
  },
  {
    "url": "assets/js/vuejs-paginate.496722bb.js",
    "revision": "32b2f8b67f0147f47f977e93c0b14788"
  },
  {
    "url": "icon.png",
    "revision": "0725130620d45d1638e2027942bbbb1f"
  },
  {
    "url": "index.html",
    "revision": "a84a6bff95f68be82cc72ea5cf12c6cd"
  },
  {
    "url": "NaN/NaN/NaN/githubpages-with-dns/index.html",
    "revision": "b78d5a00136e10a88aeb519aee69af7d"
  },
  {
    "url": "NaN/NaN/NaN/lets-talk-about-package-manager/index.html",
    "revision": "6a473b5182e1ee49b96fd5a80f05166b"
  },
  {
    "url": "NaN/NaN/NaN/obsidian-zhi-shi-tu-pu-shi-yong-xin-de/index.html",
    "revision": "e7f5c6a56c0039b97ed7eb016652e3ad"
  },
  {
    "url": "NaN/NaN/NaN/what-is-new-in-llvm/index.html",
    "revision": "018dbea2cf81425524beb77d267c9310"
  },
  {
    "url": "NaN/NaN/NaN/what-is-new-in-xcode11/index.html",
    "revision": "8f70ef10e2010c4c971eaf2362f45eb7"
  },
  {
    "url": "NaN/NaN/NaN/why-we-use-rvm-and-bundler/index.html",
    "revision": "c43078ad7c442ccdde70732616dfef5c"
  },
  {
    "url": "NaN/NaN/NaN/wwdc-20-ipad-and-iphone-apps-on-apple-silicon-macs/index.html",
    "revision": "3a0352e0edb8ab7769e23b3bad2d585d"
  },
  {
    "url": "NaN/NaN/NaN/wwdc-2020-what-is-new-in-catalyst/index.html",
    "revision": "699bf906d6bd290eda05858862fda15c"
  },
  {
    "url": "page/2/index.html",
    "revision": "8de7eb2d06f9f27ab677c15f04a9ebe4"
  },
  {
    "url": "skill.html",
    "revision": "30a4918acae4b83fec17697f710f8d82"
  },
  {
    "url": "tag/Computer-Network/index.html",
    "revision": "6ee5150df1a5f867cc681201973b8173"
  },
  {
    "url": "tag/Computer-Platform-iOS-Cataclyst/index.html",
    "revision": "67c503f545a8a04b9eebb6d7965a3b8d"
  },
  {
    "url": "tag/Computer-Platform-iOS-Silicon/index.html",
    "revision": "65d629f143ee097bbd4b70678223a837"
  },
  {
    "url": "tag/Computer-Tools-Compiler/index.html",
    "revision": "d6312e4c5ad5a0a2b4588ef87d853bf3"
  },
  {
    "url": "tag/Computer-Tools-IDE-Xcode/index.html",
    "revision": "c277b7118ad17b63a72f72b203f1dc03"
  },
  {
    "url": "tag/Computer-Tools-PackageManager/index.html",
    "revision": "bcece014f03ce3130073843963ae19f2"
  },
  {
    "url": "tag/index.html",
    "revision": "27e1eec2a8fff94f8ec9651388bf4d36"
  },
  {
    "url": "tag/Instruments-Note/index.html",
    "revision": "4b8ac4285ff8e5b3388ab11ca41f655c"
  },
  {
    "url": "tag/白银/index.html",
    "revision": "f0eb17fcce27e168f990f3e30e1ca789"
  },
  {
    "url": "tag/青铜/index.html",
    "revision": "1b915da317ea64aecbba6bdee60bf083"
  },
  {
    "url": "tag/青铜/page/2/index.html",
    "revision": "eb121207df110e30c300c5f1d8c2fce9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
