import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

function GoalForm() {
    // State to manage the text input value
    const [text, setText] = useState('');

    // Redux dispatch hook
    const dispatch = useDispatch();

    // Function to handle form submission
    const onSubmit = e => {
        e.preventDefault();

        // Dispatching an action to create a new goal with the provided text
        dispatch(createGoal({ text }));
        
        // Clearing the text input after submission
        setText('');
    };

    // Render a form to input the goal text and submit it
    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input 
                        type="text"
                        name="text"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    );
}

export default GoalForm;
