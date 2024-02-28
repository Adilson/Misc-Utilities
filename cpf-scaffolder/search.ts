var suffix = '292493';
//var suffix = '426178';

const mod11 = (cpf: string) => {
    var sum = 0;
    var rest = 0;
    for (var i=0; i<cpf.length; i++)
    {
        sum += parseInt(cpf[i]) * (1+cpf.length - i);
    }
    rest = 11 - (sum % 11);
    if (rest == 10 || rest == 11)
        rest = 0;
    return rest;
}
const calcDv = (cpfParcial: string) => {
    var dv1 = mod11(cpfParcial);
    var dv2 = mod11(cpfParcial + '' + dv1);
    return dv1 + '' + dv2;
}

for (var i=1; i<=999; i++)
{
    var cpfParcial = i.toString().padStart(3, '0') + suffix;
    var dv = calcDv(cpfParcial);
    console.log(cpfParcial + '-' + dv);
}

