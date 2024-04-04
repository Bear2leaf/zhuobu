import * as React from "react";
import * as ReactBootstrap from 'react-bootstrap';
import PlanDataBase from "../db/PlanDataBase.js";
import { GOAPPlan } from "../../../worker/third/goap/index.js";

export function Browser({onSelectItem}: {onSelectItem: (plan: GOAPPlan) => void}) {
    const db = new PlanDataBase();
    const [plans, setPlans] = React.useState<GOAPPlan[]>([]);
    React.useEffect(() => {
        db.transaction('rw', db.plans, async () => {

            // Make sure we have something in DB:
            if ((await db.plans.count()) === 0) {
                const plans = await (await fetch("/resource/json/plans.json")).json();
                for (const plan of plans) {

                    const id = await db.plans.add(plan);
                    console.log(`Addded plan with id ${id}`);
                }

            }


            // Query:
            const someplans = await db.plans.where("name").equals("Animal GOAP plan").toArray();
            setPlans(someplans);

            // // Show result:
            // console.log("My young friends: " + JSON.stringify(youngFriends));

        }).catch(e => {
            console.log(e.stack || e);
        });
    }, [plans]);
    const planItems = plans.map((plan, index) => (
        <ReactBootstrap.Col key={index}>
            <ReactBootstrap.Button onClick={() => onSelectItem(plan)}>{index}</ReactBootstrap.Button>
        </ReactBootstrap.Col>
    ))
    return (
        <>
            {planItems}
        </>
    )
}