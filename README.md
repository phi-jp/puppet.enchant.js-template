puppet.enchant.js-template
==========================

前田ブロックで作成したデータを単独で実行する為のテンプレート. 9leap への投稿時などに使って下さい.

[Download](https://github.com/phi1618/puppet.enchant.js-template/archive/v0.1.0.zip)

`<script type="text" id="code">~</script>` で囲われている部分を
前田ブロックの JavaScritp タブで生成されたコードに置き換えてください.

置き換えた後 index.html を開けば単独実行できているのが確認できるかと思います.

また, zip にすれば 9leap に投稿もできる...はずです.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="cache-control" content="no-cache">
        <meta equiv="expires" content="0">
        <meta name="viewport" content="width=device-width, user-scalable=no"> 
        <meta name="apple-mobile-web-app-capable" content="yes">
        <script type="text/javascript" src="src/enchant.js"></script>
        <script type="text/javascript" src="src/nineleap.enchant.js"></script>
        <script type="text/javascript" src="src/puppet.enchant.js"></script>
        <script type="text/javascript" src="src/script.js"></script>

        <script type="text" id="code">
// TODO: ここに前田ブロックの JavaScript タブで出力されたコードを貼り付ける
Puppet.create('Name',{ filename:'chara1.gif',w:32,h:32,
 behavior:[  'standAlone','tapMove',]
});
'Test';

if (false) {
}

while (false) {
}
        </script>

        <style type="text/css">
            body {
                margin: 0;
            }
        </style>
    </head>
    <body>
    </body>
</html>
```


### Links

- [前田ブロック](http://junk.wise9.jp/maedaj/)
- [wise9 › 前田ブロックなら小学生でも90秒でゲームプログラミングが出来る!?](http://wise9.jp/archives/7773)
- [wise9 › 前田ブロックで作れるゲームいろいろ](http://wise9.jp/archives/7831)
- <http://junk.wise9.jp/maedaj/maedaBlock.zip>
