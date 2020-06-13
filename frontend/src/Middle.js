import React from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ClockCircleOutlined  } from '@ant-design/icons';
import { withStyles } from "@material-ui/styles";
import moment from 'moment';


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
  }
}

class Middle extends React.Component{

   

    render(){
        const {classes} = this.props ;
        return(
            
            <div id="middle">
      
            <div class="nav">
                <div class="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Log out</div>
            <div class="info">
      
              <div class="userName">Dr.azouazi </div>
              <div class="iuser"></div>
      
            </div>
           </div>
        <div class={classes.container} >
        <Card className={classes.item}>
          <Statistic
            title="L'horloge"
            value={" " +moment().format('hh:mm:ss')}
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
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
    
        </div>
          </div>
         
        )
    }
}

export default withStyles(styles)(Middle);