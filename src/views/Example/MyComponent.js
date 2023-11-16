import React from "react";
import ChildComponent from "./ChildComponent";
import AddComponents from "./AddComponents";

class MyComponent extends React.Component {
    /*
    JFX => return 1 block hay 1 div
    Nếu muốn nhiều hơn 1 div ta dùng <> div1 div2 </>
    */
    state = {
        arrJobs: [
            { id: "abcJob1", title: "Developer", salary: "500" },
            { id: "abcJob2", title: "Testers", salary: "400" },
            { id: "abcJob3", title: "Project managers", salary: "1000" }
        ]
    }

    addNewJob = (job) => {
        this.setState({
            arrJobs: [...this.state.arrJobs, job]
        })
    }

    render() {
        return (
            <>
                <AddComponents
                    addNewJob={this.addNewJob}
                />
                <ChildComponent
                    arrJobs={this.state.arrJobs} />
            </>
        )
    }
}

export default MyComponent;