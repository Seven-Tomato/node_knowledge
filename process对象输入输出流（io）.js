/*
    process对象下两个重要的属性

    stdin和stdout：标准输入输出流（IO）

    标准输入设备；
		向计算机输入数据和信息的设备。是计算机与用户或其他设备通信的桥梁。
		输入设备是用户和计算机系统之间进行信息交换的主要装置之一。
		键盘，鼠标，摄像头，扫描仪，光笔，手写输入板，游戏杆，
		语音输入装置等都属于输入设备。


    标准输出设备：
        输出设备(Output Device)是计算机硬件系统的终端设备，
        用于接收计算机数据的输出显示、打印、声音、控制外围设备操作等。
        也是把各种计算结果数据或信息以数字、字符、图像、声音等形式表现出来。
        常见的输出设备有显示器、打印机、绘图仪、影像输出系统、语音输出系统、磁记录设备等。


        stdin和stdout提供了输入数据和输出数据的方法
        我们也通常称称为——IO操作



*/

 //stdout.write()方法输出数据
 /*
	  function Log(data){
	  	  process.stdout.write(data);
	  }
	  Log("hello 你妹妹的！");
 */

 
//stdin
 /*
  process.stdout.write('请输入姓名：');//向屏幕输出，提示信息，要求输入内容
  process.stdin.on('data', function (chunk) {//监听用户的输入
         process.stdout.write("您的名字是："+chunk);// 向屏幕输出，输入的chunk(数据块)值 
  });
 */

  process.stdout.write('请输入姓名：');
  process.stdin.on('data', function (chunk) {
        console.log(chunk);
  });