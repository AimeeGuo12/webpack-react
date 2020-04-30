const fs = require('fs');
const path = require('path');

function writeFile(root, filePath, content) {
    let sep = /\//;
    if(/\\/.test(root)) {
        filePath = filePath.replace(/\//g, '\\');
        sep = /\\/
    }
    let filePathList = filePath.split(sep);
    let len = filePathList.length;
    let parentPath = path.normalize(root);
    if(!this.isFileExist(parentPath)){  // 创建文件的根路径
        try{
            fs.mkdirSync(parentPath);
        }
        catch(e){
            console.log(e);
        }
    }
    filePathList.map((item, index) => {
        let absPath = path.join(parentPath, item);
        if(len-1 !== index) {
            try{
                fs.mkdirSync(absPath)
            }
            catch(e){
                console.log(e)
            }
        }
        if(len-1 === index) {
            try{
                fs.writeFileSync(absPath, content);
            }
            catch(e) {
                console.log(e);
            }
        }
        parentPath = absPath;
    })
}

function isFileExist(filePath) {
    try {  // http://nodejs.cn/api/fs/fs_accesssync_path_mode.html
        fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
        // console.log('可以读写');
        return true;
      } catch (err) {
        // console.error('无权访问');
        return false;
      }
}

// 文件复制
function copyFile(root, src, dst) {
    try{
        let content = fs.readFileSync(src, {
            encoding: 'utf8'
        });
        this.writeFile(root, dst.replace(root, ''), content);
    }
    catch(e) {
        console.log('copy Error', e);
    }
}

// 复制一个目录
function copyDirSync(root, src, dst, ignoreList) {
    if(ignoreList === undefined) {
        ignoreList = [];
    }
    try {
		let demoFiles = fs.readdirSync(src);

		demoFiles.map(file => {
			if (ignoreList.indexOf(file) < 0) {
				let fileDir = path.join(src, file);
				let tarDir = path.join(dst, file);
				let stat = fs.statSync(fileDir);

				if (stat.isFile()) {
					this.copyFile(root, fileDir, tarDir);
				} else if (stat.isDirectory()) {
					// mkdir(tarDir);
					this.copyDirSync(root, fileDir, tarDir);
				}
			}
		});
		return true;
	} catch (e) {
		console.error('copyDirSync', e.message);
		return false;
	}
}
function Hammer() {
    this.writeFile = writeFile;
    this.isFileExist = isFileExist;
    this.copyFile = copyFile;
    this.copyDirSync = copyDirSync;
}
module.exports = new Hammer();