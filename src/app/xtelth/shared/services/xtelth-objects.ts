export interface IOSPlatform {
    id: number;
    name: string;
    osPlatformType: string;
    fontAwesomeIcon: string;
}

export interface ITaskInputParameter {
    id: number;
    value: string;
}

export interface IScript{
    script: string;
    osPlatform: IOSPlatform;
    inputParameter?: ITaskInputParameter[];
}

export interface ITaskOutputParameter {
    id: number;
    name: string;
    value: string
}

export interface IShellCommand {
    id: number;
    command: string;
    task: number;
    osPlatform: IOSPlatform;
    taskInputParameter?: ITaskInputParameter[];
    taskOutputParameter?: ITaskOutputParameter[];
}

export interface ITask {
    id: number;
    name: string;
    description: string;
    commands: Map<number, IShellCommand>;
    children?: ITask[];
}

export interface ITaskGroup{
    id: number;
    name: string;
    description: string;
}

export interface IAsset {
    id: number;
    name: string;
    description: string;
    host: string;
    serial: string;
    cost: number;
    osPlatform: IOSPlatform;
}

export interface IHacker {
    id: number;
    description: string;
    campaignId: number;
    stateDate: Date;
    endDate: Date;
    state: number;
}

export interface IXpyExecution {
    id: number;
    startDate: Date;
    endDate: Date;
    status: string;
    hackerLogId: IXpyExecutionLog[];
}

export interface IXpyExecutionLog {
    id: number;
    xpyLogId: number;
    taskId: IAsset;
    assetId: ITask;
    returnCode: number;
    status: boolean;
    startDate: Date;
    endDate: Date;
    output: string;
    message: string;
    success: boolean;
}