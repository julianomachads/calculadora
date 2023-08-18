const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.getAttribute('data-action')
        const keyContent = key.textContent
        const displayedNum = display.textContent

        if (action === 'clear') {
            display.textContent = '0'
            return
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            }
            return
        }

        if (action === 'calculate') {
            const firstValue = calculator.getAttribute('data-first-value')
            const operator = calculator.getAttribute('data-operator')
            const secondValue = displayedNum
            
            if (operator && firstValue) {
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            return
        }

        // Operadores
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed')
            const firstValue = displayedNum
            const operator = action
            calculator.setAttribute('data-first-value', firstValue)
            calculator.setAttribute('data-operator', operator)
            display.textContent = ' '
            return
        }

        if (displayedNum === '0' || calculator.getAttribute('data-previous-key-type') === 'operator') {
            display.textContent = keyContent
        } else {
            display.textContent = displayedNum + keyContent
        }

        calculator.setAttribute('data-previous-key-type', 'number')

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
    }
})

function calculate(n1, operator, n2) {
    const num1 = parseFloat(n1)
    const num2 = parseFloat(n2)

    if (operator === 'add') {
        return num1 + num2
    } else if (operator === 'subtract') {
        return num1 - num2
    } else if (operator === 'multiply') {
        return num1 * num2
    } else if (operator === 'divide') {
        if (num2 === 0) {
            return 'Error'
        }
        return num1 / num2
    }
}
