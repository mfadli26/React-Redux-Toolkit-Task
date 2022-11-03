import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import EmpForm from '../Form/FormInput'
import { doGetEmps, doAddEmps, doUpdateSalaryEmp } from '../ReduxToolkit/EmpSlice'

export default function EmployeeReduxToolkit() {
    const dispatch = useDispatch()
    const emp = useSelector(state=>state.empStore.employee)
    const total = useSelector(state=> state.empStore.totalSalary)

    const [ employee, setEmployee ] = useState(emp)

    const [display, setDisplay] = useState(false)
    const [values,setValues] = useState({
        fullname: undefined,
        salary: 0
    })
    const HandleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const onSubmit = (event) => {
        event.preventDefault()
        const payload = {
            empId: (Math.round(Math.random() * 10)),
            fullname: values.fullname,
            salary: Number(values.salary)
        }
        dispatch(doAddEmps(payload))
        setDisplay(false)
    }

    const PenambahanGaji = (index) => {
        const oldSalary = emp[index].salary
        const payload = {
            salary: oldSalary + 500,
            index: index
        }
        dispatch(doUpdateSalaryEmp(payload))
    }
    const PenguranganGaji = (index) => {
        const oldSalary = emp[index].salary
        const payload = {
            salary: oldSalary - 500,
            index: index
        }
        dispatch(doUpdateSalaryEmp(payload))
    }
    console.log('emp', emp);
    console.log('employee', employee);
    return (
        <div style={{marginTop: '40px'}}>
            <div className='container' style={{border: 'solid 1px black', width: '35vw', margin: 'auto', padding: '20px'}}>
                <h2>List Employee</h2>
                <button onClick={() => setDisplay(true)}>Add Employee</button>
                {
                    display ?
                        <EmpForm
                            OnSubmitForm={onSubmit}
                            HandleOnChange={HandleChange}
                            setDisplay={setDisplay}
                        /> :
                        <>
                            <table className='table' style={{borderCollapse: 'collapse', width: '100%', textAlign: 'left'}}>
                                <th style={{border: 'solid 2px white', padding: '10px'}}>Employee ID</th>
                                <th style={{border: 'solid 2px white', padding: '10px'}}>Full Name</th>
                                <th style={{border: 'solid 2px white', padding: '10px'}}>Salary</th>
                                <th style={{border: 'solid 2px white', padding: '10px', textAlign: 'center'}}>Action</th>
                                <tbody>
                                    {
                                        (emp || []).map((emp, index) => {
                                            return (
                                                <tr key={emp.empId}>
                                                    <td style={{border: 'solid 2px white', padding: '10px', backgroundColor: index%2===0 ? '#f2f2f2' : 'white'}}>{emp.empId}</td>
                                                    <td style={{border: 'solid 2px white', padding: '10px', backgroundColor: index%2===0 ? '#f2f2f2' : 'white'}}>{emp.fullname}</td>
                                                    <td style={{border: 'solid 2px white', padding: '10px', backgroundColor: index%2===0 ? '#f2f2f2' : 'white'}}>{emp.salary}</td>
                                                    <td style={{textAlign: 'center', border: 'solid 2px white', padding: '10px', backgroundColor: index%2===0 ? '#f2f2f2' : 'white'}}>
                                                        <button onClick={() => PenambahanGaji(index)} style={{padding: '2px', width: '35px', margin: '0 5px'}}> + </button>
                                                        <button onClick={() => PenguranganGaji(index)} style={{padding: '2px', width: '35px', margin: '0 5px'}}> - </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table></>
                }
                <h3>Total Salary : {total}</h3>
            </div>
        </div>
    )
    }
