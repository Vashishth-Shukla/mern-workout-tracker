import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };

        try {
            const response = await fetch('http://localhost:4000/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const json = await response.json();
                setError(json.error || 'Something went wrong');
                return;
            }
            if (response.ok){
                 const json = await response.json();
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('new workout added : ', json);
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            }

        } catch (error) {
            setError('An error occurred while adding the workout.');
            console.error('Fetch error:', error);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text" 
                // if input changes the value
                onChange={ (e) => setTitle(e.target.value)}
                // if the value is changed from "reset" button
                value={title}/>
            <label>Load (in Kg):</label>
            <input
                type="number"
                // if input changes the value
                onChange={(e) => setLoad(e.target.value)}
                // if the value is changed from "reset" button
                value={load} />
            <label>Reps:</label>
            <input
                type="number"
                // if input changes the value
                onChange={(e) => setReps(e.target.value)}
                // if the value is changed from "reset" button
                value={reps} />
            
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm