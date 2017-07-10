//http://www.bbc.co.uk/programmes/articles/5LCB3rN2dWLqsmGMy5KYtBf/puzzle-for-today
var dict = new Array(28);
dict[0] = ' ';
for (var i=65; i<65+26; i++)
	dict[i-64] = string.fromCharCode(i);
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