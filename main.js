const buttons = document.querySelectorAll('button');
const displayElement = document.querySelector('input');

class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.operatorCheck = true;
        this.resultCheck = false
        this.clear()
    }
    //버튼 클릭 할 때마다 input창에 나타나도록 displayContent에 할당한다
    appendNumber(number) {
        if (this.resultCheck) {
            this.displayContent += number;
            this.resultCheck = false;
        }
        else {
            this.displayContent += number;
            this.operatorCheck = false;
        }
    }
    appendOperator(operator) {
        if (this.operatorCheck) return false;
        if (this.resultCheck) this.resultCheck = false;
        this.displayContent += operator;
        return this.operatorCheck = true;  //  연산자를 숫자 뒤에만 쓸 수 있도록

    }
    updateDisplay() {
        this.displayElement.value = this.displayContent;
    }
    clear() {
        this.displayContent= '';
        this.displayElement.value = 0;
    }
    compute() {
        if (this.operatorCheck) return
        this.displayContent = eval(this.displayContent
            .replace('\u00D7', '*')
            .replace('\u00F7', '/'));
    }
}

const calculator = new Calculator(displayElement);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.dataset.type) {
            case 'operator':    //버튼 클릭 할 때마다 input창에 나타나도록 displayContent에 할당한다
                if (calculator.appendOperator(button.innerText)) {
                    calculator.updateDisplay();
                };
                break;
            case 'ac':
                calculator.clear()  //AC버튼 클릭 시 clear메소드 실행
                break;
            case 'result':
                calculator.compute();
                calculator.updateDisplay();
                break;
            default:    //버튼 클릭 할 때마다 input창에 나타나도록 displayContent에 할당한다
                calculator.appendNumber(button.innerText);
                calculator.updateDisplay();
                break;
        }
    })
})