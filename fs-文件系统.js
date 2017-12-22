/*
    File System-文件系统模块 (核心模块)
    用require('fs')引入，在使用其中的api。

     通过 require('fs') 使用该模块。 所有的方法都有异步和同步的形式。
      异步方法：异步方法的最后一个参数都是一个回调函数。传给回调函数的参数取决于具体方法，
                但回调函数的第一个参数都会保留给异常。 
                如果操作成功完成，则第一个参数会是 null 或 undefined。
      同步方法：当使用同步方法时，任何异常都会被立即抛出。 
                可以使用 try/catch 来处理异常，或让异常向上冒泡。         
*/
/*-------------------------------------fs模块的API--------------------------------*/
/*
   1. fs.open(path, flags, [mode], callback);异步打开文件
              path 要打开文件的路径
              fags 打开文件的模式
                   'r' - 以读取模式打开文件。
                   'w' - 以写入模式打开文件。
              mode 可设置文件模式(读、写、执行(4、2、1)权限)Default: 0o666,可读写.
              callback 回调函数
                       err 文件打开失败的错误保存在err里，打开成功err为null。
                       fd  被打开文件的标识(相当于id),根据fd来操作具体的哪个文件

		  let fs=require('fs');
		  fs.open('fs1.txt','r',function(err,fd){
		            console.log(err);//null
		            console.log(fd);//3
		  })
		  fs.open('fs1.txt','r',function(err,fd){
		            console.log(err);//null
		            console.log(fd);//4
		  })
         
         上面打开两次fs1.txt文件，但是fd是不同的。



     2. fs.openSync(path, flags,[mode])；同步打开文件 
        返回一个表示文件描述符的整数。   
        let fs=require('fs');
        const fd=fs.openSync('fs1.txt','r');
        console.log(fd);//3     


     3. fs.read(fd, buffer, offset, length, position, callback);
                从 fd 指定的文件中读取数据——异步。
	        fd ：成功打开时返回的fd值即要读取得文件
			buffer ：将读取的数据放到buffer中
			offset ：从buffer中的什么位置开始写入数据
			length ：是一个整数，指定要读取数据的字节数。
			position ：从文件中（数据）的什么位置开始读取。
			           position 为 null，则数据读取位置从当前文件开始读取。
			callback ：回调函数
			           err
			           bytesRead 返回buffer的长度
			           buffer 返回新的buffer对象


	        //1.引入文件系统模块儿
	        let fs=require('fs');
	        //2.代开文件
	        const fd=fs.openSync('fs1.txt','r'); 
	        //3.创建buffer保存数据 
	        const buf=Buffer.alloc(10); 
	        //4.读取数据
	        fs.read(fd, buf, 0, 4, null, function(err,bytesRead,buffer){
	                console.log(err);//null
	                console.log(bytesRead);//4
	                console.log(buffer);//<Buffer 61 62 63 64 00 00 00 00 00 00>
	                console.log(buffer.toString());//abcd NUL NUL NUL NUL NUL NUL 
	        })

     4. fs.readSync(fd, buffer, offset, length, position)；
                   从 fd 指定的文件中读取数据——同步。 
                   返回 bytesRead 的数量。
            
            let fs=require('fs');
	        const fd=fs.openSync('fs1.txt','r');   
	        const buf=Buffer.alloc(10);	     
	        const byt=fs.readSync(fd, buf, 0, 4, null);
	        console.log(byt)//4

*/
  
  
	      
	        
	      