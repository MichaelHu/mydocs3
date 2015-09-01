# Promisejs Memo



> 新型异步编程模型



* 通过`.then`方法，自动生成新的Promise对象，形成链式调用
* `resolve`和`reject`方法分别在成功调用和发生错误情况下被调用
* 如果`resolve`和`reject`方法的返回值仍然是一个`Promise对象`，则该对象会取代`.then`方法自动生成的Promise对象
