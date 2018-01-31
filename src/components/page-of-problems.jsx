import React from 'react';
import { ipcRenderer } from 'electron';

class PageOfProblems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            problems: [],
            title: '',
            printVisible: true
        }
    }

    render() {
        const { problems, title, printVisible } = this.state;

        ipcRenderer.on('problemInfo', (e, data) => {
            console.log('received data', data);
            createProblems(data.numberOfProblems, data.problemTypes);
            createTitle(data.numberOfProblems, data.problemTypes);
        });

        //const showBtn = () => this.setState({ printVisible: true });

        const onPrintClick = e => {
            e.preventDefault();

            this.setState({ printVisible: false }); // so we don't print the button

            setTimeout(window.print);
            setTimeout(() => this.setState({ printVisible: true }));
        };

        const createTitle = (numberOfProblems, problemTypes) => {
            const len = problemTypes.length;
            const sortedProblemTypes = problemTypes
                .replace('+', '0')
                .replace('-', '1')
                .replace('x', '2')
                .replace('\u00F7', '3')
                .split('')
                .sort()
                .join('')
                .replace('0', '+')
                .replace('1', '-')
                .replace('2', 'x')
                .replace('3', '\u00F7');

            const titleProblemTypes = sortedProblemTypes
                .replace('+', len === 1 ? 'Addition' : len === 2 ? 'Addition and ' : 'Addition, ')
                .replace('-', problemTypes.includes('+')
                    ? len === 2
                        ? 'Subtraction'
                        : len === 3 ? 'Subtraction, and ' : 'Subtraction, '
                    : len === 1 ? 'Subtraction' : len === 2 ? 'Subtraction and ' : 'Subtraction, ')
                .replace('x', len === 1 || problemTypes.includes('\u00F7') ? 'Multiplication' : ' and Multiplcation')
                .replace('\u00F7', len > 1 ? ' and Division' : 'Division');

            this.setState({
                title: `${numberOfProblems} ${titleProblemTypes} Problems`
            });
        };

        const createProblems = (numberOfProblems, problemTypes) => {
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }

                return array;
            }

            console.log('num probs', numberOfProblems);

            let newProblems = [...Array(numberOfProblems)];
            console.log('new probs empty', newProblems);

            newProblems = newProblems
                .map((p, i) => {
                    const operator = problemTypes[i % problemTypes.length];
                    let numbers = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];

                    if (operator === '-') {
                        numbers.sort();
                        [numbers[0], numbers[1]] = [numbers[1], numbers[0]];    // swap to make the largest number be first
                    } else if (operator === '\u00F7') {
                        numbers[0] = numbers[0] * numbers[1];   // create the dividend as the first element
                        if (numbers[1] === 0) {
                            numbers[1] = Math.ceil(Math.random() * 9);
                        }
                    }

                    return {
                        numbers,
                        operator
                    }
                });

            console.log('new probs', newProblems);
            this.setState({
                problems: shuffleArray(newProblems)
            })
        };

        const styles = {
            main: {
                marginRight: 10
            },
            font: {
                fontSize: 24,
                marginLeft: -25
            },
            title: {
                display: 'flex',
                justifyContent: 'center'
            },
            btn: {
                display: printVisible ? 'inline-block' : 'none'
            },
            outdent: {
                marginLeft: -30
            },
            bottomLine: {
                paddingBottom: 6,
                borderBottom: '2px solid'
            }
        };

        const displayProblems = () => {
            if (!problems || problems.length === 0) return;

            console.log('probs to display', problems);
            return (
                problems.map((p, i) => {
                    return (
                        <div key={`key${i}`} className="col-md-2 col-sm-2 col-xs-2" style={styles.font}>
                            <span className="pull-right">
                            {p.numbers[0]}
                            </span>
                            <br />
                            <span className="pull-right" style={styles.bottomLine}>
                            {`${p.operator} ${p.numbers[1]}`}
                            </span>
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    )
                })
            )
        };

        return (
            <div style={styles.main}>
                <h2 style={styles.title}>Speed Math!</h2>
                <span>
                    <button className="btn btn-primary pull-right" style={styles.btn} onClick={onPrintClick}>Print</button>
                    <h3 style={styles.title}>{title}</h3>
                </span>
                <br/>
                <div className="container-fluid">
                    <div className="row">
                        {displayProblems()}
                    </div>
                </div>
            </div>
        );
    }
}

export default PageOfProblems;
