import React from 'react';
import AppContext from './AppContext';

class AddFolder extends React.Component{
    static defaultProps = {
        onAddFolder: () => {},
    }
    static contextType = AppContext;

    state = {

    }

    handleFolderSubmit = event => {
        event.preventDefault()
        console.log('submitted')

        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then((data) => {
            this.context.addFolder(data)
            this.props.history.goBack()
        })
        .catch(error => {
            console.error({error})
        })
    }

    updateName(name){
        this.setState({
            name: name
        })
    }

    render(){
        return(
            <form className='add-form' onSubmit={e => this.handleFolderSubmit(e)}>
                <h2>Add New Folder</h2>
                <div>
                    <label htmlFor='name'>Folder Name: </label>
                    <input
                        required
                        type='text'
                        className='add-folder'
                        name='name'
                        id='name'
                        value={this.state.name}
                        onChange={e => this.updateName(e.target.value)}
                    />
                </div>
                <br/>
                <button className='add-btn'>Add</button>
            </form>
        )
    }


}

export default AddFolder;