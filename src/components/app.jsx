import React from 'react';
import path from 'path';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            numberOfProblems: 35,
            problemTypes: ''    // one or more of +, -, x, \u00F7
        }
    }

    render() {
        const { numberOfProblems, problemTypes } = this.state;
        const divideSymbol = '\u00F7';

        const onClick = e => {
            e.preventDefault();

            console.log('state', this.state);

            //ipcRenderer.send('createProblemPage', { ...this.state });

            const {BrowserWindow} = require('electron').remote;
            let problemPage = new BrowserWindow({show: false, width: 800, height: 600});
            const popsHtml = path.resolve(__dirname, '..', 'page-of-problems.html');
            console.log('my path', popsHtml);
            problemPage.loadURL(`file://${popsHtml}`);

            problemPage.once('ready-to-show', () => {
                console.log('state we send', this.state);
                problemPage.send('problemInfo', { ...this.state });
                problemPage.show();
            });

        };

        const onNumberOfProblemsChange = e => {
            this.setState({ numberOfProblems: parseInt(e.target.value) });
        };

        const onCheckboxChange = (e, problemType) => {
            const value = e.target.checked ? `${this.state.problemTypes}${problemType}` : this.state.problemTypes.replace(problemType, '');

            this.setState({
                problemTypes: value
            });
        };

        const font = {
            fontFamily: 'Arial',
            fontSize: 20
        };

        const styles = {
            form: {
                ...font,
                margin: 10
            },
            number: {
                ...font,
                marginLeft: 10
            },
            checkbox: {
                marginLeft: 10
            },
            btn: {
                marginLeft: 10
            }
        };

        return (
            <div>
                <div className="container-fluid" style={styles.form}>
                    <div className="row">
                        <div className="form-group">
                            <label className="col-xs-5 col-sm-4 col-md-3 col-lg-2">Number of problems:</label>
                            <input className="col-xs-5 col-sm-4 col-md-3 col-lg-2" type="number" id="numberOfProblemsInput" style={styles.number} step={5} min={1}
                                   max={100}
                                   value={numberOfProblems} onChange={onNumberOfProblemsChange} />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="typesOfProblems" className="col-xs-5 col-sm-4 col-md-3 col-lg-2">Types of Problems:</label>
                            <div className="col-xs-5 col-sm-4 col-md-4 col-lg-4">
                                <div>
                                    <input type="checkbox" id="add" checked={problemTypes.includes('+')}
                                           onChange={e => onCheckboxChange(e, '+')} />
                                    <label style={styles.checkbox} htmlFor="add">Addition (+)</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="subtract" checked={problemTypes.includes('-')}
                                           onChange={e => onCheckboxChange(e, '-')} />
                                    <label style={styles.checkbox} htmlFor="subtract">Subtraction (-)</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="multiply" checked={problemTypes.includes('x')}
                                           onChange={e => onCheckboxChange(e, 'x')} />
                                    <label style={styles.checkbox} htmlFor="mulitply">Multiplication (x)</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="divide" checked={problemTypes.includes(divideSymbol)}
                                           onChange={e => onCheckboxChange(e, divideSymbol)} />
                                    <label style={styles.checkbox} htmlFor="divide">{`Division (${divideSymbol})`}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <button type="button" className="btn btn-lg btn-primary col-xs-offset-5" onClick={onClick}>Create Page</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
