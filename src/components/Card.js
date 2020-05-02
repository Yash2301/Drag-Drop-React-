/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "./utils";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Grid,Paper,TextField,withStyles,Box } from "@material-ui/core";
import ReactToPrint from 'react-to-print';

function getRandomColor(){
  let colorValues = ['aqua', 'black', 'blue', 'fuchsia', 'green', 
  'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
  'silver', 'teal'];

  return colorValues[Math.floor(Math.random() * colorValues.length)];
}
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);
class Card extends Component {
  constructor() {
    super();

    this.onColumnDrop = this.onColumnDrop.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      scene: {
        type: "container",
        props: {
          orientation: "horizontal"
        },
        children: [
          {
            id: `items`,
            name: 'items',
            children:[{
              id:1,
              data:'Lazy',
              color:getRandomColor(),
              textValue:''
            },{
              id:2,
              data:'Passive',
              color:getRandomColor(),
              textValue:''
            },{
              id:3,
              data:'Shy',
              color:getRandomColor(),
              textValue:''
            },{
              id:4,
              data:'Hard Headed',
              color:getRandomColor(),
              textValue:''
            },{
              id:5,
              data:'Short-sighted',
              color:getRandomColor(),
              textValue:''
            },{
              id:6,
              data:'Selfish',
              color:getRandomColor(),
              textValue:''
            },{
              id:7,
              data:'Blunt',
              color:getRandomColor(),
              textValue:''
            },{
              id:8,
              data:'Greedy',
              color:getRandomColor(),
              textValue:''
            }]
          },{
            id: `Weekness0`,
            name: 'Weakness',
            children:[]
          }
        ]
      }
    };
  }

  render() {
    

    return (
      <Container
          style={{width:'100%'}}
          onDrop={this.onColumnDrop}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
          }}
        >
          <Grid container spacing={3}
      justify="center"
      alignItems="center">
          <Grid container>
            <Grid item md={3} ></Grid>
            <Grid item md={5} ><h3>Hello, #007</h3></Grid>
            <Grid item md={4} ><h3><ReactToPrint
            trigger={() => <a href="#">Print Now</a>}
            content={() => this.componentRef}
          /></h3></Grid>
          </Grid>
          <Grid container justify="center" alignItems="center" ref={el => (this.componentRef = el)}>
          {this.state.scene.children.map(column => {
            return (
              <Grid item style={{ padding: 20,height:'800px',border:'2px solid black' }} md={2} key={column.id}>
                  
                  <h3>{column.name}</h3>
                <List aria-label="main mailbox folders">
                  <Container
                    {...column.props}
                    groupName="col"
                    onDragStart={e => console.log("drag started", e)}
                    onDragEnd={e => console.log(this.state, e)}
                    onDrop={e => this.onCardDrop(column.id, e)}
                    getChildPayload={index =>
                      this.getCardPayload(column.id, index)
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    onDragEnter={() => {
                      console.log("drag enter:", column.id);
                    }}
                    onDragLeave={() => {
                      console.log("drag leave:", column.id);
                    }}
                    onDropReady={p => console.log('Drop ready: ', p)}
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >
                    {column.children.length > 0?column.children.map(card => {
                      return (
                        <Draggable key={card.id}>
                          <Box pt={3} >
                          <Paper>
                          <ListItem>
                            
                            <ListItemText style={{color:card.color}} primary={card.data} />
                          </ListItem>
                          </Paper>
                          <Divider />

                        </Box>
                        </Draggable>
                      );
                    }):(<Draggable>
                      <Box pt={3} >
                          <ListItem>
                            <ListItemText primary={'Please select'} />
                          </ListItem>
                        </Box>
                  </Draggable>)}
                  </Container>
                  </List>
              </Grid>
            );
          })}
            <Grid  item md={2} key={3} style={{ padding: 20,height:800,border:'2px solid black' }}>
              <h3>Strengths</h3>
              <List>
              {this.state.scene.children[1].children.length > 0?this.state.scene.children[1].children.map(function(item,i){
                return  <Box pt={3} ><Paper key={i}><ListItem >
                            
                  <CssTextField value={this.state.scene.children[1].children[i].textValue} inputProps={{ style: { fontFamily: 'nunito', color: item.color,borderColor: 'white'}}} onChange={(event) => {
                      let scene = this.state.scene;
                      scene.children[1].children[i].textValue = event.target.value;
                      this.setState({
                        scene: scene,
                      });
                    }} />
                </ListItem></Paper></Box>
              }.bind(this)):<Box pt={3} >
              <ListItem>
                <ListItemText primary={'Please select'} />
              </ListItem>
            </Box>}
              </List>
            </Grid>
            </Grid>
        </Grid>
        </Container>
    );
  }

  getCardPayload(columnId, index) {
    return this.state.scene.children.filter(p => p.id === columnId)[0].children[
      index
    ];
  }

  onColumnDrop(dropResult) {
    const scene = Object.assign({}, this.state.scene);
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({
      scene
    });
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.scene);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.children = applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);

      this.setState({
        scene
      });
    }
  }
}

export default Card;