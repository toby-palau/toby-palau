"use client";

import { MCSAQuestionType } from "@root/@types/shared.types";
import { useMemo } from "react";

export const MultipleChoiceSingleAnswerQuestion = (props: {
	question: MCSAQuestionType;
	disabled: boolean;
	submitResponse: (s: Array<string>) => void;
}) => {
	const correctIds = props.question.correctAnswer ?? [];
	const selectedIds = props.question.userAnswer ?? [];
	const options = useMemo(
		() => props.question.options.toSorted(() => Math.random() - 0.5),
		[]
	);

	return (
		<div className="max-w-xl m-auto flex-col items-center justify-between py-6 px-6 border-2 border-white rounded bg-black">
			<h1 className={`sm:text-xl text-md my-4 text-white`}>
				{props.question.questionText}
			</h1>
			<div className="flex flex-col items-center justify-between">
				{options.map((o) => {
					let className = `w-full cursor-pointer sm:text-xl text-md text-center text-black rounded-md my-0.5 p-3 ${
						!props.disabled && "active:scale-95"
					} transition-all duration-100`;
					if (selectedIds.length > 0 && correctIds.length > 0) {
						if (correctIds.includes(o.oid))
							className +=
								" bg-green hover:bg-green-dark text-white";
						else if (
							selectedIds.includes(o.oid) &&
							!correctIds.includes(o.oid)
						)
							className +=
								" bg-red hover:bg-red-dark text-white animate-wiggle";
						else
							className +=
								" bg-white hover:bg-white-dark text-black";
					} else {
						className += " bg-white hover:bg-white-dark text-black";
					}
					return (
						<button
							key={`option-${o.oid}`}
							className={`${className}`}
							onClick={() => props.submitResponse([o.oid])}
							disabled={props.disabled}
						>
							{o.optionText}
						</button>
					);
				})}
			</div>
		</div>
	);
};
