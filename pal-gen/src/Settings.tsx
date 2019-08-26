import React from 'react';

export class Settings extends React.PureComponent<SettingsProps>
{
    render() {
        return <>
            <h2>Settings</h2>
            <form>
                <input type="integer" onChange={ e => this.props.onChange({colorsQty: +e.target.value})}/>
            </form>
        </>
    }
}

export interface SettingsProps
{
    onChange: (data: {colorsQty: number}) => void;
}