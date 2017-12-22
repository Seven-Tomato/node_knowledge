/*
   全局变量在所有模块中均可使用。 但以下变量的作用域只在模块内：

    __filename  反回当前模块的绝对路径
    __dirname   反回当前模块文件所在目录解析后的绝对路径
    exports     反回当前模块的exports对象
    module      反回当前模块的一些信息
    require()   返回所加载模块的exports对象
    看似全局但不是全局，只在自己当前的模块作用域中。
*/
/*-----------------------------------global对象----------------------------------------*/
//1. 有些内置对象是 JavaScript 语言本身的一部分，它们也是全局的。
/*
  如 Date()时间对象，setInterval()......

  global.setInterval(function(){
    let d=new Date();
    console.log(`现在是 ${d.getFullYear()}年 ${d.getMonth()}月 ${d.getDate()}日 ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` )
  },1000);
*/


//2. 以下的对象是特定于 Node.js 的
/*
   2.1 process（进程）对象
       通过这个对象提供的属性和方法，使我们可以对当前运行的程序的进程进行访问和控制。

        2.1.1 process.argv属性
              返回一个数组，这个数组包含了启动Node.js进程时的命令行参数。
              第一个元素为process.execPath。(执行程序的路径)
              第二个元素为当前执行的JavaScript文件路径。
              剩余的元素为其他命令行参数。

        2.1.2 process.execPath 属性；
              返回启动Node.js进程的可执行文件所在的绝对路径。
  
        2.1.3 process.env属性；
              返回一个包含用户环境信息的对象 

        2.1.4 process.version属性；
              返回Node.js的版本信息。 
        
        2.1.5 process.versions属性；
              返回一个对象，此对象列出了Node.js和其依赖的版本信息。

        2.1.6 process.pid(进程标识符)属性;
              返回进程的PID。      
        
        2.1.7 process.title 属性;
              用于获取或设置当前进程在 ps 命令中显示的进程名字 

        2.1.8 process.arch 属性;
              返回一个标识Node.js在其上运行的处理器架构的字符串。
              例如 'arm', 'ia32', or 'x64'.

        2.1.9  process.platform属性;
              返回字符串，标识Node.js进程运行其上的操作系统平台。
              例如'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'  

        2.1.10  process cwd() 方法;
               返回 Node.js 进程当前工作的目录。 

        2.1.11  process.chdir()方法;
               变更Node.js进程的当前工作目录，如果变更目录失败会抛出异常(例如，如果指定的目录不存在)。

        2.1.12 process.memoryUsage()方法;
               返回Node.js进程的内存使用情况的对象，该对象每个属性值的单位为字节。

        2.1.13 process.exit()方法; 退出进程 
              
        2.1.14 process.kill()方法; 
               将signal发送给pid标识的进程。/干掉进程
               
*/ 

/*
   还有很多特定于 Node.js 的对象那可查阅nodejs api
*/
 