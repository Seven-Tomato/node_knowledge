/*
  监控文件或者文件夹用fs.watch方法。
  
  下面的代码：就是前端自动化构建各种管理工具的原理。
  可以根据项目需要，用node.js 写出自己的自动化管理工具。
  下码代码：
  在watch_dir文件夹下创建的子文件（不涉及子文件夹）
  都会合并到一个index文件里，当一个子文件里的数据发生改变，
  相应的index里，合并的那一部份也发生改变。

*/
 let fs=require('fs');
 const dirPath='./watch_dir';
// 例子，处理 fs.watch 监听器
fs.watch(dirPath, function(ev,filename){
     //读取watch_dir里所有的文件（不涉及子文件夹）
     //只要有一个文件发生变化了，就对这个文件夹下所有的文件进行读取，然后合并。
    if(filename){//如果文件存在才进行接下来的操作
        //1.当watch_dir文件夹监控到变化的时候，读取watch_dir文件夹文件夹里所的文件（不涉及子文件夹）
        fs.readdir(dirPath,function(err,filelist){
            let arr=[];//将watch_dir文件夹，下的所有文件放在一个数组里。
            filelist.forEach(function(ifile){
                 var info=fs.statSync(dirPath+'/'+ifile);
                 if(info.mode==33206){//表示文件夹
                    arr.push(dirPath+'/'+ifile)
                 }
                
            })
          
            //读取数组中的文件内容，并合并。
            let content="";
             arr.forEach(function(f){
                let text=fs.readFileSync(f);
                  // console.log(text.toString()); 
                  content+=text.toString()+'\n';
             })
            //console.log(content); 
            //将合并的内容把存到一个js文件里
            fs.writeFileSync('./index.js',content);
        });
   }  
});