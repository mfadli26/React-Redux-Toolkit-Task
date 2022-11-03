import { createSlice } from "@reduxjs/toolkit";

const listOfEmployee = [
    { empId: 1, fullname: 'Naufal', salary: 4500 },
    { empId: 2, fullname: 'Firdaus', salary: 5500 },
    { empId: 3, fullname: 'Ahmad', salary: 3500 }
]

export const empSlice = createSlice({
    name: 'cart',
    initialState:{
        employee : [...listOfEmployee],
        totalSalary : listOfEmployee.reduce((sum,el)=> sum + el.salary,0)
    },
    reducers : {
        doGetEmps: state => {
            return state
        },
        doAddEmps: (state, action) =>{
            const {payload} = action
            return {
                ...state,
                employee : [...state.employee,payload],
                totalSalary : listOfEmployee.reduce((sum,el)=> sum + el.salary,0)
            }
        },
        doUpdateSalaryEmp: (state, action) =>{
            const {payload} = action
            const index = payload.index
            console.log(payload);
            return {
                ...state,
                employee: state.employee.map(
                    (row, i) => i === index ?
                        {...row, salary: payload.salary}
                        : row
                )
            }     
        }
    }
})

export const {doAddEmps,doGetEmps,doUpdateSalaryEmp} = empSlice.actions
export default empSlice.reducer