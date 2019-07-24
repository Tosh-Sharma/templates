import express from 'express';
import { OK } from 'http-status-codes';
import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';

import Swagger from '../swagger.json';

/**
 * Swagger Controller
 */
@Route('swagger')
@Tags('Swagger')
export class SwaggerController extends Controller {
    /**
     * This is the swagger endpoint. It serves the Swagger.json file.
     * 
     * @summary Swagger Endpoint
     */
    @Get()
    @SuccessResponse(OK)
    public swagger(): any {
        return Swagger;
    }
}