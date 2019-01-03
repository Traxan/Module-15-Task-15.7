class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.running = false;
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        };
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
    }

    calculate() {
        const times = Object.assign({}, this.state.times);

        times.miliseconds = this.state.times.miliseconds + 1;

        if (this.state.times.miliseconds >= 100) {
            times.seconds = this.state.times.seconds + 1;
            times.miliseconds = 0;
        }

        if (this.state.times.seconds >= 60) {
            times.minutes = this.state.times.minutes + 1;
            times.seconds = 0;
        }

        this.setState({times});
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    render() {
        return (
            <div>
            <nav className="controls">
                <button onClick={this.start.bind(this)}>Start</button>
                <button onClick={this.stop.bind(this)}>Stop</button>
            </nav>
             <div className="stopwatch">
                {this.format(this.state.times)}
            </div>
            <ul id="results">
                {this.state.results.map((result, index) => <li key={index}>{result}</li>)}
            </ul>
            </div>
        );
    }
}

const button = (props) => (
    <button onClick = {props.onClick} > {props.children} </button>
);

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const appRoot = document.getElementById('app');
ReactDOM.render( <Stopwatch /> , appRoot);