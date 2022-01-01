import React, { useState, useEffect } from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'
import FormikController from '../../FormikComponent/FormikController';
const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
})

const Login = (props) => {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    useEffect(async()=>{
        try{
            await axios({
                method: 'get',
                url: '/api/userService/userDetails',
                headers: { 'Authorization': localStorage.getItem("accessToken") }
              });
        navigate('/home')
    }catch(err){
        console.log(err)
        navigate('/')
    }
    },[])
    const handleSubmit = async (values) => {
        let res = await axios.post('/api/userAuthService/login', {
            username: values.email,
            password: values.password
        })

        if (res.data.status == 1) {
            localStorage.setItem("accessToken", res.data.accessToken)
            localStorage.setItem("refreshToken", res.data.refreshToken)
            navigate('/home')
        } else {
            setError(true)
        }
    }
    const { classes } = props;
    return (
        <>
            <div className={classes.root}>
                <h1>Login!</h1>
                <Formik
                    initialValues={{
                        password: '',
                        email: '',
                        acceptedTerms: true, // added for our checkbox
                    }}
                    validationSchema={Yup.object({
                        password: Yup.string()
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required')
                    })}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <FormikController 
                                    control="input"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                            <FormikController 
                                    control="input"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="*****"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                {error && <p color="red">Incorrect Email or password</p>}
                                <Button type="submit">Submit</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
        </>
    );
};
export default (withStyles(styles, { withTheme: true })(Login))