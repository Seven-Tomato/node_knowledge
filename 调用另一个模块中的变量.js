/*
  require('./node4.js');
  console.log(a);//a is not defined

  上面代码中加载node4.js文件后，直接访问node4.js中的变量a，
  是访问不到的（每个文件即模块都有自己的作用域）。
  所以通过下面几种方式来访问node4.js文件中的变量a:
*/
/*
   1.把node4.js中的变量a，当最global对象的属性。(但是不推荐这种方式)
   
   2.使用模块对象 module （module对象保存着、提供当前模块的一些信息）
     require('./node4.js')返回值是node4.js下module对象的exports对象
     所以可以将node4.js的变量a挂在，node4.js module对象的exports对象上
     这里再拿到
     console.log(require('./node4.js'));//{ a: 10 }
   注意(1)：
        在模块作用域中，还有一个内置的模块对象,exports,它其实就是module.exports对象。
        console.log(exports===module.exports);//true
   注意(2)：
        require('./node4.js')返回值指向的是node4.js中的exports对象，
        如果在node4.js文件中将本生的module.exports对象指向另一个对象：
        如（在node4.js文件）：
           var a=10;
           exports.a=a;
           module.exports=[1,2,3];
        在当前文件中执行 console.log(require('./node4.js').a); //undefiuned 

        在node4.js文件中module.exports=[1,2,3];断开了exports与原本对象的指向关系，
        所以在当前文件中访问不到a变量。
*/  
  
 