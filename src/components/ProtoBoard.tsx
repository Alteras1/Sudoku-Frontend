import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export const ProtoBoard: React.FC = () => {
	let nbrOfRows: number = 9;
	const [valid, setValid] = useState(false);
	const renderCellsInRow = (row: number) => {
		let cells = [];
		const firstCellOfRow = row * nbrOfRows;
		const lastCellOfRow = firstCellOfRow + nbrOfRows;

		for (let cell = firstCellOfRow; cell < lastCellOfRow; ++cell) {
			cells.push(
				<Input type="number" maxLength={1} size={1} id={cell.toString()} style={{ fontSize: "50px" }} max={9} min={1} />
			)
		}
		return (
			<tr key={row}>
				{cells}
			</tr>
		)
	};

	const renderRows = () => {
		let rows = [];
		for (let row = 0; row < nbrOfRows; ++row) {
			rows.push(
				renderCellsInRow(row)
			)
		}

		return (
			<tbody>{rows}</tbody>
		)
	};

	const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let array: number[][] = new Array(9).fill(0).map(() => new Array(9).fill(0));
		for (let x: number = 0; x < 9; x++) {
			for (let y: number = 0; y < 9; y++) {
				array[x][y] = parseInt(event.currentTarget[(9 * x + y).toString()].value) | 0;
			}
		}
		console.log(array);
		const response = await Axios.post("http://localhost:8081/sudoku", { board: array });
		console.log(response.data);
		setValid(response.data);
	}
	return (
		<Form onSubmit={handleSumbit}>
			{renderRows()}
			<Button type='submit'>Verify</Button>
			<div>
				{valid.toString()}
			</div>
		</Form>
	);
}