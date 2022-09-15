import {faker} from '@faker-js/faker'


export function generateItem(){
    return {
        title: faker.commerce.product(),
        url: faker.internet.url(),
        description: faker.random.words(),
        amount: Number(faker.random.numeric(2))
    }
}
