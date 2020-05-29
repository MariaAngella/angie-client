import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import WbSunny from '@material-ui/icons/WbSunny';
import FilterDrama from '@material-ui/icons/FilterDrama';
import Opacity from '@material-ui/icons/Opacity';
import ColorLens from '@material-ui/icons/ColorLens';
import { withStyles, createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { owners } from '../../data/teamlead/tasks';
import Layout from "../../components/layout/Layout";
import {remoteRoutes} from "../../data/constants";
import AssignTask from './AssignTask'
// import Calendar from './AppointmentForm'


import {Fragment, useEffect, useState} from "react";
import EditDialog from "../../components/EditDialog";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const resources = [{
  fieldName: 'ownerId',
  title: 'Volunteers',
  instances: owners,
}];

const getBorder = (theme: any) => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
}`);

const DayScaleCell = (props: any) => (
  <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }}  />
);




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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





const styles = (theme: Theme) => createStyles({
  cell: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    'tr:last-child &': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    padding: '0.5em',
    textAlign: 'center',
  },
  sun: {
    color: '#FFEE58',
  },
  cloud: {
    color: '#90A4AE',
  },
  rain: {
    color: '#4FC3F7',
  },
  sunBack: {
    backgroundColor: '#FFFDE7',
  },
  cloudBack: {
    backgroundColor: '#ECEFF1',
  },
  rainBack: {
    backgroundColor: '#E1F5FE',
  },
  opacity: {
    opacity: '0.5',
  },
  appointment: {
    borderRadius: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
  apptContent: {
    '&>div>div': {
      whiteSpace: 'normal !important',
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: 'none',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  tooltipText: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: 'middle',
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});

interface IProp {
  classes: any;
  id: number;

}


interface IProps {
  classes: any;
  startDate: any;
  formatDate: any;
  otherMonth: any;
 
}




const CellBase = React.memo(({
  classes,
  startDate,
  formatDate,
  otherMonth,
}: IProps) => {
  const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
  const isFirstMonthDay = startDate.getDate() === 1;
  const formatOptions = isFirstMonthDay
    ? { day: 'numeric', month: 'long' }
    : { day: 'numeric' };


    const [createDialog, setCreateDialog] = useState(false);

    function handleNew() {
      setCreateDialog(true)
  }

    function closeCreateDialog() {
      setCreateDialog(false)
  }

    // const createComponent = <AssignTask data={{}} done={closeCreateDialog}/>
    
    const createComponent = <Paper>
     
      <AppointmentTooltip
          
            showOpenButton
          />
      <AppointmentForm />
      
  </Paper>
    
    const createTitle = "New Assignment"
  return (
    
        
    <TableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true,
        [classes.opacity]: otherMonth,
      })}
    
    >
      <div className={classes.text} onClick={handleNew}>
        {formatDate(startDate, formatOptions)}
      </div>
      
      <EditDialog title={createTitle} open={createDialog} onClose={closeCreateDialog}>
                {createComponent}
                </EditDialog>
              
    </TableCell>
    
  );
});

const TimeTableCell: any = withStyles(styles, { name: 'Cell' })(CellBase);

const Appointment: any = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }: any) => (
  <Appointments.Appointment
    {...restProps}
    className={classes.appointment}
  />
));


const AppointmentContent: any = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }: any) => (
  <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
));

const FlexibleSpace: any = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }: any) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <div className={classes.flexContainer}>
      <ColorLens fontSize="large" htmlColor="#FF7043" />
      <Typography variant="h5" style={{ marginLeft: '10px' }}>Team Lead Calendar</Typography>
    </div>
  </Toolbar.FlexibleSpace>
));

export default class TeamLeadCalendar extends React.PureComponent<{},any> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      defaultCurrentDate: new Date(),
    };

    this.commitChanges = this.commitChanges.bind(this);
  
  }

  async componentDidMount() {
  
    const res = await fetch(remoteRoutes.day);
    const json = await res.json();
    console.log(json);
   
  
   

   
  const appoints: any = [];
  json.map((item: any, index: any)=>{
    appoints.push({
      ownerId:item["id"],
      title:item["taskId"],
      startDate:new Date(item["startDate"]),
      endDate:new Date(item["endDate"]),
     
      
    })
    return ""
  });
  
  console.log(appoints);
  this.setState({
    data: appoints
    }) 
}


 

  
  commitChanges({ added, changed, deleted }: any) {
    this.setState((state: any) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment: { id: any;}) => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter((appointment: { id: any; }) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, defaultCurrentDate } = this.state;
    
    
    return (
      <Layout>
        
      <Paper>
        <Scheduler
          data={data}
        >
          
          <EditingState
            onCommitChanges={this.commitChanges}
          />

<IntegratedEditing />

          <ViewState
            defaultCurrentDate={defaultCurrentDate}

          />

          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
            
          />

          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />
          <Resources
            data={resources}
          />

          <Toolbar
            flexibleSpaceComponent={FlexibleSpace}
          />
          <DateNavigator />

          <EditRecurrenceMenu />
          <AppointmentTooltip
            showCloseButton
            showDeleteButton
            showOpenButton
          />
          <AppointmentForm />
          <DragDropProvider />
        </Scheduler>
      </Paper>
      </Layout>
    );
  }
}
