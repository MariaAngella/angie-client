import React, { useEffect, useState }  from 'react';
import {Box} from "@material-ui/core";
import {remoteRoutes} from "../../data/constants";

import Layout from "../../components/layout/Layout";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Header from "./Header";
import { search } from "../../utils/ajax";
import MaterialTable, { Column } from 'material-table';
import EditDialog from "../../components/EditDialog";
import DataList from "../../components/DataList";
import { AddFabButton } from "../../components/EditIconButton";
import Hidden from "@material-ui/core/Hidden";
import Loading from "../../components/Loading";
import AppointmentEditor from "./AppointmentEditor";
import { XHeadCell } from "../../components/table/XTableHead";
import { Avatar } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import Typography from "@material-ui/core/Typography";
import { hasValue } from "../../components/inputs/inputHelpers";


const columns: XHeadCell[] = [
  
    {
      name: "taskId",
      label: "Task",
    },
    {
      name: "startDate",
      label: "Start Date",
    },
    {
      name: "endDate",
      label: "End Date",
    },
  
    {
      name: "taskInfo",
      label: "Task Details",
    },

    {
        name: "assignedTo",
        label: "Volunteer",
      },
  ];
  




interface IProps {
    data: any | null
    done?: () => any
}

interface Row {
    taskId: string;
    startDate: Date;
    endDate: Date;
    taskInfo: string;
    assignedTo: string;
}
  
interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}


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

// const AssignedTasks = ({done}: IProps) => {
//     const classes = useStyles();

//     // For displaying the table data
//     const [state, setData] = React.useState<TableState>({
//         columns: [
//           { title: 'Task Nmae', field: 'taskId' },
//           { title: 'Start Date', field: 'startDate' },
//           { title: 'End Date', field: 'endDate' },
//           { title: 'Task Details', field: 'taskInfo' },
//           { title: 'Volunteers', field: 'assignedTo' },
//         ],
//         data: [
//         ],
//     });

//     React.useEffect(() => {
//         async function fetchTeamlead() {
//             const res = await fetch(remoteRoutes.day);
//             const json = await res.json();
//             console.log(json);
//             setData({
//                 ...state,
//                 data:json
//             })
//         }
//         fetchTeamlead();
//     }, []);


interface IMobileRow {
    avatar: any;
    primary: any;
    secondary: any;
  }


const toMobile = (data: any): IMobileRow => {
    const hasAvatar = hasValue(data.avatar);
    return {
      avatar: hasAvatar ? (
        <Avatar alt="Avatar" src={data.person.avatar} />
      ) : (
          <Avatar>
            <PeopleIcon />
          </Avatar>
        ),
      primary: data.ministry,
      secondary: (
        <>
          <Typography variant="caption" color="textSecondary" display="block">
            {data.taskName}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {data.taskDescription}
          </Typography>
        </>
      ),
    };
  };


    const AssignedTasks = () => {
        const [filter, setFilter] = useState<any>({});
        const [loading, setLoading] = useState<boolean>(true);
        const [data, setData] = useState<any[]>([]);
        const [selected, setSelected] = useState<any | null>(null);
        const [dialog, setDialog] = useState<boolean>(false);
        useEffect(() => {
          setLoading(true);
          search(
            remoteRoutes.day,
            filter,
            (resp) => {
              setData(resp);
            },
            undefined,
            () => setLoading(false)
          );
        }, [filter]);
      
      
      
        function handleNew() {
          setSelected(null);
          setDialog(true);
        }
      
        const handleEdit = (dt: any) => {
          const { taskId, startDate, endDate, taskInfo, assignedTo } = dt;
          const toEdit = {
            taskId, startDate, endDate, taskInfo, assignedTo
          };
          setSelected(toEdit);
          setDialog(true);
        };
      
        const handleComplete = (dt: any) => {
          if (selected) {
            const newData = data.map((it: any) => {
              if (it.id === dt.id) return dt;
              else return it;
            });
            setData(newData);
          } else {
            const newData = [...data, dt];
            setData(newData);
          }
          handleClose();
        };
        const handleClose = () => {
          setSelected(null);
          setDialog(false);
        };


    
    return(
        // <Layout>
        //     <Box p={1} className={classes.root}>
        //         <Header title="Assigned Tasks" />
        //         <MaterialTable
        //             title="Assigned Tasks"
        //             columns={state.columns}
        //             data={state.data}
        //         />
        //     </Box>
        // </Layout>


        <Layout>
        <Box p={2}>
          
          {loading ? (
            <Loading />
          ) : (
            
              <DataList
                data={data}
                toMobileRow={toMobile}
                columns={columns}
                onEditClick={handleEdit}
              />
            )}
        </Box>
        <Hidden mdUp>
          <AddFabButton onClick={handleNew} />
        </Hidden>
        <EditDialog
          title={selected ? "Edit Task" : "Create Task"}
          open={dialog}
          onClose={handleClose}
        >
          <AppointmentEditor data={selected} isNew={!selected} done={handleComplete} />
        </EditDialog>
      </Layout>
    );
}

export default AssignedTasks;