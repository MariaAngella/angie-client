import React from 'react';
import * as yup from "yup";
import {reqDate, reqObject, reqString} from "../../data/validations";
// import {ministryCategories} from "../../data/comboCategories";
import {FormikHelpers} from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../components/forms/XForm";
import XTextInput from "../../components/inputs/XTextInput";
import XDateInput from "../../components/inputs/XTimeInput";
import XSelectInput from "../../components/inputs/XSelectInput";
import {toOptions} from "../../components/inputs/inputHelpers";

import {remoteRoutes} from "../../data/constants";
import {useDispatch} from 'react-redux';
import {servicesConstants} from "../../data/teamlead/reducer";
import {post, put} from "../../utils/ajax";
import Toast from "../../utils/Toast";
import {XRemoteSelect} from "../../components/inputs/XRemoteSelect";
import {Box} from "@material-ui/core";
import {ICreateDayDto} from "./types";
import {isoDateString} from "../../utils/dateHelpers";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Header from "./Header";
import { owners } from '../../data/teamlead/tasks';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import {enumToArray} from "../../utils/stringHelpers";

import {ministryCategories} from "../../data/comboCategories";

interface IProps {
    data: any | null
    done?: () => any
   
}

const schema = yup.object().shape(
  {
      taskId: reqString,
      startDate: reqDate,
      endDate: reqDate,
      taskInfo: reqString,
      assignedTo: reqObject,
      
     
  }
)

const initialValues = {

  taskId: '',
  startDate: '',
  endDate: '',
  taskInfo: '',
  assignedTo: null,
  
}

const RightPadded = ({children,...props}: any) => <Grid item xs={6}>
    <Box pr={1} {...props}>
        {children}
    </Box>
</Grid>

const LeftPadded = ({children,...props}: any) => <Grid item xs={6}>
    <Box pl={1} {...props}>
        {children}
    </Box>
</Grid>


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
          },
        root: {
            flexGrow: 1,
        },
        filterPaper: {
            borderRadius: 0,
            padding: theme.spacing(2)
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

const AssignTask = ({ done}: IProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    function handleSubmit(values: any, actions: FormikHelpers<any>) {

        const toSave: ICreateDayDto = {
    //   taskId: values.taskId,
      startDate: values.startDate,
      endDate: values.endDate,
      taskInfo: values.taskInfo,
      userId: values.userId.value,
     

        }

        post(remoteRoutes.appointment, toSave,
            (data) => {
                Toast.info('Operation successful')
                actions.resetForm()
                dispatch({
                    type: servicesConstants.servicesAddDay,
                    payload: {...data},
                })
                if (done)
                    done()
            },
            undefined,
            () => {
                actions.setSubmitting(false);

            }
        )
    }





    // enum TeamPrivacy {
    //     Sweeping = "sweeping",
    //     Mopping = "mopping",
    //     Coaching = "coaching",
    //     Arranging = "Arranging church",

    // }
    


    return (

        <Box p={1} className={classes.root}>
            <Header title="Assign Volunteers Task" />

            <Grid item xs={6}>
                <XForm
                    onSubmit={handleSubmit}
                    schema={schema}
                    initialValues={initialValues}
                >
                    <Grid spacing={0} container>
                        <Grid item xs={12}>
                        <XSelectInput
                                name="taskId"
                                label="Task Name"
                                // options={toOptions(enumToArray(TeamPrivacy))}
                                options={toOptions(ministryCategories)}
                                variant='outlined'
                            />
                            {/* <XRemoteSelect
                            remote={remoteRoutes.tasks}
                            filter={{'taskName[]': ''}}
                            parser={({taskName, id}: any) => ({label: taskName, value: id})}
                            name="taskId"
                            label="Task Name"
                            variant='outlined'
                            /> */}
                        </Grid>
                        <RightPadded>
                        <XDateInput
                                name="startDate"
                                label="Start Date"
                                
                            />
                        </RightPadded>
                        <LeftPadded>
                        <XDateInput
                                name="endDate"
                                label="End Date"
                                
                            />
                        </LeftPadded>
                        <Grid item xs={12}>
                        <XTextInput
                                name="taskInfo"
                                label="Task Details"
                                type="text"
                                variant='outlined'
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <XRemoteSelect
                            remote={remoteRoutes.contactsPerson}
                            filter={{'firstName[]': ''}}
                            parser={({firstName, id}: any) => ({label: firstName, value: id})}
                            name="assignedTo"
                            label="Volunteers"
                            variant='outlined'
                            />
           
                        </Grid>
                    </Grid>
                   
                </XForm>
            </Grid>
        </Box>
   


 
    );
}


export default AssignTask;