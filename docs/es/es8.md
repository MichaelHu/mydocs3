# es8

## Resources

* ES2017( es8 ): <http://www.ecma-international.org/ecma-262/8.0/index.html>


## Features

    Object.values / Object.entries
    String padding
    Object.getOwnPropertyDescriptors
    Trailing commas
    Async Functions

todo

## Async Functions

### Resources

* Async Functions: <http://www.ecma-international.org/ecma-262/8.0/index.html#sec-async-function-definitions>
* Async Arrow Functions: <http://www.ecma-international.org/ecma-262/8.0/index.html#sec-async-arrow-function-definitions>

### Syntax

    # Async Functions
    async function BindingIdentifier( FormalParameters ) {
        AsyncFunctionBody
    }

    AsyncMethod:
        async PropertyName() {
            AsyncFunctionBody
        }

    AsyncFunctionBody:
        FunctionBody

    AwaitExpression:
        await UnaryExpression



    # Async Arrow Functions
    async AsyncArrowBindingIdentifier => AsyncConciseBody
    
    AsyncConciseBody:
        [lookahead ≠ {] AssignmentExpression
        { AsyncFunctionBody }


### Tips

* `await语句`必须存在于`async`声明的函数内，否则报错
