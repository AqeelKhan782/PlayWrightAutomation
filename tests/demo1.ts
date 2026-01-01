let message1: string = "hello";
message1 = "hi";
console.log(message1);
let age1: number = 25;
console.log(age1);
let isActive: boolean = false;
let numberArray: number[] = [1, 2, 3, 4, 5];
console.log(numberArray);
let stringArray: string[] = ["apple", "banana", "cherry"];
console.log(stringArray);
let data: any = "The data can be any thing";
data = 100;
console.log(data);

//Function in TypeScript
function add1(a: number, b: number):number 
{
    return a + b;
}
add1(5, 10);
//Object in TypeScript
let user1: { name: string; age: number } = { name: "Alice", age: 30 };
//user1.location="Delhi";
console.log(user1);

