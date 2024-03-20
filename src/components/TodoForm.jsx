import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import { uid } from 'uid';
import { Select } from './Select';
// import '../css/TodoForm.css'
import 'react-datepicker/dist/react-datepicker.css';

export const TodoForm = ({ addTodo, deleteTodo, populateData, resetFlag, setPopulateData }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState((new Date()).toISOString());

  useEffect(() => {
    // console.log("show form change triggered")
    // console.log("show form: "+ showForm)
      if(!showForm) {
        // console.log("clearing populated data" + Object.keys(populateData).length)
        setPopulateData({})
        // console.log("did it clear? " + Object.keys(populateData).length)
      }
  }, [showForm])

  useEffect(() => {
    if (Object.keys(populateData).length !== 0) {
      // console.log("populateq data edit triggered");
      
      setShowForm(true);
      setTitle(populateData.title);
      setDetails(populateData.details);
      setPriority(populateData.priority);
      setDueDate(populateData.due);

      // console.log(populateData + " " + Object.keys(populateData).length + " " + Object.keys(populateData))
    }
  }, [resetFlag]);

  const clearData = () => {
    setTitle("")
    setDetails("")
    setPriority("Low")
    setDueDate((new Date()).toISOString())
    setPopulateData({})
  }

  const onSave = () => {
    // console.log("in onsave function populateData.length" + Object.keys(populateData).length)
    if (Object.keys(populateData).length === 0) {
      addTodo({
        id: uid(),
        title,
        details,
        priority,
        complete: 0,
        due: dueDate,
        created: (new Date()).toISOString(),
      });
    } else {
      const updatedTodo = {
        id: populateData.id,
        title,
        details,
        priority,
        due: dueDate,
        created: populateData.created,
        updated: (new Date()).toISOString(),
        ...populateData
      };
      // console.log(updatedTodo)
      // console.log(populateData.id)
      deleteTodo(populateData.id);
      addTodo(updatedTodo);
    }
    clearData()
    setShowForm(false);
  };

  return (
    <>
      <Button onClick={() => setShowForm(true)}>Add Todo</Button>

      <Modal show={showForm} onHide={() => { 
          // console.log("ON HIDE TRIGGERED"); 
          clearData(); setShowForm(false) 
        }}>
        <Modal.Header>
          <Modal.Title>{Object.keys(populateData).length === 0 ? 'Add Todo' : 'Edit Todo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="details" className="form-label">Details</label>
              <input type="text" className="form-control" id="details" name="details" value={details} onChange={(e) => setDetails(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">Priority</label>
              <Select fieldName="priority" name="priority" value={priority} onChange={(e) => setPriority(e.target.value)} options={['High', 'Medium', 'Low']} />
            </div>
            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">Due Date</label>
              <br />
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date.toISOString())}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {clearData(); setShowForm(false);}}>Close</Button>
          <Button variant="primary" onClick={onSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
