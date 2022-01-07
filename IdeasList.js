import React, { Component } from "react";
import Idea from './Idea'
import ideasData from '../Data/ideas.json'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class IdeasList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ideas: [
                // { id: 3, idea: "Tripper", group: "Tamar, Haim" },
                // { id: 7, idea: "Cyber crawler", group: "Dan, Eden" },
                // { id: 8, idea: "Intellimap", group: "Dima, Or, Daria" },
            ]
        }
        this.eachIdea = this.eachIdea.bind(this)
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);
    };

    componentDidMount() {
        ideasData.map(item => this.add({ id: item.id, txt: item.idea, group: item.group }));
    }

    update(newIdea, i) {
        console.log(`Update ${i}: newIdea ${newIdea}`);

        this.setState(prevState => ({
            ideas: prevState.ideas.map(
                idea => idea.id !== i ? idea : { ...idea, idea: newIdea }
            )
        }))
    };

    delete(id) {
        this.setState(prevState => ({
            ideas: prevState.ideas.filter(idea => idea.id !== id)
        }))
    };

    eachIdea(item, i) {
        return <Idea key={i} index={item.id} onChange={this.update} onDelete={this.delete}>
            <h4>{item.idea}</h4>
            <h5>By: {item.group}</h5>
        </Idea>
    };

    add({ id = null, txt = 'default title', grp = 'default group' }) {
        this.setState(prevState => ({
            ideas: [
                ...prevState.ideas, {
                    id: id !== null ? id : this.nextId(prevState.ideas),
                    idea: txt,
                    group: grp
                }]
        }))
    };

    nextId(ideas = []) {
        let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
        return ++max;
    }

    render() {
        return (
            <div className="ideas-list">
                {this.state.ideas.map(this.eachIdea)}
                <Fab size="medium" color="secondary" aria-label="add" onClick={this.add} variant="round">
                    <AddIcon />
                </Fab>
            </div>
        )
    }
}
export default IdeasList;