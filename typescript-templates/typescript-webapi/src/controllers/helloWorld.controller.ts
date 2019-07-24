import { getStatusText, OK } from 'http-status-codes';
import { Body, Controller, Delete, Get, OperationId, Post,
    Response, Route, Security, SuccessResponse, Tags } from 'tsoa';

import { HelloWorld } from '../models/helloWorld';
import { HelloWorldService } from '../services/helloWorld.service';

/**
 * Hello World Controller.
 */
@Route('helloworld')
@Tags('HelloWorld')
export class HelloWorldController extends Controller {
    private helloWorldService = new HelloWorldService();

    /**
     *  This is a simple Get Endpoint that returns an array
     *  according to the model defined in Models/HelloWorld .
     *  @summary Get HelloWorld
     */
    @Security('auth0')
    @Get()
    @SuccessResponse(OK, getStatusText(OK))
    public async helloWorld(): Promise<HelloWorld[]> {
        return this.helloWorldService.getHelloWorld();
    }
}