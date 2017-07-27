function getregister(arg){
	var str="";
	switch(arg)
	{
		case 'M':
			str+="110";
			break;
		case 'A':
			str+="111";
			break;
		case 'B':
			str+="000";
			break;
		case 'C':
			str+="001";
			break;
		case 'D' :
			str+="010";
			break;
		case 'E':
			str+="011";
			break;
		case 'L':
			str+="101";
			break;
		case 'H':
			str+="100";
			break;
		case 'PSW':
			str+='110';
			break;
	}
	return str;
}

function machinecode(code){
	code = code.split('<br>');
    //iterate over lines
    newCode = [];
    for(var i=0; i < code.length; i++) {
        var line = code[i].trim();
        //remove empty lines
        if(!(line==="")) {
            var inst = line.split(' ')[0];
            var args = line.split(' ')[1];
            var str = "";
            
            switch(inst){
            	case "MOV":
            		str+="01";
            		str+=getregister(args.split(',')[0]);
            		str+=getregister(args.split(',')[1]);
            		break;
            	case "MVI":
            		str="00";
            		args = args.split(',');
            		str+=getregister(args[0]);
            		str+="110<br>";
            		var blah = parseInt(args[1],10).toString(2);
            		while(blah.length < 8){
            			blah = '0'+blah;
            		}
            		str+=blah;
            		break;
            	case "LDA":
            		str = "00111010<br>";
            		args = args.slice(2,-1);
     				args = parseInt(args, 10).toString(2);
     				while(args.length < 16){
     					args = '0'+args;
     				}	
            		str+= args.slice(0,-8);
            		str+= "<br>";
            		str+= args.substring(8);
            		break;
            	case "LXI":
            		str+="00100001<br>";
            		args = args.slice(2,-1);
            		args = parseInt(args, 10).toString(2);
     				while(args.length < 16){
     					args = '0'+args;
     				}	
            		str+= args.slice(0,-8);
            		str+= "<br>";
            		str+= args.substring(8);
            		break;
            	case "STA":
            		str+="00110010<br>";
            		args = args.slice(2,-1);
            		args = parseInt(args, 10).toString(2);
     				while(args.length < 16){
     					args = '0'+args;
     				}	
            		str+= args.slice(0,-8);
            		str+= "<br>";
            		str+= args.substring(8);
            		break;
            	case "PUSH":
            		str+="11";
            		str+=getregister(args);
            		str+="101";
            		break;
            	case "POP":
            		str+="11";
            		str+=getregister(args);
            		str+="001";
            		break;
            	case "ADD":
            		str+="10000";
            		str+=getregister(args);
            		break;
            	case "ADI":
            		str+="11000110<br>";
            		var blah = parseInt(args,10).toString(2);
            		while(blah.length < 8){
            			blah = '0'+blah;
            		}
            		str+=blah;
            		break;
            	case "SUB":
            		str+="10010";
            		str+=getregister(args);
            		break;
            	case "SUI":
            		str+="11010110<br>";
            		var blah = parseInt(args,10).toString(2);
            		while(blah.length < 8){
            			blah = '0'+blah;
            		}
            		str+=blah;
            		break;
            	case "NOP":
            		str = "00000000";
            		break;
            	case "HLT":
            		str+="11001001";
            		break;
            	case "JMP":
            		str = "11000011<br>";
            		args = args.slice(2,-1);
            		args = parseInt(args, 10).toString(2);
     				while(args.length < 16){
     					args = '0'+args;
     				}	
            		str+= args.slice(0,-8);
            		str+= "<br>";
            		str+= args.substring(8);
            		break;
            	case "JZ":
            		str+="11001010";
            		break;
            	case "JNZ":
            		str+="11000010";
            		break;
            	case "JLT":
            		str+="11111010";
            		break;
            	case "JGT":
            		str+="11110010";
            		break;
            	case "JEQ":
            		str+="11101010<br>";
            		args = args.slice(2,-1);
            		args = parseInt(args, 10).toString(2);
     				while(args.length < 16){
     					args = '0'+args;
     				}	
            		str+= args.slice(0,-8);
            		str+= "<br>";
            		str+= args.substring(8);
            		break;
            	case "CALL":
            		str+="11001101<br>";
            		args = args.slice(2,-1);
            		args = parseInt(args, 10).toString(2);
     				while(args.length < 16){
     					args = '0'+args;
     				}	
            		str+= args.slice(0,-8);
            		str+= "<br>";
            		str+= args.substring(8);
            		break;
            	case "RET":
            		str+="11001001";
            		break;
            }
            if(inst.slice(0,inst.length-1)=='d')
            {
            	var blah = parseInt(inst.substring(1),10).toString(2);
            	while(blah.length < 8){
     				blah = '0'+blah;
     			}
     			str+=blah;
            }
            newCode.push(str);
        }
    }
    //alert(newCode);
    var newString = "";
    for(var i=0; i < newCode.length; i++) {
        newString += newCode[i] + '<br>';
    }

    //return
    return newString;
}