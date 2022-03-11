
import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { eventWrapper } from '@testing-library/user-event/dist/utils';


class App extends React.Component{
  constructor (props){
    super(props);
    this.state={
      input:'0',       //value for input and calculation display
      prevOperand:'',  //display of formula inputed
      lastInput:'',    //
      status:'0',      //if status is 0 then previus value is replace
      lastOperator:'', //the operator that's going to be used
      prevResult:0,    //previous calculation
      minus:1
    };

    this.getValue=this.getValue.bind(this);
    this.handleOperator=this.handleOperator.bind(this);
    this.handleAC=this.handleAC.bind(this);
    this.handleClear=this.handleClear.bind(this);
    // this.handleCalc=this.handleCalc.bind(this);
  }

  getValue(event){
    if(this.state.input === '0' || this.state.status === '0'){  //--> to replace previous display number
      this.setState({
        input:event.target.value,
        status:'1',
        lastInput:event.target.value,
        // prevOperand:''
      })
    }else if(event.target.value==='.' && /\./g.test(this.state.input)){  //--> this is to avoid user input dot multiply times
        this.setState({
          input:this.state.input,
          status:'1'
        })
    } else {
        this.setState({
          input:this.state.input+event.target.value,
          status:'1',
          lastInput:event.target.value
        })
    }
  }
  

  handleOperator(event){
    
    if (this.state.prevOperand===''){
        this.setState({
          prevOperand:this.state.prevOperand+this.state.input+event.target.value,
          status:'0',
          lastOperator:event.target.value,
          lastInput:event.target.value,
          prevResult:this.state.input

        })

    } else {
         
        if(this.state.lastInput === '+' || this.state.lastInput === '-' || this.state.lastInput === '/' || this.state.lastInput === '*'){
            if (event.target.value === '-') {
              this.setState({
                prevOperand:`${this.state.prevOperand}${event.target.value}`,
                lastInput:event.target.value,
                minus:-1
              })
            } else {
              this.setState({
                  prevOperand:`${this.state.prevOperand.slice(0, -1)}${event.target.value}`,
                  lastOperator:event.target.value,
                  lastInput:event.target.value,
                  status:'0',
                  minus:1
              })
            }

        // } else if (/([\+|\-|\*|\/]\-)$/.test(this.state.prevOperand)){
        //       this.setState({
        //         prevOperand:`${this.state.prevOperand.slice(0, -2)}${event.target.value}`,
        //         lastOperator:event.target.value,
        //         lastInput:event.target.value
        //       })

        } else {
             
             this.setState ({
                prevOperand : `${this.state.prevOperand}${this.state.input}${event.target.value}`,
                lastOperator:event.target.value,
                status:'0',
                
             })   
          
             switch (this.state.lastOperator){
                    case '+' : 
                      return this.setState({ 
                            prevResult:parseFloat(this.state.prevResult)+(parseFloat(this.state.input)*this.state.minus),
                            input : parseFloat(this.state.prevResult)+(parseFloat(this.state.input)*this.state.minus), 
                            minus:1,
                            status:'0'
                            
                          })
                      // break;
                    case '/' : 
                      return this.setState({ 
                              prevResult:parseFloat(this.state.prevResult)/(parseFloat(this.state.input)*this.state.minus),
                              input : parseFloat(this.state.prevResult)/(parseFloat(this.state.input)*this.state.minus), 
                              minus:1
                            })
                    // break;
                    case '*' : 
                      return this.setState({ 
                              prevResult:parseFloat(this.state.prevResult)*(parseFloat(this.state.input)*this.state.minus),
                              input : parseFloat(this.state.prevResult)*(parseFloat(this.state.input)*this.state.minus),
                              minus:1
                            })
                    // break;
                    case '-' : 
                      return this.setState({ 
                              prevResult:parseFloat(this.state.prevResult)-(parseFloat(this.state.input)*this.state.minus),
                              input : parseFloat(this.state.prevResult)-(parseFloat(this.state.input)*this.state.minus),
                              minus:1
                            })
                    default:
                    break;
              }
        }
    }
  }

  handleAC(event){
    this.setState({
      input:'0',       //value for input and calculation display
      prevOperand:'',  //display of formula inputed
      lastInput:'',    //
      status:'0',      //if status is 0 then previus value is replace
      lastOperator:'', //the operator that's going to be used
      prevResult:0,    //previous calculation
      minus:1
    })
  }

  handleClear(event){
    this.setState({
      input:'0'
    })
  }
   

  render(){
    const numbers = [
      { num:7, idNum:'seven'},
      { num:8, idNum:'eight'},
      { num:9, idNum:'nine'},
      { num:4, idNum:'four'},
      { num:5, idNum:'five'},
      { num:6, idNum:'six'},
      { num:1, idNum:'one'},
      { num:2, idNum:'two'},
      { num:3, idNum:'three'},
      { num:0, idNum:'zero'}
    ]
    const operators = [
      {op:'/', opKey:1, idOp: 'divide' },
      {op:'*', opKey:2, idOp: 'multiply'},
      {op:'+', opKey:3, idOp: 'add'},
      {op:'-', opKey:4, idOp: 'subtract'}
    ];
    
    console.log(this.state.prevResult,this.state.minus,'dobel operator ?'+/[\+|\-|\*|\/]$/.test(this.state.prevOperand)+' lastinput : '+this.state.lastInput,"input: "+this.state.input,'prevoperand : '+this.state.prevOperand);
    
    return (
      
        
      
      <div className="container">
        {/* <div>Calc</div> */}
        <div className="layar">
          <input value={this.state.prevOperand} className='layarinput prevCalc' ></input>
          <input id="display" value={this.state.input} className='layarinput currentInput' ></input>
        </div>
      
      <div className='buttons'>

        <div className='top'>
          <div className="number">
            {numbers.map(number => <button id={number.idNum} value={number.num} onClick={this.getValue} className="button num" key={number.num}>{number.num}</button>)}
            <button id="decimal" value='.' className="button num" onClick={this.getValue}>.</button>
            <button id='equals'  value='=' className="button num" onClick={this.handleOperator}>=</button>
          </div>

          <div className="operator">
            {operators.map(operator=><button id={operator.idOp} value={operator.op} onClick={this.handleOperator} className="button" key={operator.opKey}>{operator.op}</button>)}
          </div>
        </div>
        
        <div className='clear'>
          <button value='-' onClick={this.getValue}>+/-</button>
          <button id='clear' className="button c" onClick={this.handleAC}>AC</button>
          <button className="button c" onClick={this.handleClear}>C</button>
        </div>
      </div>
    </div>
    
    )
  }
}


export default App;
