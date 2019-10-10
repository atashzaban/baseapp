import * as React from 'react';

interface DirectTicketInterface {
    count: number;
    action: string;
}

interface Props {
    context: {
        legend: DirectTicketInterface[];
    };
}

const tableRow = (legendArray: DirectTicketInterface[]): React.ReactNode => {
    return legendArray.map((record, index) => {
        return(
            <tr key={index}>
                <td><span className="count">{record.count} </span><span className="explanation">tickets</span></td>
                <td><span className="count">{record.action}</span></td>
                <td><span className="count"><button className="button">get more</button></span></td>
            </tr>
        );
    });
};

class DirectTicketDetails extends React.Component<Props>{

    public render(){
        const legendArray: DirectTicketInterface[] = this.props.context && this.props.context.legend || [];
        return(
            <div className="direct-ticket-details">
                <div className="container">
                    <div className="container-wrapper">
                        <h2>Direct ticket details</h2>
                        <table>
                            <tbody>
                            {tableRow(legendArray)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export {DirectTicketDetails, DirectTicketInterface};
