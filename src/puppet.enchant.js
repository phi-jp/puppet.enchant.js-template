/**
 * Puppet.enchant.js 
 * @version 0.1 (2012/07/21)
 * @requires enchant.js v0.4.0 or later
 *
 * @description
 * Puppet classes for enchant.js
 * 
*/

(function () {
	enchant.puppet = { assets: ['chara1.gif', 'icon0.gif'] };
})();

enchant.PuppetList=[];
enchant.Puppet = enchant.Class.create(enchant.Sprite,{
	initialize:function(_x,_y){
		enchant.PuppetList.push(this);
		enchant.Sprite.call(this,this.w ? this.w:32,this.h ? this.h : 32);
		this.image=this.filename ? game.assets[this.filename] : game.assets['chara1.gif'];
		this.x =_x;
		this.y =_y;
		this.HP=100;
		this.isHit=false;
		this.frame = this.f ? this.f:0;
//        this.age = rand(10+this.speed);
		this.init();
		stage.addChild(this);
		this.parentScene=stage;
	},
	init:function(){},
	show:function(){
		this.parentScene.addChild(this);
	},
	hide:function(){
		this.parentScene.removeChild(this);
	},
});	
enchant.Puppet.sceneEnterframeEventListener=[];
enchant.Puppet.sceneStartEventListener=[];
enchant.Puppet.create=function(puppetName,option){
		var definition = {
					initialize:function(x,y){
						enchant.Puppet.call(this,x,y);
						window["___"+puppetName+"_array"].push(this);
						if(this.__enterframe)this._enterframe = this.__enterframe.slice(0);
						if(this.__touchend)this._touchend = this.__touchend.slice(0);
						if(this.__touchstart)this._touchstart = this.__touchstart.slice(0);
						if(this.__touchmove)this._touchmove= this.__touchmove.slice(0);
						if(this.__hit)this._hit = this.__hit.slice(0);
						var listeners=this.__init;
						if(listeners)
						for(var i in listeners){
							listeners[i].func.call(this);
						}
                        if(this.start){
                            this.start.call(this);
                        }
					},
					speed:10,
					interval:30,
					appearInterval:30,
					initialNumber:10,
					die:function(){
						this.hide();
						console.log(this.puppetName);
						var puppets = window["___"+this.puppetName+"_array"];
						console.log(puppets);
						for(var i in puppets){
							if(this == puppets[i])
								puppets.splice(i,1);
						}
					},
					onenterframe:function(){
						var listeners=this._enterframe;
						if(listeners)
						for(var i=0;i<listeners.length;i++){
							listeners[i].func.call(this);
						}
						
						if( (this.x<-320)||(this.x>640)||
							(this.y<-320)||(this.y>640))this.die();
							
						if(!this.isHit)
						if(this.collision){
							for(var i in this.collision){
								var puppets = window["___"+this.collision[i]+"_array"];
								for(var j in puppets){
									if(this != puppets[j])
									if(this.intersect(puppets[j])){
										this.onhit(puppets[j]);
//										puppets[j].onhit(this);
									}
								}
							}
						}
						
						if(this.enterframe)this.enterframe.call(this);
					},
					ontouchend:function(e){
						var listeners=this._touchend;
						if(listeners)
						for(var i=0;i<listeners.length;i++){
							listeners[i].func.call(this);
						}
						if(this.touchend)this.touchend.call(this,e);
					},
					ontouchstart:function(e){
						var listeners=this._touchstart;
						if(listeners)
						for(var i=0;i<listeners.length;i++){
							listeners[i].func.call(this);
						}
						if(this.touchstart)this.touchstart.call(this,e);
					},
					ontouchmove:function(){
						var listeners=this._touchmove;
						if(listeners)
						for(var i=0;i<listeners.length;i++){
							listeners[i].func.call(this);
						}
						if(this.touchmove)this.touchmove.call(this,e);
					},
					onhit:function(e){
						var listeners=this._hit;
						if(listeners)
						for(var i=0;i<listeners.length;i++){
							listeners[i].func.call(this,e);
						}
						if(this.hit)this.hit.call(this,e);
					},
					addBehavior:function(behaviorName){
						var behaviors = [];
						behaviors[0] = behaviorName;
						if(behaviors[0] instanceof Array){
							behaviors = behaviorName;
						}
						for(var j in behaviors){
							var behavior=enchant.Puppet.Behavior[behaviors[j]];
							for(var k in behavior){
								if(!this["_"+k])this["_"+k]=[];
								this["_"+k].push({func:behavior[k],behaviorName:behaviors[j]});
							}
						}
                        for(var i in this["_init"]){
                            this["_init"][i].func.call(this);
                        }
						
					},
		            開始:function(behaviorName){
                        this.addBehavior(behaviorName);
        		    },
		            start:function(behaviorName){
                        this.addBehavior(behaviorName);
        		    },
					removeBehavior:function(behaviorName){
						var behavior = enchant.Puppet.Behavior[behaviorName];
						for(var i in behavior){
							var eventName = i;
							if(this["_"+eventName]){
								var eventArray = this["_"+eventName];
								for(var j in eventArray){
									if(eventArray[ j].behaviorName == behaviorName){
										this["_"+eventName].splice(j,1);
										break;
									}
								}
							}
						}
					},
            
		            やめる:function(behaviorName){
                        //console.log(behaviorName);
                        this.removeBehavior(behaviorName);
        		    },
		            stop:function(behaviorName){
                        this.removeBehavior(behaviorName);
        		    },
            
		};
		for(var i in option){
			if((i=='behavior')||(i=='ビヘイビア')){
			console.log(option[i]);
				var behaviors = [];
				behaviors[0] = option[i];
				if(option[i] instanceof Array){
					behaviors = option[i];
				}
				for(var j in behaviors){
					var behavior;
					if(typeof behaviors[j] == 'string'){
					console.log("str");
						behavior=enchant.Puppet.Behavior[behaviors[j]];
					}else{
						behavior = behaviors[j];
					}
					for(var k in behavior){
						if(!definition["__"+k])definition["__"+k]=[];
						definition["__"+k].push({func:behavior[k],behaviorName:behaviors[j]});
					}
				}
			}
			if((i=='collision')||(i=='当たる相手')){
				if(option[i] instanceof Array){
					definition[i] = option[i];
				}else
					definition[i] = [option[i]];
			}else{
				definition[i] = option[i];
			}
		}
		
			console.log(definition);
	    var JapWords = [["speed","スピード"],
                        ["startPin","スタート位置"],
                        ["w","幅"],
                        ["h","高さ"],
                        ["f","フレーム"],
                        ["collision","当たる相手"],
                        ["filename","ファイル名"],
                        ["enterframe","動き"],
                        ["touchend","触られた時"],
                        ["hit","当たった時"]];
    	
    	for(var i in JapWords){
            var word = JapWords[i];
            if(definition[word[1]]){
				definition[word[0]] = definition[word[1]];
            }
	    }
                        
		
		if(definition.__sceneEnterframe){
			var sceneEnterframe =definition.__sceneEnterframe;
			var that=this;
			for(var i in sceneEnterframe){
				sceneEnterframe[i].puppetName = puppetName;
				enchant.Puppet.sceneEnterframeEventListener.push(sceneEnterframe[i]);
			}
		}
		if(definition.__sceneStart){
			var sceneStart =definition.__sceneStart;
		console.log(sceneStart);
			var that=this;
			for(var i in sceneStart){
				sceneStart[i].puppetName = puppetName;
				enchant.Puppet.sceneStartEventListener.push(sceneStart[i]);
			}
		}
		console.log(enchant.Puppet.sceneStartEventListener);

		definition.puppetName=puppetName;
		var newPuppet = enchant.Class.create(this,definition);
		window[puppetName]=newPuppet;
		
		var definitionSet={};
		for(var i in definition)
			definitionSet[i] = definition[i].value;
		window["___"+puppetName+"_definition"]=definitionSet;
		window["___"+puppetName+"_array"]=[];
		return newPuppet;
};

enchant.Puppet.Behavior={
	moveLeft:{
		enterframe:function(){this.x-=this.speed*0.1;}
	},
	moveRight:{
		enterframe:function(){this.x+=this.speed*0.1;}
	},
	moveUp:{
		enterframe:function(){this.y-=this.speed*0.1;}
	},
	moveDown:{
		enterframe:function(){this.y+=this.speed*0.1;}
	},
	moveRandomDir:{
        init:function(){this.vx=rand(this.speed)-this.speed/2;
                         this.vy=rand(this.speed)-this.speed/2;
                      console.log(this.vx+","+this.vy); },
		enterframe:function(){
            		this.x+=this.vx;this.y+=this.vy;}
	},
	randomAppearLeft:{
		sceneEnterframe:function(){
			if(game.frame % this.appearInterval == 0){
				var item = new window[this.puppetName](-30-rand(160),rand(320));
			}
		},
		enterframe:function(){this.x+=this.speed*0.1;}
	},
	randomAppearRight:{
		sceneEnterframe:function(){
			if(game.frame % this.appearInterval == 0){
				var item = new window[this.puppetName](320+rand(160),rand(320));
			}
		},
		enterframe:function(){this.x-=this.speed*0.1;}

	},
	randomAppearTop:{
		sceneEnterframe:function(){
			if(game.frame % this.appearInterval == 0){
				var item = new window[this.puppetName](rand(320),-60-rand(160));
			}
		},
		enterframe:function(){this.y+=this.speed*0.1;}

	},
	randomAppearBottom:{
		sceneEnterframe:function(){
			if(theatre.frame % this.appearInterval == 0){
				var item = new window[this.puppetName](rand(320),320+rand(160));
			}
		},
		enterframe:function(){this.y-=this.speed*0.1;}

	},
	randomSetup:{
		sceneStart:function(){
			for(var i=0;i<this.initialNumber;i++){
				var item = new window[this.puppetName](rand(320),rand(320));
			}
		}
	},
	standAlone:{
		sceneStart:function(){
			console.log(this.startPin);
			var startX = this.startPin? this.startPin[0]:theatre.width/2;
			var startY = this.startPin? this.startPin[1]:theatre.height/2;
			console.log(startX);
			var item = new window[this.puppetName](startX,startY);
		}
	},
	zigzagX:{
		enterframe:function(){this.x+=Math.cos(this.age*0.1)*0.1*this.speed;}
	},
	zigzagY:{
		enterframe:function(){this.y+=Math.sin(this.age*0.1)*0.1*this.speed;}
	},
	tapMove:{
		enterframe:function(){this.x=theatre.touchX;this.y=theatre.touchY;}
	},
	tapMoveX:{
		enterframe:function(){this.x=theatre.touchX;}
	},
	tapMoveY:{
		enterframe:function(){this.y=theatre.touchY;}
	},
	tapChase:{
		enterframe:function(){	this.x+=( theatre.touchX-this.x )*0.01*this.speed;
											this.y+=( theatre.touchY-this.y )*0.01*this.speed;}
	},
	tapChaseX:{
		enterframe:function(){	this.x+=( theatre.touchX-this.x )*0.01*this.speed;}
	},
	tapChaseY:{
		enterframe:function(){	this.y+=( theatre.touchY-this.y )*0.01*this.speed;}
	},
	hitAndDie:{
		hit:function(){	this.die();}
	},
	hitAndScore:{
		hit:function(){	theatre.score++;}
	},
	hitOnce:{
		hit:function(){	this.isHit=true;}
	},
	randomAge:{
		init:function(){this.age=rand(this.speed+10);}
	},
};

enchant.Puppet.clear = function(){
		enchant.Puppet.sceneEnterframeEventListener=[];
		enchant.Puppet.sceneStartEventListener=[];
	for( i in enchant.PuppetList){
		var puppet = enchant.PuppetList[i];
		var puppetArrays = window["___"+puppet.puppetName+"_array"];
		for(j in puppetArrays){
		console.log(puppetArrays[j]);
			puppetArrays[j].die();
		}
	}
}

enchant.Puppet.Theatre = enchant.Class.create(enchant.Game,{
	initialize:function(w,h){		
		enchant.Game.call(this,w,h);
	}
});	
rand = function(n){
	return ~~(Math.random()*n);
}
enchant.Puppet.ColorScreen = enchant.Class.create(enchant.Sprite,{
    initialize:function(start,end){
        enchant.Sprite.call(this,theatre.width,theatre.height);
        this.change(start,end);
    },
    change:function(start,end){
        var surface = new Surface(theatre.width,theatre.height);
        this.image = surface;
        var ctx = surface.context;
        ctx.beginPath();
        var grad  = ctx.createLinearGradient(0,0, 0,theatre.height);
        grad.addColorStop(0,start); 
        grad.addColorStop(1,end);
        ctx.fillStyle = grad; 
        ctx.rect(0,0,theatre.width,theatre.height);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
});
enchant.Puppet.Theatre.create=function(definition){
    window.onload = function(){
	   	var w=320;
    	var h=320;
        if(definition){
            w = definition.w ? definition.w :320;
	        h= definition.h ? definition.h :320;
        }
		theatre = new enchant.Puppet.Theatre(w,h);
        game = theatre;
        backdrop = new Group();
        theatre.rootScene.addChild(backdrop);
	    stage = new Group();
        theatre.rootScene.addChild(stage);
        
        //Making the backdrop
        var topGrad ="rgb(30,150,255)",bottomGrad="rgb(255,255,255)";
        if(definition){
            if(definition.backdrop){
                var bd = definition.backdrop;
                topGrad = bd.top;
                bottomGrad = bd.bottom;
            }
        }
        backdrop.screen = new enchant.Puppet.ColorScreen(topGrad,bottomGrad);
        backdrop.addChild(backdrop.screen);
        
		theatre.touchX = w/2;
		theatre.touchY = h/2;
		theatre.onload = function(){
			var listeners = Puppet.sceneStartEventListener;
			for(var i in listeners){
				listeners[i].func.call(window["___"+listeners[i].puppetName+"_definition"]);
			}
			
			theatre.rootScene.addEventListener('touchend',function(e){
				theatre.touchX = e.x;
				theatre.touchY = e.y;
			});
			theatre.rootScene.addEventListener('touchstart',function(e){
				theatre.touchX = e.x;
				theatre.touchY = e.y;
			});
			theatre.rootScene.addEventListener('touchmove',function(e){
				theatre.touchX = e.x;
				theatre.touchY = e.y;
			});
			theatre.rootScene.addEventListener('enterframe',function(e){
				var listeners = Puppet.sceneEnterframeEventListener;
				for(var i in listeners){
					listeners[i].func.call(window["___"+listeners[i].puppetName+"_definition"]);
				}
			});
			
            theatre.score=0;
            scoreBoard = new Label("SCORE:0");
            theatre.rootScene.addChild(scoreBoard);
            scoreBoard.addEventListener('enterframe',function(){
                this.text="SCORE:"+theatre.score;
            });
		};
        theatre.start();
    };
};

//パペット =enchant.Puppet.create;

パペット =enchant.Puppet;
パペット作成 = function(name,definition){
    return enchant.Puppet.create(name,definition);
}
    

var ジグザグX="zigzagX";
var ジグザグY="zigzagY";
var 上から現れる="randomAppearTop";
var 下から現れる="randomAppearBottom";
var 右から現れる="randomAppearRight";
var 左から現れる="randomAppearLeft";
var 右へ動く="moveRight";
var 左へ動く="moveLeft";
var 上へ動く="moveUp";
var 下へ動く="moveDown";
var ランダムな方向へ動く="moveRandomDir";
var タップすると移動="tapMove";
var タップするとX移動="tapMoveX";
var タップするとY移動="tapMoveY";
var タップするとスルスル移動="tapChase";
var タップするとスルスルX移動="tapChaseX";
var タップするとスルスルY移動="tapChaseY";
var ランダムに配置="randomSetup";
var 一人で登場="standAlone";
var 当たると消える="hitAndDie";
var 当たると得点="hitAndScore";
var 一回だけ当たる="hitOnce";



