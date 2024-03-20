import { Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

export const AppliedFilter = ({filter, modifyFilter}) => {
    const [applied, setApplied] = useState(Object.keys(filter).length > 0)


    useEffect(()=>{

    }, [filter])

    const eliminatePriority = (toDelete)=>{
        let array = filter.priority
        let index = array.indexOf(toDelete)
        if(index > -1) {
            array.splice(index, 1)
            if(array.length > 0)
                modifyFilter({priority: array, ...filter})
            else {
                const newFilter = { ...filter };
                delete newFilter['priority'];
                
                modifyFilter(newFilter)
            }
        }
    }

    const removeKey = (keyToRemove)=>{
        const newFilter = Object.keys(filter).reduce((acc, key)=>{
            if(key !== keyToRemove) {
                // console.log(key)
                // console.log("acc " + acc)
                // console.log(filter[key])
                acc[key] = filter[key]
            }
            return acc
        }, {})
        modifyFilter(newFilter)
    }

    const chipsList = ()=>{
        let str = []
        if(Object.keys(filter).length === 0) return <></> 
        
        const keys = Object.keys(filter)
        
        for(const item of keys) {
            switch(item) {
                case 'complete':
                    if(item === 'complete') {
                        if(filter.complete === 1) {
                            str = [...str, "Complete"]
                        } else {
                            str = [...str, "Incomplete"]
                        }
                    }
                    break;
                case 'priority':
                    console.log(filter)
                    filter['priority'].forEach((x)=>{
                        str = [...str, "Priority: " + x]
                    })
                    // str = [...str, "Priority: " + filter['priority']]
                    break;
                case 'due':
                    if(filter.due === 1) {
                        str = [...str, "Due date: Ascending"]
                    } else {
                        str = [...str, "Due date: Descending"]
                    }
                default:
                    break;
            }
            
        }
        const sth = str.map((x) => {
            return <Chip label={x} onDelete={()=>{
                console.log("delete button pressed on : " + x)
                switch(x) {
                    case 'Complete':
                        
                    case 'Incomplete':
                        removeKey('complete')
                        break;
                    case 'Priority: Low':
                        eliminatePriority('Low')
                        break
                    case 'Priority: Medium':
                        eliminatePriority('Medium')
                        break
                    case 'Priority: High':
                        eliminatePriority('High')
                        break
                    
                    case 'Due date: Ascending':
                    case 'Due date: Descending':
                        removeKey('due')
                        break;
                    
                    case 'Creation date: Ascending':
                    case 'Creation date: Descending':
                        removeKey('created')
                    default:
                        break;
                }
            }}/>
        });
        return sth
    }

  return (
    <>
        {applied}<Container>
            {chipsList()}
        </Container>
        {!applied}<></>
    </>
  )
}
