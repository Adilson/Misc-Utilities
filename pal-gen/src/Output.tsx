import React from "react";

export class Output extends React.PureComponent<OutputState>
{
    private hsvToRgb = (h:number,s:number,v:number) => ((c,x)=> ((m,rgb,f)=>rgb.map(k=>f(k+m)))(v-c,h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x],(l:number)=>Math.round(l*255)))(v*s, v*s*(1-Math.abs((h/60)%2 - 1)));
    getColorDegress(index:number, total:number)
    {
        return Math.floor(360*index/total);
    }
    renderColors() {
        return <ul>
            {Array.of(...new Array(this.props.numberOfColors)).map((x,i)=>this.renderColor(this.getColorDegress(i,this.props.numberOfColors)))}
        </ul>
    }
    getCssRgb(rgb:Array<number>)
    {
        return ['#', ...rgb.map(x=>x.toString(16).padStart(2,'0'))].join('');

    }
    renderColor(deg: number)
    {
        var mainRgb = this.hsvToRgb(deg, 1, 1);
        var rgb = this.getCssRgb(mainRgb);
        return <li>
            <div style={{width: '80px', height:'20px', backgroundColor: rgb}}>
                {rgb}
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
        </>
    }
}

export interface OutputState
{
    numberOfColors: number
}