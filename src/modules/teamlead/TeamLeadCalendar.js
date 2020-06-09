// /* eslint-disable max-classes-per-file */
// /* eslint-disable react/no-unused-state */
// import * as React from 'react';
// import Paper from '@material-ui/core/Paper';
// import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   Toolbar,
//   MonthView,
//   WeekView,
//   ViewSwitcher,
//   Appointments,
//   AppointmentTooltip,
//   AppointmentForm,
//   DragDropProvider,
//   EditRecurrenceMenu,
//   AllDayPanel,
// } from '@devexpress/dx-react-scheduler-material-ui';
// import { connectProps } from '@devexpress/dx-react-core';
// import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import MomentUtils from '@date-io/moment';
// import { withStyles } from '@material-ui/core/styles';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
// import Fab from '@material-ui/core/Fab';
// import IconButton from '@material-ui/core/IconButton';
// import AddIcon from '@material-ui/icons/Add';
// import TextField from '@material-ui/core/TextField';
// import Notes from '@material-ui/icons/Notes';
// import Close from '@material-ui/icons/Close';
// import CalendarToday from '@material-ui/icons/CalendarToday';
// import Create from '@material-ui/icons/Create';
// import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import { appointments } from './appointments';
// import Layout from "../../components/layout/Layout";
// import moment from 'moment';


// import { remoteRoutes } from "../../data/constants";
// import { post, put } from "../../utils/ajax";
// import { ICreateDayDto } from "./types";
// import { servicesConstants } from "../../data/teamlead/reducer";
// import { FormikHelpers } from "formik";
// import Toast from "../../utils/Toast";
// import { XRemoteSelect } from "../../components/inputs/XRemoteSelect";
// import { useDispatch } from 'react-redux';

// const containerStyles = theme => ({
//   container: {
//     width: theme.spacing(68),
//     padding: 0,
//     paddingBottom: theme.spacing(2),
//   },
//   content: {
//     padding: theme.spacing(2),
//     paddingTop: 0,
//     minWidth: 300,
//     maxWidth: 500,
//   },
//   header: {
//     overflow: 'hidden',
//     paddingTop: theme.spacing(0.5),
//   },
//   closeButton: {
//     float: 'right',
//   },
//   buttonGroup: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 2),
//   },
//   button: {
//     marginLeft: theme.spacing(2),
//   },
//   picker: {
//     marginRight: theme.spacing(2),
//     '&:last-child': {
//       marginRight: 0,
//     },
//     width: '50%',
//   },
//   wrapper: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: theme.spacing(1, 0),
//   },
//   icon: {
//     margin: theme.spacing(2, 0),
//     marginRight: theme.spacing(2),
//   },
//   textField: {
//     width: '100%',
//   },
// });



// class AppointmentFormContainerBasic extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       appointmentChanges: {
//         // taskId: '',
//         // startDate: '',
//         // endDate: '',
//         // taskInfo: '',
//         // userId: '',
//       },
//     };

//     this.getAppointmentData = () => {
//       const { appointmentData } = this.props;
//       return appointmentData;
//     };
//     this.getAppointmentChanges = () => {
//       const { appointmentChanges } = this.state;
//       return appointmentChanges;
//     };


//     this.changeAppointment = this.changeAppointment.bind(this);
//     this.commitAppointment = this.commitAppointment.bind(this);

//     // this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)

//   }


//   // handleChange(event) {
//   //   this.setState({ taskId: event.target.value })
//   // }




//   handleSubmit(event) {
//     alert(this.state.appointmentChanges.taskId)
//     event.preventDefault()
//   }


//   // handleSubmit (event) {
//   //   //alert('A list was submitted: ' + this.state.formvalue);
//   //   event.preventDefault();
//   //   const newAppointment = {
//   //       startDate: this.state.startDate,
//   //       endDate: this.state.endDate,
//   //       taskInfo: this.state.taskInfo,
//   //       userId: this.state.userId
//   //     }

//   //     post(remoteRoutes.appointment, newAppointment)
//   //       .then(response => {           
//   //           this.setState({}) // get age, name and other data from response and set 
//   //                             //  the states here respectively 
//   //       })
//   //       .catch(error => error);  
//   //   }
    
  


//   changeAppointment({ field, changes }) {
//     const nextChanges = {
//       ...this.getAppointmentChanges(),
//       [field]: changes,
//     };
//     this.setState({
//       appointmentChanges: nextChanges,
//     });
//   }

//   commitAppointment(type) {
//     const { commitChanges } = this.props;
//     const appointment = {
//       ...this.getAppointmentData(),
//       ...this.getAppointmentChanges(),
//     };
//     if (type === 'deleted') {
//       commitChanges({ [type]: appointment.id });
//     } else if (type === 'changed') {
//       commitChanges({ [type]: { [appointment.id]: appointment } });
//     } else {
//       commitChanges({ [type]: appointment });
//     }
//     this.setState({
//       appointmentChanges: {},
//     });
//   }

//   render() {
//     const {
//       classes,
//       visible,
//       visibleChange,
//       appointmentData,
//       cancelAppointment,
//       target,
//       onHide,
//     } = this.props;
//     const { appointmentChanges } = this.state;

//     const displayAppointmentData = {
//       ...appointmentData,
//       ...appointmentChanges,
//     };

//     const isNewAppointment = appointmentData.id === undefined;
//     const applyChanges = isNewAppointment
//       ? () => this.commitAppointment('added')
//       : () => this.commitAppointment('changed');

//     const textEditorProps = field => ({
//       variant: 'outlined',
//       onChange: ({ target: change }) => this.changeAppointment({
//         field: [field], changes: change.value,
//       }),
//       value: displayAppointmentData[field] || '',
//       label: field[0].toUpperCase() + field.slice(1),
//       className: classes.textField,
//     });

//     const pickerEditorProps = field => ({
//       className: classes.picker,
//       // keyboard: true,
//       ampm: false,
//       value: displayAppointmentData[field],
//       onChange: date => this.changeAppointment({
//         field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
//       }),
//       inputVariant: 'outlined',
//       format: 'DD/MM/YYYY HH:mm',
//       onError: () => null,
//     });

//     const cancelChanges = () => {
//       this.setState({
//         appointmentChanges: {},
//       });
//       visibleChange();
//       cancelAppointment();
//     };




//     return (
//       <AppointmentForm.Overlay
//         visible={visible}
//         target={target}
//         onHide={onHide}
//         onSubmit={this.handleSubmit}
//       >
//         <div>
//           <div className={classes.header}>
//             <IconButton
//               className={classes.closeButton}
//               onClick={cancelChanges}
//             >
//               <Close color="action" />
//             </IconButton>
//           </div>
//           <div className={classes.content}>
//             <div className={classes.wrapper}>
//               <AssignmentIcon className={classes.icon} color="action" />
//               {/* <TextField
//                 {...textEditorProps('task')}
//               /> */}
//               {/* <XRemoteSelect
//                 remote={remoteRoutes.tasks}
//                 filter={{ 'taskName[]': '' }}
//                 parser={({ taskName, id }) => ({ label: taskName, value: id })}
//                 name="taskId"
//                 label="Task Name"
//                 variant='outlined'
//               /> */}

// <TextField
// name="taskId"
//                 {...textEditorProps('task')}
                
//                 // value={this.state.taskId}
//               />

//             </div>
//             <div className={classes.wrapper}>
//               <CalendarToday className={classes.icon} color="action" />
//               <MuiPickersUtilsProvider utils={MomentUtils}>
//                 <KeyboardDateTimePicker
//                   label="Start Date"
//                   name="startDate"
//                   {...pickerEditorProps('startDate')}
                  
//                   // value={this.state.startDate}
//                 />
//                 <KeyboardDateTimePicker
//                   label="End Date"
//                   name="endDate"
//                   {...pickerEditorProps('endDate')}
//                   onChange={this.handleChange}
//                   // value={this.state.endDate}
//                 />
//               </MuiPickersUtilsProvider>
//             </div>

//             <div className={classes.wrapper}>
//               <Notes className={classes.icon} color="action" />
//               <TextField
//                 {...textEditorProps('task Details')}
                
//                 multiline
//                 rows="6"
//                 name="taskInfo"
//                 // value={this.state.taskInfo}
//               />
//             </div>

//             <div className={classes.wrapper}>
//               <EmojiPeopleIcon className={classes.icon} color="action" />
//               <TextField
//                 {...textEditorProps('volunteers')}
                
//                 name="userId"
//                 // value={this.state.userId}
//               />

//               {/* <XRemoteSelect
//                 remote={remoteRoutes.contactsPerson}
//                 filter={{ 'firstName[]': '' }}
//                 parser={({ firstName, id }) => ({ label: firstName, value: id })}
//                 name="userId"
//                 label="Volunteers"
//                 variant='outlined'
//               /> */}

//             </div>

//           </div>
//           <div className={classes.buttonGroup}>
//             {!isNewAppointment && (
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 className={classes.button}
//                 onClick={() => {
//                   visibleChange();
//                   this.commitAppointment('deleted');
//                 }}
//               >
//                 Delete
//               </Button>
//             )}
//             <Button
//               variant="outlined"
//               color="primary"
//               className={classes.button}
//               onClick={() => {
//                 visibleChange();
//                 applyChanges();
//               }}
//               type="submit"
//             >
//               {isNewAppointment ? 'Create' : 'Save'}
//             </Button>
//           </div>
//         </div>
//       </AppointmentForm.Overlay>
//     );
//   }
// }

// const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

// const styles = theme => ({
//   addButton: {
//     position: 'absolute',
//     bottom: theme.spacing(1) * 3,
//     right: theme.spacing(1) * 4,
//   },
// });

// /* eslint-disable-next-line react/no-multi-comp */
// class TeamLeadCalendar extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: appointments,
//       currentDate: new Date(),
//       confirmationVisible: false,
//       editingFormVisible: false,
//       deletedAppointmentId: undefined,
//       editingAppointment: undefined,
//       previousAppointment: undefined,
//       addedAppointment: {},
//       startDayHour: 9,
//       endDayHour: 19,
//       isNewAppointment: false,
//     };

//     this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
//     this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
//     this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

//     this.commitChanges = this.commitChanges.bind(this);
//     this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
//     this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
//     this.appointmentForm = connectProps(AppointmentFormContainer, () => {
//       const {
//         editingFormVisible,
//         editingAppointment,
//         data,
//         addedAppointment,
//         isNewAppointment,
//         previousAppointment,
//       } = this.state;

//       const currentAppointment = data
//         .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
//         || addedAppointment;
//       const cancelAppointment = () => {
//         if (isNewAppointment) {
//           this.setState({
//             editingAppointment: previousAppointment,
//             isNewAppointment: false,
//           });
//         }
//       };

//       return {
//         visible: editingFormVisible,
//         appointmentData: currentAppointment,
//         commitChanges: this.commitChanges,
//         visibleChange: this.toggleEditingFormVisibility,
//         onEditingAppointmentChange: this.onEditingAppointmentChange,
//         cancelAppointment,
//       };
//     });
//   }




//   componentDidUpdate() {
//     this.appointmentForm.update();
//   }

//   onEditingAppointmentChange(editingAppointment) {
//     this.setState({ editingAppointment });
//   }

//   onAddedAppointmentChange(addedAppointment) {
//     this.setState({ addedAppointment });
//     const { editingAppointment } = this.state;
//     if (editingAppointment !== undefined) {
//       this.setState({
//         previousAppointment: editingAppointment,
//       });
//     }
//     this.setState({ editingAppointment: undefined, isNewAppointment: true });
//   }

//   setDeletedAppointmentId(id) {
//     this.setState({ deletedAppointmentId: id });
//   }

//   toggleEditingFormVisibility() {
//     const { editingFormVisible } = this.state;
//     this.setState({
//       editingFormVisible: !editingFormVisible,
//     });
//   }

//   toggleConfirmationVisible() {
//     const { confirmationVisible } = this.state;
//     this.setState({ confirmationVisible: !confirmationVisible });
//   }

//   commitDeletedAppointment() {
//     this.setState((state) => {
//       const { data, deletedAppointmentId } = state;
//       const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

//       return { data: nextData, deletedAppointmentId: null };
//     });
//     this.toggleConfirmationVisible();
//   }

//   commitChanges({ added, changed, deleted }) {
//     this.setState((state) => {
//       let { data } = state;
//       if (added) {
//         const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
//         data = [...data, { id: startingAddedId, ...added }];
//       }
//       if (changed) {
//         data = data.map(appointment => (
//           changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
//       }
//       if (deleted !== undefined) {
//         this.setDeletedAppointmentId(deleted);
//         this.toggleConfirmationVisible();
//       }
//       return { data, addedAppointment: {} };
//     });
//   }

//   render() {
//     const {
//       currentDate,
//       data,
//       confirmationVisible,
//       editingFormVisible,
//       startDayHour,
//       endDayHour,
//     } = this.state;
//     const { classes } = this.props;

//     return (
//       <Layout>
//         <Paper>
//           <Scheduler
//             data={data}
//             height={660}
//           >
//             {/* <MuiPickersUtilsProvider utils={MomentUtils}>
//                 <KeyboardDateTimePicker
//                 />
//               </MuiPickersUtilsProvider> */}
//             <ViewState
//               currentDate={currentDate}
//             />
//             <EditingState
//               onCommitChanges={this.commitChanges}
//               onEditingAppointmentChange={this.onEditingAppointmentChange}
//               onAddedAppointmentChange={this.onAddedAppointmentChange}
              
//             />
//             <WeekView
//               startDayHour={startDayHour}
//               endDayHour={endDayHour}
//             />
//             <MonthView />
//             <AllDayPanel />
//             <EditRecurrenceMenu />
//             <Appointments />
//             <AppointmentTooltip
//               showOpenButton
//               showCloseButton
//               showDeleteButton
//             />
//             <Toolbar />
//             <ViewSwitcher />
//             <AppointmentForm
//               overlayComponent={this.appointmentForm}
//               visible={editingFormVisible}
//               onVisibilityChange={this.toggleEditingFormVisibility}
              
//             />
//             <DragDropProvider />
//           </Scheduler>

//           <Dialog
//             open={confirmationVisible}
//             onClose={this.cancelDelete}
//           >
//             <DialogTitle>
//               Delete Appointment
//           </DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Are you sure you want to delete this appointment?
//             </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
//                 Cancel
//             </Button>
//               <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
//                 Delete
//             </Button>
//             </DialogActions>
//           </Dialog>

//           <Fab
//             color="secondary"
//             className={classes.addButton}
//             onClick={() => {
//               this.setState({ editingFormVisible: true });
//               this.onEditingAppointmentChange(undefined);
//               this.onAddedAppointmentChange({
//                 startDate: new Date(currentDate).setHours(startDayHour),
//                 endDate: new Date(currentDate).setHours(startDayHour + 1),
//               });
//             }}
//           >
//             <AddIcon />
//           </Fab>
//         </Paper>
//       </Layout>
//     );
//   }
// }

// export default withStyles(styles, { name: 'EditingDemo' })(TeamLeadCalendar);










import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { remoteRoutes } from "../../data/constants";
import Layout from "../../components/layout/Layout";


























// const containerStyles = theme => ({
//   container: {
//     width: theme.spacing(68),
//     padding: 0,
//     paddingBottom: theme.spacing(2),
//   },
//   content: {
//     padding: theme.spacing(2),
//     paddingTop: 0,
//     minWidth: 300,
//     maxWidth: 500,
//   },
//   header: {
//     overflow: 'hidden',
//     paddingTop: theme.spacing(0.5),
//   },
//   closeButton: {
//     float: 'right',
//   },
//   buttonGroup: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 2),
//   },
//   button: {
//     marginLeft: theme.spacing(2),
//   },
//   picker: {
//     marginRight: theme.spacing(2),
//     '&:last-child': {
//       marginRight: 0,
//     },
//     width: '50%',
//   },
//   wrapper: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: theme.spacing(1, 0),
//   },
//   icon: {
//     margin: theme.spacing(2, 0),
//     marginRight: theme.spacing(2),
//   },
//   textField: {
//     width: '100%',
//   },
// });



// class AppointmentFormContainerBasic extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       appointmentChanges: {},
//     };

//     this.getAppointmentData = () => {
//       const { appointmentData } = this.props;
//       return appointmentData;
//     };
//     this.getAppointmentChanges = () => {
//       const { appointmentChanges } = this.state;
//       return appointmentChanges;
//     };

//     this.changeAppointment = this.changeAppointment.bind(this);
//     this.commitAppointment = this.commitAppointment.bind(this);

//   }

//   changeAppointment({ field, changes }) {
//     const nextChanges = {
//       ...this.getAppointmentChanges(),
//       [field]: changes,
//     };
//     this.setState({
//       appointmentChanges: nextChanges,
//     });
//   }

//   commitAppointment(type) {
//     const { commitChanges } = this.props;
//     const appointment = {
//       ...this.getAppointmentData(),
//       ...this.getAppointmentChanges(),
//     };
//     if (type === 'deleted') {
//       commitChanges({ [type]: appointment.id });
//     } else if (type === 'changed') {
//       commitChanges({ [type]: { [appointment.id]: appointment } });
//     } else {
//       commitChanges({ [type]: appointment });
//     }
//     this.setState({
//       appointmentChanges: {},
//     });
//   }

//   render() {
//     const {
//       classes,
//       visible,
//       visibleChange,
//       appointmentData,
//       cancelAppointment,
//       target,
//       onHide,
//     } = this.props;
//     const { appointmentChanges } = this.state;

//     const displayAppointmentData = {
//       ...appointmentData,
//       ...appointmentChanges,
//     };

//     const isNewAppointment = appointmentData.id === undefined;
//     const applyChanges = isNewAppointment
//       ? () => this.commitAppointment('added')
//       : () => this.commitAppointment('changed');

//     const textEditorProps = field => ({
//       variant: 'outlined',
//       onChange: ({ target: change }) => this.changeAppointment({
//         field: [field], changes: change.value,
//       }),
//       value: displayAppointmentData[field] || '',
//       label: field[0].toUpperCase() + field.slice(1),
//       className: classes.textField,
//     });

//     const pickerEditorProps = field => ({
//       className: classes.picker,
//       // keyboard: true,
//       ampm: false,
//       value: displayAppointmentData[field],
//       onChange: date => this.changeAppointment({
//         field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
//       }),
//       inputVariant: 'outlined',
//       format: 'DD/MM/YYYY HH:mm',
//       onError: () => null,
//     });

//     const cancelChanges = () => {
//       this.setState({
//         appointmentChanges: {},
//       });
//       visibleChange();
//       cancelAppointment();
//     };




//     return (
//       <AppointmentForm.Overlay
//         visible={visible}
//         target={target}
//         onHide={onHide}
//       >
//         <div>
//           <div className={classes.header}>
//             <IconButton
//               className={classes.closeButton}
//               onClick={cancelChanges}
//             >
//               <Close color="action" />
//             </IconButton>
//           </div>
//           <div className={classes.content}>
//             <div className={classes.wrapper}>
//               <AssignmentIcon className={classes.icon} color="action" />
//               {/* <TextField
//                 {...textEditorProps('task')}
//               /> */}
//               {/* <XRemoteSelect
//                 remote={remoteRoutes.tasks}
//                 filter={{ 'taskName[]': '' }}
//                 parser={({ taskName, id }) => ({ label: taskName, value: id })}
//                 name="taskId"
//                 label="Task Name"
//                 variant='outlined'
//               /> */}

// <TextField
// name="taskId"
//                 {...textEditorProps('task')}
                
//                 // value={this.state.taskId}
//               />

//             </div>
//             <div className={classes.wrapper}>
//               <CalendarToday className={classes.icon} color="action" />
//               <MuiPickersUtilsProvider utils={MomentUtils}>
//                 <KeyboardDateTimePicker
//                   label="Start Date"
//                   name="startDate"
//                   {...pickerEditorProps('startDate')}
//                 />
//                 <KeyboardDateTimePicker
//                   label="End Date"
//                   name="endDate"
//                   {...pickerEditorProps('endDate')}
//                   onChange={this.handleChange}
//                 />
//               </MuiPickersUtilsProvider>
//             </div>

//             <div className={classes.wrapper}>
//               <Notes className={classes.icon} color="action" />
//               <TextField
//                 {...textEditorProps('task Details')}                
//                 multiline
//                 rows="6"
//                 name="taskInfo"
//               />
//             </div>

//             <div className={classes.wrapper}>
//               <EmojiPeopleIcon className={classes.icon} color="action" />
//               <TextField
//                 {...textEditorProps('volunteers')}
                
//                 name="userId"
//               />

//               {/* <XRemoteSelect
//                 remote={remoteRoutes.contactsPerson}
//                 filter={{ 'firstName[]': '' }}
//                 parser={({ firstName, id }) => ({ label: firstName, value: id })}
//                 name="userId"
//                 label="Volunteers"
//                 variant='outlined'
//               /> */}

//             </div>

//           </div>
//           <div className={classes.buttonGroup}>
//             {!isNewAppointment && (
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 className={classes.button}
//                 onClick={() => {
//                   visibleChange();
//                   this.commitAppointment('deleted');
//                 }}
//               >
//                 Delete
//               </Button>
//             )}
//             <Button
//               variant="outlined"
//               color="primary"
//               className={classes.button}
//               onClick={() => {
//                 visibleChange();
//                 applyChanges();
//               }}
//               type="submit"
//             >
//               {isNewAppointment ? 'Create' : 'Save'}
//             </Button>
//           </div>
//         </div>
//       </AppointmentForm.Overlay>
//     );
//   }
// }

// const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

// const styles = theme => ({
//   addButton: {
//     position: 'absolute',
//     bottom: theme.spacing(1) * 3,
//     right: theme.spacing(1) * 4,
//   },
// });






































const URL = 'http://localhost:4002/api/appointment/appointments';

const makeQueryString = (currentDate, currentViewName) => {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  const start = moment(currentDate).startOf(currentViewName.toLowerCase());
  const end = start.clone().endOf(currentViewName.toLowerCase());
  return encodeURI(`${URL}?filter=[["endDate", ">", "${start.format(format)}"],["startDate", "<", "${end.format(format)}"]]`);
};

const styles = {
  toolbarRoot: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
};

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  ),
);

const mapAppointmentData = appointment => ({
  ...appointment,
  // taskId: appointment.taskId,
  startDate: appointment.startDate,
  endDate: appointment.endDate,
  taskInfo: appointment.taskInfo,
  // volunteers: appointment.volunteers,
  
});

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentViewName: 'Day',
      currentDate: new Date(),
      // confirmationVisible: false,
      // editingFormVisible: false,
      // deletedAppointmentId: undefined,
      // editingAppointment: undefined,
      // previousAppointment: undefined,
      // addedAppointment: {},
      // startDayHour: 9,
      // endDayHour: 19,
      // isNewAppointment: false,
    };
    this.loadData = this.loadData.bind(this);
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName, loading: true });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate, loading: true });
    };




  //   this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
  //   this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
  //   this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

  //   this.commitChanges = this.commitChanges.bind(this);
  //   this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
  //   this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
  //   this.appointmentForm = connectProps(AppointmentFormContainer, () => {
  //     const {
  //       editingFormVisible,
  //       editingAppointment,
  //       data,
  //       addedAppointment,
  //       isNewAppointment,
  //       previousAppointment,
  //     } = this.state;

  //     const currentAppointment = data
  //       .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
  //       || addedAppointment;
  //     const cancelAppointment = () => {
  //       if (isNewAppointment) {
  //         this.setState({
  //           editingAppointment: previousAppointment,
  //           isNewAppointment: false,
  //         });
  //       }
  //     };

  // }
}

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const { currentDate, currentViewName } = this.state;
    const queryString = makeQueryString(currentDate, currentViewName);
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }
    fetch(queryString)
      .then(response => response.json())
      .then(({ data }) => {
        setTimeout(() => {
          this.setState({
            data,
            loading: false,
          });
        }, 600);
      })
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  render() {
    const {
      data, loading,
      currentDate, currentViewName,
    } = this.state;

    const formattedData = data
      ? data.map(mapAppointmentData) : [];

    return (
      <Layout>
      <Paper>
        <Scheduler
          data={formattedData}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <DayView
            startDayHour={9}
            endDayHour={18}
          />
          <WeekView
            startDayHour={9}
            endDayHour={18}
          />
          <Appointments />
          <Toolbar
            {...loading ? { rootComponent: ToolbarWithLoading } : null}
          />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
          />
          <AppointmentForm 
          // overlayComponent={this.appointmentForm}
          // visible={editingFormVisible}
          // onVisibilityChange={this.toggleEditingFormVisibility}
          />
        </Scheduler>
      </Paper>
      </Layout>
    );
  }
}



