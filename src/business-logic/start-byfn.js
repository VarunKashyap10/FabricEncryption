function byfnStart(){
    const exec = require('child_process').exec;
    const child=require('child_process').child;
    const testscript = exec('sh ${projectPath}/network/dockerContain.sh ');
   // print("Hello");
    testscript.stdout.on('data', function(data){
        console.log(data); 
        // sendBackInfo();
    });
    
    testscript.stderr.on('data', function(data){
        console.log(data);
        // triggerErrorStuff(); 
    });
}

byfnStart();