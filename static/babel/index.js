/**
 *
 *  Babel
 *  测试模板字符串功能(经测试在 ie11, google, firefox 中能有一致表现)
 *
**/

const GLOBAL_TIMER = null;
let str = `
    dasdda${GLOBAL_TIMER}
    100001235
    `;
console.log(str);

/**
 *
 *  Babel
 *  测试 Generator 函数功能(经测试在 ie11, google, firefox 中能有一致表现)
 *
**/

function* g1() {
    yield 2;
    yield* [3];
    yield 4;
}

function* g2() {
    yield 1;
    yield* g1();
    yield 5;
}

var iterator = g2();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 4, done: false}
console.log(iterator.next()); // {value: 5, done: false}
console.log(iterator.next()); // {value: undefined, done: true}

/**
 *
 *  Babel
 *  测试 Async 函数功能(经测试在 ie11, google, firefox 中能有一致表现)
 *
**/

async function foo() {
    var a = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    });
    console.log(a); // 第2秒时输出: 1

    try {
        var b = await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(2);
            }, 1000);
        })
    } catch (e) {
        console.log(e); // 第3秒时输出: 2
    }

    // 函数暂停2秒后再继续执行
    var sleep = await new Promise((resolve) => {
        setTimeout(() => {
            resolve('sleep');
        }, 2000);
    });

    var c = await 3;
    console.log(c); // 第5秒时输出: 3
}

foo();