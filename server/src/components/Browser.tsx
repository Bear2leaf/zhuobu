import * as React from "react";
import * as ReactBootstrap from 'react-bootstrap';
import { GOAPPlan } from "../../../worker/third/goap/index.js";

export function Browser({ onSelectItem }: { onSelectItem: (plan: GOAPPlan) => void }) {
    const [page, setPage] = React.useState(0);
    const [totalPlans, setTotalPlans] = React.useState(0);
    const [plans, setPlans] = React.useState<GOAPPlan[]>([]);
    const [activePlan, setActivePlan] = React.useState<number | null>(null);
    let items = [
        <ReactBootstrap.Pagination.Item key={0} active>
            {page}
        </ReactBootstrap.Pagination.Item>,];

    React.useEffect(() => {
        fetch("/resource/json/plans.json").then(response => response.json().then((plans) => {
            setTotalPlans(plans.length);
            setPlans(plans.filter(((plan: GOAPPlan, index: number) => index > page * 10 && index <= (page + 1) * 10)))
        }));

    }, [plans]);
    const planItems = plans.map((plan, index) => (
        <ReactBootstrap.ListGroup.Item active={activePlan === index} key={index} onClick={() => {
            setActivePlan(index);
            onSelectItem(plan);
        }}>{plan.name}
        </ReactBootstrap.ListGroup.Item>
    ))
    return (
        <>

            <ReactBootstrap.Row>
                <ReactBootstrap.ListGroup>
                    {planItems}
                </ReactBootstrap.ListGroup>
            </ReactBootstrap.Row>
            <ReactBootstrap.Row>
                <ReactBootstrap.Pagination>
                    <ReactBootstrap.Pagination.First onClick={() => setPage(0)} />
                    <ReactBootstrap.Pagination.Prev onClick={() => setPage(Math.max(0, page - 1))} />
                    {items}
                    <ReactBootstrap.Pagination.Next onClick={() => setPage(Math.min(Math.floor(totalPlans / 10), page + 1))} />
                    <ReactBootstrap.Pagination.Last onClick={() => setPage(Math.floor(totalPlans / 10))} />
                </ReactBootstrap.Pagination>
            </ReactBootstrap.Row>

        </>
    )
}