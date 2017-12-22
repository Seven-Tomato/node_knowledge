/*
     在nodejs中一个js文件就是一个模块儿
     每个模块儿都有自己的作用域
     所以下面代码,声明一个变量a，a在当前js的作用域下，不在global作用域下。
     所以打印结果是undefined

     var a=1;
	 console.log(global.a);//undefined

	 下面用global定义变量a,并用global.a来访问global下的变量a.

	  var a=60;
	  global.a=100;
	  console.log(a);//60
	  console.log(global.a);//100


*/  

/*
	__filename :当前文件被解析后的绝对路径；（每个js文件都有这个属性）
	__filename不是全局的，是当前模块儿（作用域）下的，指向当前模块儿。

	console.log(__filename );
*/