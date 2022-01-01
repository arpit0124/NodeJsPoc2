import React,{useEffect, useState} from 'react'
import AuthenticatedPage from "../../HOC/AuthenticatedPage";
import { useNavigate } from 'react-router-dom'

const Details = (props)=> {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [dateTime, setDateTime] = useState()
    const navigate = useNavigate()

    useEffect(async()=>{
        try{
        let res = await props.authenticatedApiCall("get",'/api/userService/userDetails',null)
        if (res.data.status == 1) {
            let resObj = res.data.result
            setFirstName(resObj.firstName)
            setLastName(resObj.lastName)
            setDateTime(resObj.dateTime)
        }
    }catch(err){
        console.log(err)
        navigate('/')
    }
    },[])
    return (
        <div>
            <h1>Hi, Welcome {`${firstName} ${lastName}. Login At ${dateTime}`}</h1>
        </div>
    )
}

export default AuthenticatedPage(Details)
