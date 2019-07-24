import { LiveInfo } from './../models/live-info';

export class LiveInfoService {
    private readonly applicationName: string;
    private readonly applicationVersion: string;
    private readonly applicationDeploymentName: string;

    constructor() {
        this.applicationName = `${process.env.npm_package_name}`;
        this.applicationVersion = `${process.env.npm_package_version}`;
        this.applicationDeploymentName = 
            process.env.NAME ? process.env.NAME : process.env.DEFAULT_NAME;
    }

    public getLiveInfo(): LiveInfo {
        return new LiveInfo(
            this.applicationName,
            this.applicationVersion,
            this.applicationDeploymentName
        );
    }
}