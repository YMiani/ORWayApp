import React from 'react'

export class MixProblem extends React.Component{
    constructor(props){
        super(props)
        this.setName = this.setName.bind(this)
        this.state={
            problem:{
                id:0,
                name:" ",
                desc:" ",
                num_collumn:0,
                num_lines:0,
                num_prod:0,
                num_resource:0,
                name_product:[],
                name_resource:[],
                type_optimization:" ",
                coef_goal:[],
                right_side:[],
                signal_restriction:[],
                signal_restriction_x:[],
                date:" ",
                type_solution:" ",
                linePos:[],
                valueInPos:[],
                colPos:[],
                number_coefficient:0,
                x:[],
                z:[],
                unity_product:" ",
                unity_resource:[],
                request_x:[],
                itemPerResource:[],
                restrictionResult:[],
                answerType:" ",}
        }

        
    
    }
   
    
    
    setId(n){
        this.state.problem.id = n
        //this.setState({id:n})
    }
    
    setName = (n) =>{
        this.state.problem.name = n
       // this.setState({name:n})
    }
    
    setDesc(n){
        this.state.problem.desc = n
        //this.setState({desc:n})
    }
    
    setCol(n){
        this.state.problem.num_collumn = n
        //this.setState({num_collumn:n})
    }
    
    setLine(n){
        this.state.problem.num_lines = n
        //this.setState({num_lines:n})
    }
    
    setProdNum(n){
        this.state.problem.num_prod = n
        this.state.problem.num_collumn = this.state.problem.num_prod
        //this.setState({num_prod:n, num_collumn:this.state.problem.num_prod})
    }
    
    setResNum(n){
        this.state.problem.num_resource = n
        this.state.problem.num_lines = this.state.problem.num_resource
        //this.setState({num_resource:n, num_lines:this.state.problem.num_resource})
    }
    
    setProdName(n){
        this.state.problem.name_product = n;
        //this.setState({name_product:n})
    }
    
    setResName(n){
        this.state.problem.name_resource = n
        //this.setState({name_resource:n})
    }
    
    setCoef(n){
        this.state.problem.coef_goal = n
        //this.setState({coef_goal:n})
    }
    
    setItemResource(n){
        this.state.problem.itemPerResource = n
        //this.setState({itemPerResource:n})
    }
    
    setRightSide(n){
        this.state.problem.right_side = n
        //this.setState({right_side:n})
    }
    
    setRequest(n){
        this.state.problem.request_x = n
        //this.setState({request_x:n})
    }
    
    setDate(n){
        this.state.problem.date = n
        //this.setState({date:n})
    }
    
    setTypeOpt(n){
        this.state.problem.type_optimization = n
        //this.setState({type_optimization:n})
    }
    
    setProd_Uni(n){
        this.state.problem.unity_product = n
        //this.setState({unity_product:n})
    }
    
    setRes_Uni(n){
        this.state.problem.unity_resource = n
        //this.setState({unity_resource:n})
    }
    
    setSignal(n){
        this.state.problem.signal_restriction = n
        //this.setState({signal_restriction:n})
    }
    
    setSignal_X(n){
        this.state.problem.signal_restriction_x = n
        //this.setState({signal_restriction_x:n})
    }
    
    setLine_Pos(n){
        this.state.problem.linePos = n
        //this.setState({linePos:n})
    }
    
    setCol_Pos(n){
        this.state.problem.colPos = n
        //this.setState({colPos:n})
    }
    
    setValue_Pos(n){
        this.state.problem.valueInPos = n
        //this.setState({valueInPos:n})
    }
    
    setZ(n){
        this.state.problem.z = n
        //this.setState({z:n})
    }
    
    setX(n){
        this.state.problem.x = n
        //this.setState({x:n})
    }
    
    setNumberCoef(n){
        this.state.problem.number_coefficient = n
        //this.setState({number_coefficient:n})
    }
    
    setRestrictResult(n){
        this.state.problem.restrictionResult = n
        //this.setState({restrictionResult:n})
    }
    
    setAnswer(n){
        this.state.problem.answerType = n
        //this.setState({answerType:n})
    }
    
}

let problem = {
    id:0,
    name:" ",
    desc:" ",
    num_collumn:0,
    num_lines:0,
    num_prod:0,
    num_resource:0,
    name_product:[],
    name_resource:[],
    type_optimization:" ",
    coef_goal:[],
    right_side:[],
    signal_restriction:[],
    signal_restriction_x:[],
    date:" ",
    type_solution:" ",
    linePos:[],
    valueInPos:[],
    colPos:[],
    number_coefficient:0,
    x:[],
    z:[],
    unity_product:" ",
    unity_resource:[],
    request_x:[],
    itemPerResource:[],
    restrictionResult:[],
    answerType:" ",
    
}

export function setId(n){
    problem.id = n;
}

export function setName(n){
    problem.name = n;
}

export function setDesc(n){
    problem.desc = n;
}

export function setCol(n){
    problem.num_collumn = n;
}

export function setLine(n){
    problem.num_lines = n;
}

export function setProdNum(n){
    problem.num_prod = n;
    problem.num_collumn = problem.num_prod;
}

export function setResNum(n){
    problem.num_resource = n;
    problem.num_lines = problem.num_resource;
}

export function setProdName(n){
    problem.name_product = n;
}

export function setResName(n){
    problem.name_resource = n;
}

export function setCoef(n){
    problem.coef_goal = n;
}

export function setItemResource(n){
    problem.itemPerResource = n
}

export function setRightSide(n){
    problem.right_side = n
}

export function setRequest(n){
    problem.request_x=n
}

export function setDate(n){
    problem.date = n
}

export function setTypeOpt(n){
    problem.type_optimization=n
}

export function setProd_Uni(n){
    problem.unity_product=n
}

export function setRes_Uni(n){
    problem.unity_resource=n
}

export function setSignal(n){
    problem.signal_restriction=n
}

export function setSignal_X(n){
    problem.signal_restriction_x=n
}

export function setLine_Pos(n){
    problem.linePos=n
}

export function setCol_Pos(n){
    problem.colPos=n
}

export function setValue_Pos(n){
    problem.valueInPos=n
}

export function setZ(n){
    problem.z=n
}

export function setX(n){
    problem.x=n
}

export function setNumberCoef(n){
    problem.number_coefficient=n
}

export function setRestrictResult(n){
    problem.restrictionResult=n
}

export function setAnswer(n){
    problem.answerType=n
}

export default problem;
        