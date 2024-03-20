
import { Checkbox, FormControl, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const Filter = ({sendFilter}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [complete, setComplete] = useState(-1);
  const [priority, setPriority] = useState([]);
  const [creationOrder, setCreationOrder] = useState(0);
  const [dueOrder, setDueOrder] = useState(0);
  const [updateOrder, setUpdateOrder] = useState(0);
  const [filter, setFilter] = useState({})

  const [statusRadioValue, setStatusRadioValue] = useState('')

  const clearData = () =>{
    setComplete(-1);
    setPriority([]);
    setCreationOrder(0);
    setDueOrder(0);
    setUpdateOrder(0);
    setStatusRadioValue(null)
  }

  const populateData = 123;
  const onSave = ()=> {
    console.log("am i at least in here")
    if( complete !== -1 ) filter.complete = complete
    if( priority.length > 0) filter.priority = priority
    sendFilter(filter)
    clearData()
    setShowFilter(false)
  }

  const onStatusRadioClick = (e)=>{
    setStatusRadioValue(e.target.value)
    if(e.target.value === 'complete') {
      setComplete(1)
    } else {
      setComplete(0)
    }
  }

  const onStatusDoubleClick = (e) => {
    setStatusRadioValue(null)
    setComplete(-1)
  }
  
  const onPriorityCheckboxClick = async (e) => {
    if(e.target.checked) {
      setPriority([e.target.id, ...priority])
    } else {
      setPriority(priority.filter((x) => {
        return x !== e.target.id;
      }))
    }
  }
  
  return (
    <>
      <Button onClick={() => setShowFilter(true)}>Filter</Button>

      <Modal show={showFilter} onHide={() => { 
          // console.log("ON HIDE TRIGGERED"); 
          clearData(); setShowFilter(false) 
        }}>
        <Modal.Header>
          <Modal.Title>Filter Todos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        Todo Status:<br/>
        <FormControl component="fieldset">
            <RadioGroup onChange={onStatusRadioClick} onDoubleClick={onStatusDoubleClick} value={statusRadioValue} >
                <FormControlLabel value="complete" control={<Radio />} label="Complete" />
                <FormControlLabel value="incomplete" control={<Radio />} label="Incomplete" />
            </RadioGroup>
        </FormControl>


        <div>
          Priority:<br/>
          High <Checkbox id='High' onChange={onPriorityCheckboxClick} />
          Medium <Checkbox id='Medium' onChange={onPriorityCheckboxClick}/>
          Low <Checkbox id='Low' onChange={onPriorityCheckboxClick}/>
        </div>

          Sort by:
          <div>
            Creation date: 
            
            <FormControl component="fieldset">
            <RadioGroup  onChange={onStatusRadioClick}>
                <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
                <FormControlLabel value="descending" control={<Radio />} label="Descending" />
            </RadioGroup>
        </FormControl>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {clearData(); setShowFilter(false);}}>Close</Button>
          <Button variant="primary" onClick={onSave}>Apply</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}
