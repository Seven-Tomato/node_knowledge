/*
     在 ECMAScript 2015 (ES6) 引入 TypedArray 之前，
     JavaScript 语言没有读取或操作二进制数据流的机制。
     Buffer 类被引入作为 Node.js API 的一部分，
     使其可以在 TCP 流或文件系统操作等场景中处理二进制数据流。


     Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。
     Buffer 的大小在被创建时确定，且无法调整。

     Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer。
*/
 /*----------------------------1. Buffer 类(静态)的方法-----------------------------*/
 /* 1.1.Buffer.alloc(size, fill, encoding);
      size <integer> 新建的 Buffer 期望的长度
      fill <string> | <Buffer> | <integer> 用来预填充新建的 Buffer 的值。 默认: 0
      encoding <string> 如果 fill 是字符串，则该值是它的字符编码。 默认: 'utf8'
      分配一个大小为 size 字节的新建的 Buffer 。 如果 fill 为 undefined ，则该 Buffer 会用 0 填充。

       const buf = Buffer.alloc(5,"a");
       console.log(buf);//<Buffer 61 61 61 61 61>

       //上面代码为Buffer分配5个长度，用a来填充，显示的是16进制的a.
         调用 Buffer.alloc() 会明显地比另一个方法 Buffer.allocUnsafe() 慢，
         但是能确保新建的 Buffer 实例的内容不会包含敏感数据。


    1.2.Buffer.allocUnsafe(size);
	    分配一个大小为 size 字节的新建的 Buffer 。 
	    如果 size 大于 buffer.constants.MAX_LENGTH 或小于 0，
	    则抛出 RangeError 错误。 如果 size 为 0，则创建一个长度为 0 的 Buffer。

	    以这种方式创建的 Buffer 实例的底层内存是未初始化的。
	    新创建的 Buffer 的内容是未知的，且可能包含敏感数据。
	    可以使用 buf.fill(0) 初始化 Buffer 实例为0。


	    const buf = Buffer.allocUnsafe(10);
        console.log(buf);//(内容可能不同)<Buffer 18 00 7c 00 00 00 00 00 00 00>
        buf.fill(0);
        console.log(buf);//<Buffer 00 00 00 00 00 00 00 00 00 00>


    1.3 Buffer.from(string, encoding) ；
        新建一个包含所给的 JavaScript 字符串 string 的 Buffer 。 
        encoding 参数指定 string 的字符编码。

        const buf1 = Buffer.from('this is a test');
        console.log(buf1.toString());//this is a test

     1.4 Buffer.from(array);
         通过一个八位字节的数组创建一个新的 Buffer 。
         
         const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
         console.log(buf);//<Buffer 62 75 66 66 65 72>       


     1.5 Buffer.isEncoding(encoding);
         如果 encoding 是一个支持的字符编码则返回 true，否则返回 false 。

         Node.js 目前支持的字符编码包括：
		'ascii' - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
		'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
		'utf16le' - 2 或 4 个字节，小字节序编码的 Unicode 字符。
		            支持代理对（U+10000 至 U+10FFFF）。
		'ucs2' - 'utf16le' 的别名。
		'base64' - Base64 编码。当从字符串创建 Buffer 时，
		           按照 RFC4648 第 5 章的规定，这种编码也将正确地接受“URL 与文件名安全字母表”。
		'latin1' - 一种把 Buffer 编码成一字节编码的字符串的方式
		          （由 IANA 定义在 RFC1345 第 63 页，用作 Latin-1 补充块与 C0/C1 控制码）。
		'binary' - 'latin1' 的别名。
		'hex' - 将每个字节编码为两个十六进制字符。
		 const result= Buffer.isEncoding('hex')
         console.log(result)


      1.6 Buffer.isBuffer(obj) ;
          如果 obj 是一个 Buffer 则返回 true ，否则返回 false 。

          const buf1=Buffer.from("toamto");
	      const buf2=Buffer.alloc(6,"toamto");
	      const buf3=Buffer.allocUnsafe(6);
	      console.log(Buffer.isBuffer(buf1));//true
	      console.log(Buffer.isBuffer(buf2));//true
	      console.log(Buffer.isBuffer(buf3));//true
	      const a={};
	      let b=[1,2,3];
	      console.log(Buffer.isBuffer(a));//false
	      console.log(Buffer.isBuffer(b));//false


      1.7 Buffer.byteLength(string, encoding);
           返回一个字符串的实际字节长度。 
           这与 String.prototype.length 不同，
           因为那返回字符串的字符数。

           const buf=Buffer.from("你");
           console.log(Buffer.byteLength(buf));//3

      1.8 Buffer.concat([list], totalLength);
            list <Array> 要合并的 Buffer 或 Uint8Array 实例的数组
            totalLength <integer> 合并时 list 中 Buffer 实例的总长度
            返回一个合并了 list 中所有 Buffer 实例的新建的 Buffer 。
           
            const buf1=Buffer.alloc(1,'a');
            const buf2=Buffer.alloc(2,'b');
            const buf3=Buffer.alloc(3,'c');
            console.log(Buffer.concat([buf1,buf2,buf3]));
 */     
       
 /*----------------------------2. buf的属性和方法-----------------------------*/
 /*
    2.1 buf[index]
        索引操作符 [index] 可用于获取或设置 buf 中指定 index 位置的八位字节。
        这个值指向的是单个字节，所以合法的值范围是的 0x00 至 0xFF（十六进制）
        ，或 0 至 255（十进制）。


    const str = 'Node.js';
	const buf = Buffer.allocUnsafe(str.length);//长度必须是数字

	for (let i = 0; i < str.length; i++) {
	  buf[i] = str.charCodeAt(i);//返回str的指定位置的Unicode 编码（16进制的）
	}
	 console.log(buf);//<Buffer 4e 6f 64 65 2e 6a 73>
	 console.log(buf.toString());//Node.js

    上面代码,有一个长度为str.length的buf，将str每个字符的Unicode 编码
    保存到buf中，最后在转换成字符串输出。
    





    2.2 buf.values();
        创建并返回一个包含 buf 的值（字节）的迭代器。 
        注意：当 Buffer 使用 for..of 时会自动调用该函数。

	      const buf=Buffer.from('fuffer');
	      for (const value of buf.values()) {
	           console.log(value);//转换成了10进制的ascll编码
	      }


	      由于buf使用 for..of 时会自动调用.values()函数。所以上面的代码等价等价于下面的代码
	      const buf=Buffer.from('fuffer');
	      for (const value of buf) {
	           console.log(value);//转换成了10进制的ascll编码
	      }

    2.3 buf.toString([encoding[, start[, end]]]);
             encoding <string> 解码使用的字符编码。默认: 'utf8'
	         start <integer> 开始解码的字节偏移量。默认: 0
			 end <integer> 结束解码的字节偏移量（不包含）。 默认: buf.length
			 返回: <string>
			 根据 encoding 指定的字符编码解码 buf 成一个字符串。 
			 start 和 end 可传入用于只解码 buf 的一部分。

        var buf =Buffer.from("tomato");
        console.log(buf.toString('ascii',2,4));//ma 留头不留尾


	2.4 buf.write(string, offset, length, encoding);   
	            string <string> 要写入 buf 的字符串。
				offset <integer> 开始写入 string 前要跳过的字节数。默认: 0。
			    length <integer> 要写入的字节数。默认: buf.length - offset。
				encoding <string> string 的字符编码。默认: 'utf8'。 

        const str="tomato";
        var buf =Buffer.allocUnsafe(7);
        buf.fill();
        console.log( buf);//<Buffer 00 00 00 00 00 00 00>
        buf.write(str,1,4);
        console.log( buf);//<Buffer 00 74 6f 6d 61 00 00>
        
        上面为buf分配了7个单位的空间，将str从buf的第一位后插入，
        插入str的长度为4位（toma）

    2.5 返回 buf 的 JSON 格式。 
        当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该函数。

        var buf =Buffer.allocUnsafe(0);
        console.log(buf.toJSON());//{ type: 'Buffer', data: [] }

    2.6 buf.slice([start[, end]]) ;
            start <integer> 新建的 Buffer 开始的位置。 默认: 0
            end <integer> 新建的 Buffer 结束的位置（不包含）。 默认: buf.length
            返回一个指向相同原始内存的新建的 Buffer，
            但做了偏移且通过 start 和 end 索引进行裁剪。

             const buf = Buffer.from('buffer');
             console.log(buf.slice(-5,-2).toString());//uff
             取负值表示从=（从负值+字符串的length）开始取

     注意:修改这个新建的 Buffer 切片，也会同时修改原始的 Buffer 的内存，
          因为这两个对象所分配的内存是重叠的。


    2.7 buf.copy(target, targetStart, sourceStart, sourceEnd);
        target <Buffer> | <Uint8Array> 要拷贝进的 Buffer 或 Uint8Array。
        targetStart <integer> target 中开始拷贝进的偏移量。 默认: 0
        sourceStart <integer> buf 中开始拷贝的偏移量。 
                              当 targetStart 为 undefined 时忽略。 默认: 0
        sourceEnd <integer> buf 中结束拷贝的偏移量（不包含）。 
                             当 sourceStart 为 undefined 时忽略。 默认: buf.length
    拷贝 buf 的一个区域的数据到 target 的一个区域，即便 target 的内存区域与 buf 的重叠。

    const buf1 = Buffer.allocUnsafe(26).fill("o");
    const buf2 = Buffer.allocUnsafe(26).fill('!');
    console.log(`buf1 ${buf1}`);
    console.log(`buf2 ${buf2}`);
    buf1.copy(buf2,2,3,6);
    console.log(`buf2 ${buf2}`);

 */    

  