import Subject from "../subject/Subject.js";

    
export default class Observer {
    private subject?: Subject;


    getSubject(): Subject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: Subject) {
        this.subject = subject;
        this.subject.register(this);
    }
    public notify(): void {
        throw new Error("Abstract Method!");
    }
}