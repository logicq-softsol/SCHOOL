import { SubjectSetupDetail } from './subject-setup-detail';

export class ClassSetupDetail {

    public name: string;
    public displayName: string;
    public type: string;
    public description: string;
    public id: string;
    public userId: number;
    public icon: string;
    public subjectList:SubjectSetupDetail[]=[];

}
