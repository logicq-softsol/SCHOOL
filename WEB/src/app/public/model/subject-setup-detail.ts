import { ChapterSetupDetail } from './chapter-setup-detail';

export class SubjectSetupDetail {
    public name: string;
    public displayName: string;
    public type: string;
    public description: string;
    public id: string;
    public classId: string;
    public icon: string;
    public chapterList:ChapterSetupDetail[]=[];
}
