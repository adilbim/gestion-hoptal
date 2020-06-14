import React from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ClockCircleOutlined  } from '@ant-design/icons';
import { withStyles } from "@material-ui/styles";
import moment from 'moment';
import StackedBarChart from './StackedBarChart';
import LineChart  from './LineChart';
import TinyLineChart from './TinyLineChart';


const styles = {
  container :{
    background: "#ececec",
    padding: "30px",
    display: "flex",
    justifyContent: "space-between",
    margin: "0 20px"
  },
  item: {
    flexBasis: "20%",
    padding: "20px",
    background: "#f8f8f8"
  },
  charts:{
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: '20px',
    height: '50%'
  }
}

class Middle extends React.Component{

   constructor(props){
     super(props);
     this.state = {horloge:'hh:mm:ss'}
   }

   componentDidMount(){
    this.interval = setInterval(()=>{
       this.setState({horloge: moment().format('hh:mm:ss')})
     },1000)
   }
   componentWillMount(){
    clearInterval(this.interval);
   }

    render(){
        const {classes} = this.props ;
        return(
            
            <div id="middle">
      
            <div className="nav">
                <div className="logout"><i className="fa fa-sign-out" aria-hidden="true"></i> Log out</div>
            <div className="info">
      
              <div className="userName">Dr.azouazi </div>
              <div className="iuser"></div>
      
            </div>
           </div>
        <div className={classes.container} >
        <Card className={classes.item}>
          <Statistic
            title="L'horloge"
            value={"  "+this.state.horloge}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ClockCircleOutlined spin />}
            
          />
        </Card>
    
        <Card className={classes.item}>
          <Statistic
            title="Rendez-Vous"
            value={50}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="/ 100"
          />
        </Card>
    
        <Card className={classes.item}>
          <Statistic
            title="Active"
            value={4}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="/ 20"
          />
        </Card>
        <Card className={classes.item}>
          {/* <Statistic
            title="Idle"
            value={}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          /> */}<TinyLineChart />
        </Card>
    
        </div>

        <div className={classes.charts}>
          <StackedBarChart />
          <LineChart />
        </div>
          </div>
         
        )
    }
}

export default withStyles(styles)(Middle);