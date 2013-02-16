//子供達にもっとプログラミングの楽しさをわかりやすく伝えたい!
//puppet.enchant.js開発途中バージョンです
enchant();

//劇場をつくる
Puppet.Theatre.create();

var run = function(code) {
    Puppet.clear();
    eval(code);
    game.score=0;
    var listeners = enchant.Puppet.sceneStartEventListener;

    for(var i in listeners){
        listeners[i].func.call(window["___"+listeners[i].puppetName+"_definition"]);
    }

    return "yes!";
};

window.addEventListener("load", function() {
    run(document.getElementById("code").innerHTML);
});
