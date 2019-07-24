export class LiveInfo {
    
    public application: string; // The name of the application.
    public name: string;    // Name of the current deployment.
    public uptime?: number;  // Uptime of the application in seconds.
    public version: string =
        `${process.env.npm_package_version}`;  // Current deployed version of the application.
    
    constructor(application: string, version: string, name: string) {
        this.application = application;
        this.name = name;
        this.uptime = process.uptime();
        this.version = version;
    }
}