function removeRedundantSpaces(line) {
    //split by whitespace
    var keys = line.split(/\s+/i);
    console.log(keys);
    var res = "";
    for(var i=0; i< keys.length; i++) {
        res += keys[i] + ' ';

    }
    console.log(res);
    res = res.trim();
    return res;
}
function preprocess2(code){
    code1 = code.split('\n');
    //iterate over lines
    microtable = [];
    for(var i=0; i < code1.length; i++) {
        var line = code1[i].trim();
        //remove empty lines
        
        if(!(line==="")) {
             if(line.match(/macro/i))
            {
                microtable.push(line.split(' ')[0]);
            }

        }
        return microtable;
    }
}
function preprocess(code) {
    //split into lines
    //microtable = preprocess2(code);
    //alert(microtable);
    code2 = [];
    code2 = code;
    code = code.split('\n');
    //iterate over lines
    newCode = [];
    newCode2 = [];
    var count=0;
    for(var i=0; i < code.length; i++) {
        var line = code[i].trim();
        //remove empty lines
        if(!(line==="")) {
        //labels
        if(mt = line.match(reLabel)) {
            //fill empty with nop
            if(mt[2].trim() === "") {
                newLine = mt[1] + ':' + ' NOP';
            }
            else {
                newLine = mt[1] + ':' + ' ' + mt[2];
            }
        }
        //otherwise
        else {
            newLine = line;
        }


        //remove redundant spaces
        newLine = removeRedundantSpaces(newLine);

        //convert to upper case

        newLine = newLine.toUpperCase();
        if (line.match(/db/i))
        {
        newCode2.push(newLine);
        continue;
        }
        /*var str1= "MACRO";
        if(str1.localeCompare(line.match(/macro/i))){
            for(var j=0;j<microtable.length;j++){
                var sym=microtable[j];
                //alert("sym");
                if(line.match(sym)){
                  newCode.push(callmacro(line,code2));  
                }
            }
        }*/

        //push newline
        newCode.push(newLine);
    }
    }

    var newString = "";
    for(var i=0; i < newCode.length; i++) {
        newString += newCode[i] + '\n';
    }
    for(var i=0; i < newCode2.length; i++) {
        newString += newCode2[i] + '\n';
    }

    //return
    return newString;

}