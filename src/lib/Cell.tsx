import React from "react"
import "./Cell.css"
import { ICalculateFormulaRes, CellIndex } from "./SpreadSheet"

export interface CellProps {
  rowIdx: number
  colIdx: number
  value: number | string
  selected: boolean
  isEditting: boolean
  onClick: (event: React.MouseEvent, rowIdx: number, colIdx: number) => void
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIdx: number,
    colIdx: number
  ) => void
  onBlur: (event: React.FocusEvent) => void
  calculateFormula: (cell: CellIndex, value: string) => ICalculateFormulaRes
}

// TODO: Solve formula dependency bug
function Cell(props: CellProps) {
  // console.log("key", props.rowIdx, props.colIdx)
  function displayValue(value: number | string) {
    if (typeof value === "string") {
      if (value.slice(0, 1) === "=") {
        const parseRes = props.calculateFormula(
          { rowIdx: props.rowIdx, colIdx: props.colIdx },
          value.slice(1)
        )

        if (parseRes.error !== null) {
          return parseRes.error
        }
        return parseRes.result
      }
    }
    return value
  }
  return (
    <td
      className={`Cell ${props.selected ? "Cell--Selected" : ""}`}
      onClick={(event) => props.onClick(event, props.rowIdx, props.colIdx)}
    >
      {props.isEditting ? (
        <input
          className="Cell__Input"
          autoFocus
          value={props.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(event, props.rowIdx, props.colIdx)
          }
          onBlur={props.onBlur}
        />
      ) : (
        <span className="Cell__Span">{displayValue(props.value)}</span>
      )}
    </td>
  )
}

Cell.whyDidYouRender = true

// Update Cell when it contains formula because it might depend on another cell's value
function containsNoFormula(prevProps: CellProps, nextProps: CellProps) {
  return (
    prevProps.value.toString().slice(0, 1) !== "=" &&
    nextProps.value.toString().slice(0, 1) !== "="
  )
}

export default React.memo(Cell)
