# FraMat

O [FraMat](https://www.npmjs.com/package/framat) é um Framework em Node.js de matemática com o intuito de calcular a área de polígonos. Por padrão, ele calcula a área de um quadrado.

## Estrutura

O Framework é constituído de duas estruturas principais: o Aspect, que consiste em uma implementação AOP em javascript, e o FraMat, que é o Framework em si utilizando o Aspect.

## Hot e Frozen spot

### Frozen spot

O Frozen spot do framework corresponde à parte da implementação relacionada ao Aspect, a qual não pode ser alterada.

### Hot spot

O Hot spot consiste da implementação relacionada à estrutura do FraMat, pois o mesmo pode ser herdado e então modificado da forma desejada.

## Extensão e modificação do framework

Para que se possa modificar o framework de acordo com o contexto necessário, primeiro deve-se instalar o mesmo por meio do npm:

```sh
npm install --save framat
```

Em seguida, deve-se importar o módulo, e o método `call` deve ser chamada dentro do seu construtor:

```js
var FraMat = require('framat')

var Exemplo = function (dimensions, type) {
  FraMat.call(this, dimensions, type)
}
```

Para extender os métodos do FraMat, deve-se setar o prototype da sua classe como uma instância do FraMat:

```js
Exemplo.prototype = new FraMat()
```

Caso seja necessário adicionar mais atributos à classe por meio do construtor, o mesmo deve ser setado no prototype:

```js
Exemplo.prototype.construtor = Exemplo
```

Por fim, caso se deseje alterar um método do FraMat, basta fazê-lo através do prototype. No momento o único método possível de ser alterado é o `calculateArea`, pois é o único implementado até então.

```js
Example.prototype.calculateArea = function () {
  return 1 + 1
}
```

Um exemplo de como estender e modificar o framework pode ser encontrado na pasta `example`
