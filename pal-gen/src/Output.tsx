import React from "react";

export class Output extends React.PureComponent<OutputState>
{
    private hsvToRgb = (h:number,s:number,v:number) => ((c,x)=> ((m,rgb,f)=>rgb.map(k=>f(k+m)))(v-c,h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x],(l:number)=>Math.round(l*255)))(v*s, v*s*(1-Math.abs((h/60)%2 - 1)));
    getColorDegress(index:number, total:number)
    {
        return Math.floor(360* (index/total));
    }
    getHuePerceptibleQuantile(index: number) {
        return (6*Math.PI*index - Math.sin(6*Math.PI*index)) / (6*Math.PI);
    }
    getColorS(index:number, total:number)
    {
        var min = 0.7;
        var max = 0.9;
        return [max,max,min,min][index%4];
    }
    getColorV(index:number, total:number)
    {
        var min = 0.7;
        var max = 0.9;
        return [min,max,min,max][index%4];
    }
    renderColors() {
        return <ul>
            {Array.of(...new Array(this.props.numberOfColors)).map((x,i)=>this.renderColor(
                this.getColorDegress(i,this.props.numberOfColors),
                this.getColorS(i,this.props.numberOfColors),
                this.getColorV(i,this.props.numberOfColors)
                ))}
        </ul>
    }
    getCssRgb(rgb:Array<number>)
    {
        return ['#', ...rgb.map(x=>x.toString(16).padStart(2,'0'))].join('');

    }
    renderColor(deg: number, sat: number, val: number)
    {
        var mainRgb = this.hsvToRgb(deg, sat, val);
        var rgb = this.getCssRgb(mainRgb);
        return <li>
            <div style={{width: '400px', height:'20px', backgroundColor: rgb}}>
                {rgb} - ({deg}&deg; {sat} {val}) - rgba({mainRgb[0]},{mainRgb[1]},{mainRgb[2]},1)
            </div>
        </li>
    }
    render() {
        return <>
            <h2>Output</h2>
            <div>
                <b>Colors:</b> {this.props.numberOfColors} <br/>
                {this.renderColors()}
            </div>

            <div>
                <h3>Testes</h3>
                <ul>
                    {this.renderColor(0, 1, 1)}
                    {this.renderColor(10, 1, 0.8)}
                    {this.renderColor(20, 0.7, 1)}
                    {this.renderColor(30, 0.7, 0.8)}
                    {this.renderColor(45, 1, 1)}
                    {this.renderColor(60, 1, 0.8)}
                    {this.renderColor(90, 1, 0.8)}
                </ul>
            </div>
        </>
    }
}

export interface OutputState
{
    numberOfColors: number
}