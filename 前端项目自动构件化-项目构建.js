/*
  项目构建
  项目名字 my project
   文件夹：
         1.css文件夹
         2.js文件夹
         3.img文件夹
         4.index页面
         \n 换行
         \t 缩进
*/
let projectDate = {
    'name': 'my_project',
    'fileDate': [{
        'name': 'css',
        'type': 'dir'
    }, {
        'name': 'js',
        'type': 'dir'
    }, {
        'name': 'img',
        'type': 'dir'
    }, {
        'name': 'index.html',
        'type': 'file',
        'content': '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>title</title>\n\t\t<meta charset="utf-8">\n\t</head>\n\t<body>\n\t\t<h1>这是运用node.js构建的项目<h1/>\n\t</body>\n</html>'
    }]
}
let fs = require('fs');
if (projectDate.name) {
    fs.mkdirSync(projectDate.name);
    let dirList = projectDate.fileDate;
    if (dirList && dirList.forEach) {
        dirList.forEach(function(item) {
            item.path = projectDate.name + '/' + item.name;
            item.content = item.content || "";
            switch (item.type) {
                case 'dir':
                    fs.mkdirSync(item.path);
                    break;
                case 'file':
                    fs.writeFileSync(item.path,item.content);
                    break;
                default:
                    break;
            }
        })
    }
}