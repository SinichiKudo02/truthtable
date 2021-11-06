const variables = ['a','b']
const expressions = ['! ( a || b )', '(!a && !b)', '(!a => !b)']


function trueValue(set, truths, reverse){
	var dataValue = {};

	set.forEach(v=>dataValue[v]=(truths.indexOf(v)>=0 ? true : false)^reverse);
	
	return dataValue;
}


function combinationValue(arr){
	var i=1, lastEl;

	arr = arr.map(v=>{
		return v.split('').sort().join('')
	}).sort();

	lastEl = arr[0];
	while(i<arr.length){
		if(arr[i] == lastEl){
			arr.splice(i,1);
		}else {
			lastEl = arr[i];
			i++;
		}
	}
	arr.arr.map(v=>{
		return v.split('')
	});

	return arr;
}

//generating the Truth Table
function writeTruthTable(truthData){
	var table = '<table cellpadding=0 cellspacing=0>',
		  keys,
		  vals,
		  exprRes;

		  table += '<thead><tr>';
		  variables.forEach(v=>{
			  table += '<th>';
			  table += v;
			  table += '</th>';
		  });
		  expressions.forEach(v=>{
			  table += '<th>';
			  table += v;
			  table += '</th>';
		  });
		  table += '</tr></thead>';
		  
		  truthData.forEach((v)=> {
			  vals = [];
			  keys = [];
			  table += '<tr>';
			  console.log(v);
			  for(i in v){
				  vals.push(v[i]);
				  keys.push(i);
				  table += '<td>';
				  table += v[i];
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
document.getElementById('getResult').addEventListener('click', ()=>{
	var len = variables.length,
				splitBy = Math.round(len/2),
				trueSet,
				trueVal = [],
				falseVal = [],
				truthData = [];

	//splitting the variables using the function split.
	variables =  document.getElementById('vars').value.split(',');
	expressions = document.getElementById('expression').value.split(',');

	truthData.push(truth(variables, variables, true));
	for(var i=1; i<=splitBy; i++){
		trueSet = combinationValue(permutation(variables,i));

		trueSet.forEach((truthSrc)=>{
			trueVal = trueValue(variables, truthSrc);
			truthData.push(trueVal);
		})
	}
	truthData.push(trueValue(variables,variables));
	writeTruthTable(truthData);
});

