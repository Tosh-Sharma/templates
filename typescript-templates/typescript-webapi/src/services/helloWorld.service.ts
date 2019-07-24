import { HelloWorld } from './../models/helloWorld';

export class HelloWorldService {
    public worldArray: HelloWorld[] = [{
        "helloWorld": "Hello World",
        "id": 1,
        "isIndexed": true
    }, {
        "helloWorld": "Hello World 2",
        "id": 2,
        "isIndexed": true
    }, {
        "helloWorld": "Hello World 3",
        "id": 3,
        "isIndexed": true
    }]

    public getHelloWorld(): HelloWorld[] {
        return this.worldArray;
    }
}