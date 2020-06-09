export interface ICreateDayDto {
    startDate: Date;
    endDate: Date;
    taskInfo: string;
    userId: number;

}

export interface ISaveToATT {
    taskId: number;
    appointmentId: number;

}