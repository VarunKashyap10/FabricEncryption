
function setGlobalProjectPath(){


//File to execute and display docker containers.
var path=__dirname;
//print(path);
var pos=path.lastIndexOf("project");
console.log(pos);
global.projectPath=path.slice(0,pos);


console.log(projectPath);
}

function dockerShow(){
    var nrc=require("node-run-cmd");
    nrc.run("${projectPath}/project/network/dockerContain.sh");
}
setGlobalProjectPath();
dockerShow();