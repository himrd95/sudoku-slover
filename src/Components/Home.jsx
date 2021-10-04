import React from 'react';
import { newBoard, Boards, universal, res } from './Boards';
import './Home.css';

const Home = () => {
	const [number, setNumber] = React.useState(1);
	const [grids, setGrids] = React.useState(newBoard);
	const [ii, setI] = React.useState(0);
	const [jj, setJ] = React.useState(0);
	const [state, setState] = React.useState(false);
	const [solved, setSolved] = React.useState(false);
	const handleChange = (e, i, j) => {
		const val = e.target.value;
		setNumber(val);
		newBoard[i][j] = val;
	};

	React.useEffect(() => {
		solved &&
			setTimeout(() => {
				setSolved(false);
			}, 2000);
	}, [solved]);
	console.log(number);
	const handleSubmit = () => {
		for (let i in Boards) {
			for (let j in Boards[i]) {
				if (Boards[i][j] == newBoard[i][j]) {
					setSolved(false);
					return;
				}
			}
		}
		setSolved(true);
		return;
	};
	const setValues = () => {
		if (ii == 8 && jj == 8) {
			return;
		}
		for (let i = ii; i < Boards.length; i++) {
			for (let j = jj; j < Boards[i].length; j++) {
				if (newBoard[i][j] == '') {
					setI(i);
					setJ(j);
					setNumber(res[i][j]);
					break;
				}
			}
		}
		// setTimeout(() => {
		// 	if (i < 9 && j < 9) {
		// 		setNumber(res[i][j]);
		// 	}
		// 	if (j == 8 && i != 8) {
		// 		setJ(0);
		// 		setI((pre) => pre + 1);
		// 	} else {
		// 		setJ((pre) => pre + 1);
		// 	}
		// }, 10);
	};
	React.useEffect(async () => {
		setValues();
	}, [number, jj, ii]);

	const handleAutoSolve = () => {
		setGrids(Boards);
		setSolved(true);
	};

	const handleReset = () => {
		setGrids(newBoard);
	};
	console.log(solved);
	return (
		<div className='container'>
			{solved && (
				<div className='animation'>
					<lottie-player
						src='https://assets10.lottiefiles.com/packages/lf20_ppwu5qi1.json'
						background='transparent'
						speed='1'
						loop
						autoplay
					></lottie-player>
				</div>
			)}
			<div className='grids'>
				{grids.map((row, i) =>
					row.map((num, j) => (
						<input
							type='number'
							style={
								universal[i][j] === ''
									? state && num === res[i][j]
										? { background: 'darkgreen', color: 'white' }
										: { background: '#783093', color: 'white' }
									: { background: '#220E29', color: '#gray' }
							}
							key={row + i + j}
							className='box'
							value={num === '' ? (e) => number : num}
							onChange={(e) => handleChange(e, i, j)}
							disabled={universal[i][j] === '' ? false : true}
						/>
					)),
				)}
			</div>

			<div className='buttons'>
				<label className='hint'>
					<input type='checkbox' onClick={() => setState(!state)} />
					<span></span>
					Hint Mode
				</label>
				<button onClick={() => handleSubmit()}>Submit</button>
				<br />
				<button onClick={() => handleAutoSolve()}>Auto Solve</button>
				<br />
				<button onClick={() => handleReset()}>Reset</button>
			</div>
		</div>
	);
};

export default Home;
