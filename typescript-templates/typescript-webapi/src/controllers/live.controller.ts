import { OK } from 'http-status-codes';
import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';

/**
 * Live Check Controller
 */
@Route('livecheck')
@Tags('LiveCheck')
export class LiveCheckController extends Controller {
    /**
     * This is the livecheck endpoint. It shows the application name and also the uptime in seconds.
     * 
     * @summary Live Check Endpoint
     */
    @Get()
    @SuccessResponse(OK)
    public async liveCheck(): Promise<any> {
        /*
        * Since we do not return a Body in our Livecheck Controller, it retuns a 204. Therefore,
        * the Load Balancer needs to know that 204 is an acceptable Livecheck response.
        * You can always ```return {}``` and it shall return a 200 to avoid complications. 
        */
        return;
    }
}