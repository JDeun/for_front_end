// 계산기에 사용할 변수 초기화
let currentInput = ""; // 현재 입력된 값
let currentOperator = ""; // 현재 선택된 연산자
let resultDisplayed = false; // 결과가 표시되었는지 여부

// HTML 요소를 선택
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// 각 버튼에 클릭 이벤트 추가
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        // C 버튼을 누르면 초기화
        if (button.id === "clear") {
            currentInput = "";
            currentOperator = "";
            display.textContent = "0";
            resultDisplayed = false;
        } 
        // = 버튼을 누르면 계산 수행
        else if (button.id === "equal") {
            if (currentInput && currentOperator) {
                // 계산 수행
                const [operand1, operand2] = currentInput.split(currentOperator);
                const num1 = parseFloat(operand1);
                const num2 = parseFloat(operand2);
                let result;

                // 연산자에 따른 계산 수행
                switch (currentOperator) {
                    case "+":
                        result = num1 + num2;
                        break;
                    case "-":
                        result = num1 - num2;
                        break;
                    case "*":
                        result = num1 * num2;
                        break;
                    case "/":
                        result = num2 !== 0 ? num1 / num2 : "오류";
                        break;
                    default:
                        return;
                }

                display.textContent = result;
                currentInput = result;
                currentOperator = "";
                resultDisplayed = true;
            }
        } 
        // 연산자 버튼이 눌렸을 때
        else if (button.classList.contains("operator")) {
            if (currentInput && !resultDisplayed) {
                currentOperator = value;
                currentInput += currentOperator;
                display.textContent = currentInput;
            }
        } 
        // 숫자 또는 소수점 버튼이 눌렸을 때
        else {
            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value;
            }
            display.textContent = currentInput;
        }
    });
});
