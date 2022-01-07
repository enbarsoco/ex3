import react from "react";
import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
// import { CancelIcon, SaveIcon, EditIcon } from '@material-ui/icons';

class Idea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }
        this.newIdea = "";
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.renderUI = this.renderUI.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }
    edit() {
        this.setState({
            editing: true
        })
    }

    delete() {
        this.props.onDelete(this.props.index);
    }

    save(e) {
        e.preventDefault();
        this.props.onChange(this.newIdea.value, this.props.index);

        this.setState({
            editing: false
        })
    }
    cancel(e) {
        e.preventDefault();
        this.setState({
            editing: false
        })
    }

    renderForm() {
        return (
            <div>
                <form>
                    <textarea ref={input => (this.newIdea = input)} />
                    <button onClick={this.save}><SaveIcon /></button>
                    <button onClick={this.cancel}><CancelIcon /></button>
                </form>
            </div>
        )
    }

    renderUI() {
        return (
            <div className='idea'>
                <div>{this.props.children}</div>
                <span>
                    <button onClick={this.edit}><EditIcon /></button>
                    <button onClick={this.delete}><DeleteIcon /></button>
                </span>
            </div>
        )
    }
    render() {
        return this.state.editing ? this.renderForm() : this.renderUI();
    }
}
export default Idea;