import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
testDataForOrder :    {
    username : "aqeelmiyankhan@gmail.com",
    password : "Test!123",
    productName:"ADIDAS ORIGINAL"
    
    }

}

)




