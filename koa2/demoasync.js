
// function getSomething() {
//     return 'something';
// }

// async function testAsync() {
//     return 'Hello world';
// }

// async function test() {
//      const v1 = await getSomething();
//      const v2 = await testAsync();
//      console.log(v1, v2);

// }

// // const res = testAsync();
// // console.log(res); // Promise { 'Hello world' }

// test(); //  something Hello world


function takeLongTime(){
    return new Promise( resolve => {
      setTimeout(() => resolve("long-time"), 3000);
    }) 
}

async  function test1(){
    const v = await takeLongTime();
    console.log(v);
}
test1();