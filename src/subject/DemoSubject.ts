import Subject from "./Subject.js";

export default class DemoSubject extends Subject {
    private subjectState: number = 0;

    getSubjectState(): number {
        return this.subjectState;
    }

    setSubjectState(subjectState: number) {
        this.subjectState = subjectState;
    }

    update(): void {
        if (this.subjectState > 600) {
            this.subjectState = 0;
            this.notify();
        }
        this.subjectState += 1;
    }
}
