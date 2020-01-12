import React, { Component } from "react";

import "./Loader.css";

class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = { seconds: 0 };
    }
    tick() {
        if (this.state.seconds < 100) {
            this.setState(prevState => ({
                seconds: prevState.seconds + 1
            }));
        } else {
            clearInterval(this.interval);
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <div className="numbersPreload">{this.state.seconds}</div>;
    }
}

const Loader = () => {
    return (
        <div className="lds-css ng-scope">
            <div className="lds-spin loader">
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
            </div>
            <Counter />
        </div>
    );
};

export default Loader;
