var variables = ['a','b']
var expressions = ['! ( a || b )', '(!a && !b)'];

//function for creating the logic per connectives
function trueValues(set, truths, reverse) {
	var obj = {};
	
	set.forEach(value=>obj[value]=(truths.indexOf(value)>=0 ? true : false)^reverse);
	
	return obj;
}


//function for the combination of expressions
function combinationValue(arr) {
	var i=1,lastEl;

	arr = arr.map(value=>{return value.split('').sort().join('')}).sort();
	
	lastEl = arr[0];
	while(i<arr.length) {
		if(arr[i] == lastEl) {
			arr.splice(i,1);
		} else {
			lastEl = arr[i];
			i++;
		}
	}
	
	arr = arr.map(value=>{return value.split('')});
	
	return arr;
}

//function for generating the Truth Table
function writeTruthTable(truthData) {
	var table = '<table cellpadding=1 cellspacing=1>'
		,keys
		,vals
		,exprRes;
		
	table += '<thead><tr>';
	variables.forEach(value=>{
		table += '<th>';
		table += value;
		table += '</th>';
	});
	expressions.forEach(value=>{
		table += '<th>';
		table += value;
		table += '</th>';
	});
	table += '</tr></thead>';
	
	truthData.forEach((value)=> {
		vals = [];
		keys = [];
		table += '<tr>';
		console.log(value);
		for(i in value){
			vals.push(value[i]);
			keys.push(i);
			table += '<td>';
			table += value[i];
			table += '</td>';
		};
		for(var i = 0; i<keys.length; i++) {
			eval(`var ${keys[i]} = ${vals[i]};`);
		}
		expressions.forEach((expr)=>{
			exprRes = eval(expr);
			table += `<td class="${exprRes}">`;
			table += exprRes ? 'T' : 'F';
			table += '</td>';
		});
		
		table += '</tr>';
	});
	
	table += '</table>';
	
	document.getElementById('result').innerHTML = table;
}
	
function permutation(arr, csets) {
	var buffer = []
		,len
		,arrSlice
		,permArr
		,proArr;
	if(csets<=1) {
		return arr;
	} else {
		len = arr.length;
		for(var i=0;i<len;i++) {
			arrSlice = arr.slice(0,i).concat(arr.slice(i+1));
			permArr = permutation(arrSlice,csets-1);
			proArr = [];
			for(var y=0; y<permArr.length; y++) {
				proArr.push([arr[i]].concat(permArr[y]).join(''));
			}
			buffer.push(...proArr);
		}
	}
	return buffer;
}

//targeting the specific element
//when the button is triggered it will get the results
document.getElementById('getResult').addEventListener('click', ()=>{
	var len = variables.length
		,splitBy = Math.round(len/2)
		,trueSet
		,trueVal = []
		,falseVal = []
		,truthData = [];
	
	variables = document.getElementById('vars').value.split(',');
	expressions = document.getElementById('expression').value.split(',');

	
	truthData.push(trueValues(variables, variables, true));
	for(var i=1; i<=splitBy; i++) {
		trueSet = combinationValue(permutation(variables, i));
		
		trueSet.forEach((truthSrc)=>{
			trueVal = trueValues(variables, truthSrc);
			truthData.push(trueVal);
		});
		
		
	}
	truthData.push(trueValues(variables, variables));
	
	writeTruthTable(truthData);
});

