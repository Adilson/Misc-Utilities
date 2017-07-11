//http://www.bbc.co.uk/programmes/articles/5LCB3rN2dWLqsmGMy5KYtBf/puzzle-for-today
var dict = new Array(28);
dict[0] = ' ';
for (var i=65; i<65+26; i++)
	dict[i-64] = String.fromCharCode(i);
dict[27] = '-';

var arr = new Array(70);
for (var i=0; i<70; i++)
{
	arr[i] = 0;
}

var hConds = new Array(5);
hConds[0] = /[^XZVCHFJLQM]+/g;
hConds[1] = /[^PZVJG]{4}(.)[EFUG]{6}\1[^\sPZVJI]{2}/g;
hConds[2] = /[^\sPQFB]{7}[^MGVAJNZ\s]+[^MVZJ]/g;
hConds[3] = /N[OYSRU]{5}[NICE]{6}\s\-/g;
hConds[4] = /.A[A\sDL]{4}O[AECLV\s]+/g;

var vConds = new Array(14);
vConds[0] = /\sA?(SA|PE|N\s){2}/g;
vConds[1] = /([XYZ])(P|GO|EL)\1./g;
vConds[2] = /(LS|CA|OS)[L\sP][DO]{2}/g;
vConds[3] = /(U)(T)\2\1[AOB?]/g;
vConds[4] = /(.)\1\1\1\s/g;
vConds[5] = /(FF|BE|QU|OS){2}L/g;
vConds[6] = /ES?F?(OBZ|UCO|PTE)/g;
vConds[7] = /S[MVU]B(TZ|BP|IV)/g;
vConds[8] = /T[GLMV]{2}(E)\1/g;
vConds[9] = /(JK|AE|EN|MG){2}L/g;
vConds[10] = /N(XN|ZB|CA|FS){2}/g;
vConds[11] = /[XHDJ]R[MZVIJ]EC/g;
vConds[12] = /X?W(\sE|OS|PE){2}/g;
vConds[13] = /[VIMZJ]{3}\-\s/g;


function getRow(i)
{
	var ret = arr.slice(i*14, (i+1)*14);
	return ret.map(x=>dict[x]).join('');
}

function getCol(j)
{
	return [0,1,2,3,4].map(x=>dict[arr[x*14+j]]).join('');
}

function incrCol(j)
{
	arr[56+j] += 1;
	for (var i=4; i>0; i--)
	{
		if (arr[(14*i)+j] >= dict.length)
		{
			arr[(14*i)+j] = 0;
			arr[(14*i)+j-14] += 1;
		}
		else
		{
			break;
		}
	}
}

var colSolutions = vConds.map(x=>[]);
for (var j=0; j<vConds.length; j++)
{
	for (var r=0; r<28**5-1; r++)
	{
		var col = getCol(j);
		if (vConds[j].test(col)) 
			colSolutions[j].push(col);
		incrCol(j);
	}
	console.log(colSolutions[j].length);
}


//A esta altura colSolutions é um array, onde cada posição é uma lista de colunas que atendem as contraints verticais

//TODO:
// Opcão 1: utilizar para as colunas com muitas opções a opção dos caracteres
// Opção 2: quebrar as contraints horizontais em constraints menores, que sirvam para eliminar as primeiras colunas


var arrMax = colSolutions.map(x=>x.length);
var rMax = arrMax.reduce((cur,prev)=>prev*cur,1);
console.log('Total ' + rMax);

var endSolution = [];

var arrindexes = colSolutions.map(x=>0);
for (var r1 = 0; r1<rMax-1; r1++)
{
	for (var j=0; j<arrindexes.length-1; j++)
	{
		if (arrindexes[j] >= arrMax[j])
		{
			arrindexes[j] = 0;
			arrindexes[j+1] += 1;
		}
		else
		{
			break;
		}
	}
	var notSolution = false;
	for (var i=0; i<hConds.length; i++)
	{
		//console.log(arrindexes.join(','));
		var row = colSolutions.map((x,i2)=>x[arrindexes[i2]][i]).join('');
		if (!hConds[i].test(row))
		{
			notSolution = true;
			break;
		}
	}
	if (notSolution)
	{
		arrindexes[0] += 1;
		continue;
	}
	endSolution.push(arrindexes);
	break;
}

if (endSolution.length > 0)
{
	var solutionIndexes = endSolution[0];
	for (var i=0; i<5; i++)
	{
		var row = colSolutions.map((x,i2)=>x[solutionIndexes[i2]][i]).join('');
		console.log(row);
	}
}


console.log(getRow(0));
console.log(getRow(1));
console.log(getRow(2));
console.log(getRow(3));
console.log(getRow(4));
//console.log(getCol(0));
//console.log(getCol(3));
