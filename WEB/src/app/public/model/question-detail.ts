export class QuestionDetails {
    public id: number;
    public classId: string;
    public subjectId: string;
    public chapterId: string;
    public question: string;
    public option1: string;
    public option2: string;
    public option3: string;
    public option4: string;
    public option5: string;
    public correctAns: string;
    public type: string;
    public score: number;
    public applicableFor: string;
    public isDisable: boolean=false;
    public isViewAnsDisable: boolean=true;
    public selectedOpt: string;
}