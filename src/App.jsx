import './App.css'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system'
import { Button, FormControl, InputLabel, styled, TextField, useTheme } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup'

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: theme.spacing(3),
}))

function AdminFields({ formik }) {
    return (
        <>
            <TextField label="AdminField1" variant="outlined" name="adminField1" error={formik.errors.adminField1} helperText={formik.errors.adminField1} value={formik.values.adminField1} onChange={formik.handleChange} />
            <TextField label="AdminField2" variant="outlined" name="adminField2" error={formik.errors.adminField2} helperText={formik.errors.adminField2} value={formik.values.adminField2} onChange={formik.handleChange} />
        </>
    )
}

function CustomerFields({ formik }) {
    return (
        <>
            <TextField label="CustomerField1" variant="outlined" name="customerField1" error={formik.errors.customerField1} helperText={formik.errors.customerField1} value={formik.values.customerField1} onChange={formik.handleChange} />
            <TextField label="CustomerField2" variant="outlined" name="customerField2" error={formik.errors.customerField2} helperText={formik.errors.customerField2} value={formik.values.customerField2} onChange={formik.handleChange} />
        </>
    )
}

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    role: yup.string().required(),
}).when((values, schema) => {
    if (values.role === 'admin') {
        return schema.shape({
            adminField1: yup.string().required(),
            adminField2: yup.string().required(),
        })
    }
    if (values.role === 'customer') {
        return schema.shape({
            customerField1: yup.string().required(),
            customerField2: yup.string().required(),
        })
    }
})

function Form({ onSubmit }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            role: '',
        },
        validationSchema,
        onSubmit
    })

    return (
        <>
            <TextField label="Name" variant="outlined" name="name" value={formik.values.name} onChange={formik.handleChange} error={formik.errors.name} helperText={formik.errors.name} />
            <FormControl fullWidth error={formik.errors.role}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select labelId="role-label" label="Role" variant="outlined" name="role" value={formik.values.role} onChange={formik.handleChange}>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                </Select>
                <FormHelperText>{formik.errors.role} </FormHelperText>
            </FormControl>

            {formik.values.role === 'admin' && <AdminFields formik={formik} />}
            {formik.values.role === 'customer' && <CustomerFields formik={formik} />}

            <Button variant="contained" onClick={formik.handleSubmit}>Submit</Button>
        </>
    )
}

function App() {
    const [values, setValues] = useState(null)
    const stringifiedValues = JSON.stringify(values, null, 2)
    function handleSubmit(values) {
        if(values.role === 'admin') {
            setValues({
                name: values.name,
                role: values.role,
                adminField1: values.adminField1,
                adminField2: values.adminField2,
            })
        } else if(values.role === 'customer') {
            setValues({
                name: values.name,
                role: values.role,
                customerField1: values.customerField1,
                customerField2: values.customerField2,
            })
        }
    }

    return (
        <div className="App">
            <Box display="flex" gap={6}>
                <StyledBox>
                    <Form onSubmit={handleSubmit} />
                </StyledBox>
                <StyledBox>
                    <pre style={{ textAlign: 'left' }}>{stringifiedValues}</pre>
                </StyledBox>
            </Box>
        </div>
    )
}

export default App
