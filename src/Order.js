import React, { Component } from 'react';
import TotalOrders from '../src/data/order.json';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
class Order extends Component{
  state = {
    // notes: [],
    order : [],
    id : "",
    customer_name : "",
    customer_email : "",
    product : "",
    quantity : "",
    orderEditing: null,
    currentId : "",
    currentCustomer_name : "",
    currentCustomer_email : "",
    currentProduct : "",
    currentQuantity : "",
    
  };
  addOrder = () => {
    let order = [...this.state.order];
    let CurrentOrder = {};
    CurrentOrder.id = this.state.id;
    CurrentOrder.customer_name = this.state.customer_name
    CurrentOrder.customer_email = this.state.customer_email
    CurrentOrder.product = this.state.product
    CurrentOrder.quantity = this.state.quantity
    order.push(CurrentOrder);
    this.setState({order,id : "",name : "",email : "",product : "",quantity : ""})
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.order.length !== this.state.order.length) {
      const json = JSON.stringify(this.state.order);
      localStorage.setItem("order", json);
    }
  }
  componentDidMount() {
    const order = TotalOrders;
    if (order) {
      this.setState(() => ({ order }));
    }
  }
  setOrderEditing = index => {
    this.setState({ orderEditing: index, 
        currentId: this.state.order[index].id,
        currentCustomer_email : this.state.order[index].customer_email,
        currentCustomer_name : this.state.order[index].customer_name,
        currentProduct :   this.state.order[index].product,
        currentQuantity : this.state.order[index].quantity
    });
  };
  editOrderId = event => {
    this.setState({ currentId: event.target.value });
  };
  editOrderEmail = event => {
    this.setState({ currentCustomer_email: event.target.value });
  };
  editOrderName = event => {
    this.setState({ currentCustomer_name: event.target.value });
  };
  editOrderProduct = event => {
    this.setState({ currentProduct: event.target.value });
  };
  editOrderQuantity = event => {
    this.setState({ currentQuantity: event.target.value });
  };
  submitEdit = index => {
    let order = [...this.state.order];
    let CurrentOrder = {};
    CurrentOrder.id = this.state.currentId;
    CurrentOrder.customer_name = this.state.currentCustomer_name
    CurrentOrder.customer_email = this.state.currentCustomer_email
    CurrentOrder.product = this.state.currentProduct
    CurrentOrder.quantity = this.state.currentQuantity
    order[index] = CurrentOrder
    this.setState({ order, orderEditing: null });
  };
   save = () =>{
    let order = [...this.state.order];
    const response = axios.post(
      'https://us-central1-order-management-f3fe9.cloudfunctions.net/app',
      { data: order || 1 },
      { headers: { 'Content-Type': 'application/json' ,     
    } }
    )
    console.log(response.data)
  }
  render(){
    
    return (
      <div><br/><br/><br/>
      <Button variant="contained" color="primary"className="button" onClick={this.save} >save</Button>
      <a href='https://us-central1-order-management-f3fe9.cloudfunctions.net/app'>download</a>
      <Grid item xs={5}>
      <Paper >
      <FormControl>
      <TextField id="standard-basic"
          onChange={event => this.setState({ id : event.target.value })}
          value={this.state.id}
          className="input"
          placeholder="id"
        /><br/>
        <TextField id="standard-basic"
          onChange={event => this.setState({ customer_name: event.target.value })}
          value={this.state.name}
          className="input"
          placeholder="name"
        /><br/>
        <TextField id="standard-basic"
          onChange={event => this.setState({ customer_email: event.target.value })}
          value={this.state.customer_email}
          className="input"
          placeholder="email"
        /><br/>
        <p>product</p>
        <Select
          labelId="demo-simple-select"
          id="demo-simple-select"
          onChange={event => this.setState({ product: event.target.value })}
          value={this.state.product}
          className="input"
          placeholder="product"
        >
          <MenuItem value={'Product 1'}>
            <em>product 1</em>
          </MenuItem>
          <MenuItem value={'Product 2 '}>Twenty</MenuItem>
          <MenuItem value={'product 3'}>Thirty</MenuItem>
        </Select>
        <br/>
        <TextField id="standard-basic" type= 'number'
          onChange={event => {
            if(event.target.value >= 0)
            this.setState({ quantity: event.target.value })
          }}
          value={this.state.quantity}
          className="input"
          placeholder="quantity"
        />
        <br/>
        <Button variant="contained" color="primary"className="button" onClick={this.addOrder} >Submit</Button>
        <br/>
        </FormControl>
      </Paper>
       
      </Grid>
        {
        this.state.order.map((item, index) => (
          <div  key={index}>
            {this.state.orderEditing === null ||
            this.state.orderEditing !== index ? (
              <div >
                <div >
                <br/>
                
                  <Grid item xs={6}>
                      <Paper>
                      <Button variant="contained" color="secondary" onClick={() => this.setOrderEditing(index)}>
                        Edit
                      </Button><br/>
                        id      :  {item.id}<br/>
                        name    :  {item.customer_name}<br/>
                        email   :  {item.customer_email}<br/>
                        product :  {item.product}<br/>
                        quantity:  {item.quantity}<br/>
                        
                    </Paper>
                  </Grid>
                  
                </div>
              </div>
            ) : (
              <div >
                <div ><br/>
                  <TextField
                  type="text"
                  value={this.state.currentId}
                    onChange={event => this.editOrderId(event)}
                  /><br/>
                  <TextField
                  type="text"
                  value={this.state.currentCustomer_email}
                    onChange={event => this.editOrderEmail(event)}
                  /><br/>
                  <TextField
                  type="text"
                  value={this.state.currentCustomer_name}
                    onChange={event => this.editOrderName(event)}
                  /><br/>
                  <Select
                    labelId="demo-simple-select"
                    id="demo-simple-select"
                    onChange={event => this.editOrderProduct(event)}
                    value={this.state.currentProduct}
                    className="input"
                    placeholder="product"
                  >
                    <MenuItem value={'Product 1'}>
                      <em>product 1</em>
                    </MenuItem>
                    <MenuItem value={'Product 2 '}>product 2</MenuItem>
                    <MenuItem value={'product 3'}>product 3</MenuItem>
                  </Select><br/>
                  <TextField
                  type="number"
                  value={this.state.currentQuantity}
                    onChange={event => {
                      if(event.target.value >= 0)
                      this.editOrderQuantity(event)
                    }}
                  /><br/>
                  <Button variant="contained"color='secondary' onClick={() => this.submitEdit(index)}>Done</Button>
                  <br/><br/>
                  <hr/>
                </div>
              </div>
          )}
        </div>
        ))
        }
<Button variant="contained" color="primary"className="button" onClick={this.save} >save</Button>
      <a href='https://us-central1-order-management-f3fe9.cloudfunctions.net/app'>download</a>
     </div>

    );
    }

}

export default Order;
  