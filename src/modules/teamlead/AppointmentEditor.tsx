import React from 'react';
import * as yup from "yup";
import {reqDate, reqObject, reqString} from "../../data/validations";
import { FormikHelpers } from "formik";
import Grid from "@material-ui/core/Grid";
import XForm from "../../components/forms/XForm";
import XTextInput from "../../components/inputs/XTextInput";
import XSelectInput from "../../components/inputs/XSelectInput";
import { toOptions } from "../../components/inputs/inputHelpers";
import { remoteRoutes } from "../../data/constants";
import { ministryCategories } from "../../data/comboCategories";
import { handleSubmission, ISubmission } from "../../utils/formHelpers";
import { IOption } from "../../components/inputs/inputHelpers";
import { useDispatch } from "react-redux";
import { servicesConstants } from "../../data/teamlead/reducer";
import { post } from "../../utils/ajax";
import Toast from "../../utils/Toast";
import XDateInput from "../../components/inputs/XTimeInput";
import {XRemoteSelect} from "../../components/inputs/XRemoteSelect";
import {Box} from "@material-ui/core";

interface IProps {
    data: any
    isNew: boolean
    done: (dt: any) => any
}

const schema = yup.object().shape(
    {
        taskId: reqString,
        startDate: reqDate,
        endDate: reqDate,
        taskInfo: reqString,
        assignedTo: reqObject
    }
)

const schemaNew = yup.object().shape(
    {
        taskId: reqString,
        startDate: reqDate,
        endDate: reqDate,
        taskInfo: reqString,
        assignedTo: reqObject 
    }
)

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


const AppointmentEditor = ({ data, isNew, done }: IProps) => {
    const dispatch = useDispatch();
    function handleSubmit(values: any, actions: FormikHelpers<any>) {
        const toSave: any = {
            taskId: values.taskId,
            startDate: values.startDate,
            endDate: values.endDate,
            taskInfo: values.taskInfo,
            assignedTo: values.assignedTo.value,
        }
    post(
        remoteRoutes.day,
        toSave,
        (data) => {
            Toast.info("Edit Appointment Succesfull!");
            actions.resetForm();
            dispatch({
                type: servicesConstants.servicesAddDay,
                payload: { ...data },
            });
        },
        undefined,
        () => {
            actions.setSubmitting(false);
        }
    );
}
    return (
        <XForm
            onSubmit={handleSubmit}
            schema={isNew ? schemaNew : schema}
            initialValues={data}
        >
            <Grid spacing={1} container>
                
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
    );
}


export default AppointmentEditor;