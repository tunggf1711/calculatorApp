import React, { Component } from "react";
import "./Calculator.css";

export default class Calculator extends Component {
  state = {
    currentNumber: "0",
    displayOperator: "",
    operator: undefined,
    previousNumber: undefined,
  };

  clearAll() {
    this.setState({
      currentNumber: "0",
      displayOperator: "",
      operator: undefined,
      previousNumber: undefined,
    });
  }

  sliceOne() {
    let numText;
    if (this.state.currentNumber.length === 1) {
      numText = "0";
    } else {
      numText = this.state.currentNumber.substring(
        0,
        this.state.currentNumber.length - 1
      );
    }
    if (this.state.operator !== undefined) {
      this.setState({
        ...this.state,
        currentNumber: numText,
        displayOperator: `${this.state.previousNumber}${this.state.operator}${numText}`,
      });
    } else {
      this.setState({
        ...this.state,
        currentNumber: numText,
      });
    }
  }

  handleOperator(operator) {
    if (this.state.operator !== undefined) {
      return;
    }
    let numText = this.state.currentNumber;
    this.setState(
      {
        ...this.state,
        operator: operator,
      },
      () => {
        this.setState(
          {
            ...this.state,
            previousNumber: numText,
            currentNumber: "0",
          },
          () => {
            this.setState({
              ...this.state,
              displayOperator: `${this.state.previousNumber}${this.state.operator}`,
            });
          }
        );
      }
    );
  }

  appendNumber(num) {
    let numText;
    if (this.state.currentNumber === "0") {
      numText = `${num}`;
    } else {
      numText = this.state.currentNumber + `${num}`;
    }
    if (num === ".") {
      if (this.state.currentNumber.includes(".")) {
        return;
      } else {
        numText = this.state.currentNumber + `${num}`;
      }
    }
    if (this.state.operator !== undefined) {
      this.setState({
        ...this.state,
        displayOperator: `${this.state.previousNumber}${this.state.operator}${numText}`,
        currentNumber: numText,
      });
    } else {
      this.setState({
        currentNumber: numText,
      });
    }
  }

  calculator() {
    if (this.state.operator !== undefined) {
      let result = 0;
      switch (this.state.operator) {
        case "+":
          result =
            Number(this.state.previousNumber) +
            Number(this.state.currentNumber);
          break;
        case "-":
          result =
            Number(this.state.previousNumber) -
            Number(this.state.currentNumber);
          break;
        case "*":
          result =
            Number(this.state.previousNumber) *
            Number(this.state.currentNumber);
          break;
        case "/":
          if (this.state.currentNumber === "0") {
            return;
          }
          result =
            Number(this.state.previousNumber) /
            Number(this.state.currentNumber);
          break;
        default:
          break;
      }
      this.setState({
        ...this.state,
        currentNumber: `${result}`,
        displayOperator: "",
        previousNumber: undefined,
        operator: undefined,
      });
    }
  }

  render() {
    return (
      <div
        className="calculator"
        style={{
          width: "30%",
          padding: "10px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "5px",
            border: "1px solid black",
          }}
        >
          <div>
            <p style={{ textAlign: "right", fontSize: "15px" }}>
              {this.state.displayOperator}
            </p>
            <h1
              className="current"
              style={{
                textAlign: "right",
              }}
            >
              {this.state.currentNumber}
            </h1>
          </div>
        </div>
        <div
          className="calculator__content"
          style={{
            marginTop: "25px",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          <button
            onClick={() => {
              this.appendNumber(7);
            }}
          >
            7
          </button>
          <button
            onClick={() => {
              this.appendNumber(8);
            }}
          >
            8
          </button>
          <button
            onClick={() => {
              this.appendNumber(9);
            }}
          >
            9
          </button>
          <button
            onClick={() => {
              this.handleOperator("/");
            }}
          >
            /
          </button>
          <button
            onClick={() => {
              this.clearAll();
            }}
          >
            CE
          </button>
          <button
            onClick={() => {
              this.appendNumber(4);
            }}
          >
            4
          </button>
          <button
            onClick={() => {
              this.appendNumber(5);
            }}
          >
            5
          </button>
          <button
            onClick={() => {
              this.appendNumber(6);
            }}
          >
            6
          </button>
          <button
            onClick={() => {
              this.handleOperator("*");
            }}
          >
            *
          </button>
          <button
            onClick={() => {
              this.sliceOne();
            }}
          >
            C
          </button>
          <button
            onClick={() => {
              this.appendNumber(1);
            }}
          >
            1
          </button>
          <button
            onClick={() => {
              this.appendNumber(2);
            }}
          >
            2
          </button>
          <button
            onClick={() => {
              this.appendNumber(3);
            }}
          >
            3
          </button>
          <button
            onClick={() => {
              this.handleOperator("-");
            }}
          >
            -
          </button>
          <button
            style={{ gridRow: "3 / span 2", gridColumn: "5 / span 1" }}
            onClick={() => {
              this.calculator();
            }}
          >
            =
          </button>
          <button
            style={{ gridColumn: "1 / span 2" }}
            onClick={() => {
              this.appendNumber(0);
            }}
          >
            0
          </button>
          <button
            onClick={() => {
              this.appendNumber(".");
            }}
          >
            .
          </button>
          <button
            onClick={() => {
              this.handleOperator("+");
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
