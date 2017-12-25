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
/*------------------------1. 打开文件的方法--------------------------*/
/*
   1.1 fs.open(path, flags, [mode], callback);异步打开文件
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



     1.2 fs.openSync(path, flags,[mode])；同步打开文件 
	        返回一个表示文件描述符的整数。   
	        let fs=require('fs');
	        const fd=fs.openSync('fs1.txt','r');
	        console.log(fd);//3     
*/


/*------------------------2. 读取文件的方法--------------------------*/
/*
     2.1. fs.read(fd, buffer, offset, length, position, callback);
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

     2.2. fs.readSync(fd, buffer, offset, length, position)；
                   从 fd 指定的文件中读取数据——同步。 
                   返回 bytesRead 的数量。
            
            let fs=require('fs');
	        const fd=fs.openSync('fs1.txt','r');   
	        const buf=Buffer.alloc(10);	     
	        const byt=fs.readSync(fd, buf, 0, 4, null);
	        console.log(byt)//4

    2.3. fs.readFile(path[, options], callback);
                 异步地读取一个文件的全部内容。
                 如果未指定字符编码，则返回原始的 buffer。
				options <Object> | <string>
				encoding <string> | <null> 默认为 null。
				flag <string> 默认为 'r'。

        let fs=require('fs');
		fs.readFile('fs1.txt','utf8' ,(err, data) => {
		  if (err) throw err;
		  console.log(data);
		});

    2.4. fs.readFileSync(path[, options]);
                 fs.readFile() 的同步版本。 返回 path 的内容。

        let fs=require('fs');
		console.log(fs.readFileSync('fs1.txt'));
*/
   

     
/*------------------------3. 向文件中写入数据的方法--------------------------*/
/*
     3.1. fs.write(fd, buffer, offset, length[, position], callback);
                 通过文件的fd，向指定文件中写入buffer.异步方法

            let fs=require('fs');
	        const fd=fs.openSync('fs1.txt','r+');     
	        const buf=Buffer.alloc(3,'123'); 
	        fs.write(fd, buf, 0, 3, 0, function(err,bytesRead,buffer){
                     console.log(arguments)
                     console.log(buf)
	        });
    3.2. fs.writeSync(fd, buffer, offset, length, position);
                     通过文件的fd，向指定文件中写入buffer.同步方法。

	  
    3.3. fs.write(fd, string[, position[, encoding]], callback)；
             通过文件的fd，向指定文件中写入字符串类型的数据.
             如果 string 不是一个字符串，则该值将被强制转换为一个字符串。
               注意：在写入数据的时候，打开文件的方法模式，要改变，如'r+',读写模式。

	        let fs=require('fs');
	        const fd=fs.openSync('fs1.txt','r+');     
	        const str="hp";
	        fs.write(fd, str,2,'utf-8', function(err,written ,string){
                     console.log(arguments);
                     console.log(err);
                     console.log(written);//
                     console.log(string);        
	        });      
	     // 注意：不同于写入 buffer，该方法整个字符串必须被写入。 不能指定子字符串。
        
    3.4. fs.writeSync(fd, string[, position[, encoding]]);
                   通过文件的fd，向指定文件中写入string.同步方法。


    3.5. fs.writeFile(file, data[, options], callback);
                   异步地写入数据到文件，如果文件已经存在，则替代文件。 
                   data 可以是一个字符串或一个 buffer。
                   如果 data 是一个 buffer，则忽略 encoding 选项。它默认为 'utf8'。
                   file-文件名
                   data-string、Buffer、Uint8Array
                   options <Object> | <string>
							encoding <string> | <null> 默认 = 'utf8'
							mode     <integer> 默认 = 0o666
							flag     <string> 默认 = 'w'

					callback function(err)


                 let fs=require('fs');
		         const str="hp 123";
		         fs.writeFile('fs1.txt', str, function(err){
	                    console.log(err);
		         });


	3.6. fs.writeFileSync(file, data[, options]);
	            fs.writeFile() 的同步版本。返回 undefined。

*/


/*--------------------------------4. 关闭fs----------------------------------*/
/*
	4.1.fs.close(fd, callback);
	            完成操作后关闭文件。异步。 

	        let fs=require('fs');
	        const fd=fs.openSync('fs1.txt','r+');     
	        const str="hp";
	        fs.write(fd, str,2,'utf-8', function(err,written ,string){     
                     console.log(string);        
	        });  
	        fs.close(fd, function(err){
	        	    console.log(err);
	        	    console.log(arguments);
	        })  

	4.2. fs.closeSync(fd);完成操作后关闭文件，同步。  
/*

/*------------------------5.追加数据到一个文件的方法 -------------------------*/
/*
	5.1 fs.appendFile(file, data[, options], callback);
	       异步地追加数据到一个文件，如果文件不存在则创建文件。 
	       data 可以是一个字符串或 buffer。  

	       options <Object> | <string>
					encoding <string> | <null> 默认为 'utf8'
					mode <integer> 默认为 0o666
					flag <string> 默认为 'a'   
          

            let fs=require('fs');
	        const str="hp";
	        fs.appendFile('fs1.txt', str, function(err){
                    console.log(err);
                    console.log(arguments);
	        });

	6.2 fs.appendFileSync(file, data[, options]) ;
	          fs.appendFile() 的同步版本。 返回 undefined。       
*/	

/*------------------------6. 判断文件是否存的方法 -------------------------*/
/*
	6.1. fs.exists(path,callback);
	       判断文件是否存在返回一个布尔值，path为文件路径。
         
           let fs=require('fs');
	       fs.exists('fs1.txt',function(is_exists){
	         	    console.log(is_exists);
	       });
	       
	6.2. fs.existsSync(path); 判断文件是否存-同步方法。      				   
*/
         
/*------------------------7. 删除一个文件的方法 -------------------------*/
/*
    7.1  fs.unlink(path, callback); 删除一个文件 返回err
               
        let fs=require('fs');
        fs.unlink('fs1.txt', function(err){
	        if(err){
	             console.log('删除失败！');
	        }else{
	             console.log('删除成功！');
	        }
       });

    7.2 fs.unlinkSync(path);  删除一个文件-同步方法
                              返回 undefined。   
*/

/*-----------------------8. 文件重命名的方法------------------------------*/
/*
    8.1 fs.rename(oldPath, newPath, callback);
        
	       let fs=require('fs');
	       fs.rename('fs2.txt', 'rename', function(){
	       	        console.log(arguments);
	       });


    8.2 fs.renameSync(oldPath, newPath);同步方法 返回undefined。





*/

/*-----------------------9. 返回当前文件信息的方法------------------------------*/
/*
    9.1  fs.stat(path, callback);

	     let fs=require('fs');
		 fs.stat('fs2.txt', function(err,stats ){
		       console.log(err);
		       console.log(stats);
		 })
    
    9.2 fs.statSync(path);返回一个 fs.Stats 实例
*/

/*-----------------------10. 用watch监控文件的改变-----------------------------*/
 
/*
   10.1 fs.watch(filename[, options][, listener]);

        options <string> | <Object>
				persistent <boolean> 指明如果文件正在被监视，进程是否应该继续运行。
				                     默认 = true
				recursive <boolean>  指明是否全部子目录应该被监视，或只是当前目录。 
				                     适用于当一个目录被指定时，且只在支持的平台（详见 Caveats）。
				                     默认 = false
				encoding <string>    指定用于传给监听器的文件名的字符编码。默认 = 'utf8'

        listener <Function> | <undefined> Default: undefined
				 eventType <string>  返回事件类型
				 filename <string> | <Buffer>
		例：		 
        let fs=require('fs');
        fs.watch('fs2.txt', function(eventType,filename){
		          console.log(eventType);
		          console.log(filename);  
        });

        注意：fs.watch API 不是 100％ 跨平台一致的，且在某些情况下不可用。
    


    10.2 fs.watchFile(filename[, options], listener)；
                     当filename变化时，比较修改后文件和修改之前文件的所有信息
            options <Object>
					persistent <boolean> Default: true//进程是否应该继续运行
					interval <integer> Default: 5007 //表示目标应该每隔多少毫秒被轮询。
			listener <Function>
					current <fs.Stats>//当前的状态对象
					previous <fs.Stats>//以前的状态对象


		let fs=require('fs');
		fs.watchFile('fs2.txt', (curr, prev) => {
		  console.log(curr);
		  console.log(prev);
		});
*/




















/*----------------------- fs模块对文件夹的操作-----------------------------*/



/*-----------------1.文件夹的创建----------------------------------------------*/
/*
    1.1  fs.mkdir(path[, mode], callback);创建文件夹-异步方法
                 path 创建文件夹的路径
                 mode 模式
                 callback 回调是一个带有err参数的方法

	        let fs=require('fs'); 
		    fs.mkdir('new_dir', function(err){
		           console.log(err);
		           console.log(arguments);
		    })

    1.2  fs.mkdirSync(path[, mode])同步方法
*/

/*-----------------------2.文件夹的删除-----------------------------*/ 
/*
    2.1 fs.rmdir(path, callback);删除文件夹 异步
              callback 回调是一个带有err参数的方法

      let fs=require('fs'); 
	  fs.rmdir('newdir', function(err){
	          console.log(err);
			   console.log(arguments);
	  });
    
    2.2 fs.rmdirSync(path);同步方法
               返回undefined

*/  

/*-----------------------3.读取一个文件夹的内容-----------------------------*/ 
/*
    3.1 fs.readdir(path[, options], callback);异步
                  options <string> | <Object>
				           encoding <string> 默认 = 'utf8'
				  callback <Function>
						  err <Error>
						  files <string[]> | <Buffer[]> 

		异步的 readdir(3)。 读取一个目录的内容。 
		回调有两个参数 (err, files)，其中 files 
		是目录中不包括 '.' 和 '..' 的文件名的数组。				  

      let fs=require('fs');  
	  fs.readdir('../node_knowledge',function(err,files){
	        console.log(err);
	        console.log(files);
	  });
    

    3.2 fs.readdirSync(path[, options]);
           同步的 readdir(3). 返回一个不包括 '.' 和 '..' 的文件名的数组。 
*/  

   




 
 