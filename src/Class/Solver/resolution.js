import {Mix} from '../InitialEntryView'
let glpk = require('../../../glpk/dist/glpk.min.js');


function loadLines(){
    let lines = Mix.state.problem.num_lines
    for(let m=0; m< Mix.state.problem.num_prod; m++ ){
        if(Mix.state.problem.signal_restriction_x[m] != "Ilimitada"){
            lines++
        }
    }
    Mix.setLine(lines)
}

function createMatrix(matrix){
    for(let i = 0; i < matrix.length; i++){
        matrix[i] = new Array(100); //colunas na matriz
    }
    
        
    //preenchendo a matriz com zeros
    for(let i = 1; i <= Mix.state.problem.num_lines; i++){
        for(let j = 1; j <= Mix.state.problem.num_collumn; j++){
            matrix[i][j] = 0;
        }
    }
}

function upInformationMatrix(matrix){
    
    let aux=0;
    let newRightSide = []
    for(let i=1; i<= Mix.state.problem.num_resource;i++){
        for(let j=1;j<= Mix.state.problem.num_prod; j++){
            if(Mix.state.problem.signal_restriction_x[j-1]!="Ilimitada"){
                aux++
                matrix[Mix.state.problem.num_resource+aux][j] = 1
                newRightSide[(Mix.state.problem.num_resource+aux)-1] = Mix.state.problem.request_x[j-1] 
            }
            newRightSide[i-1] = Mix.state.problem.right_side[i-1]
            matrix[i][j] = Mix.state.problem.itemPerResource[i-1][j-1]
            
        }
    }
    
    Mix.setRightSide(newRightSide)
}

function splitInformationArray(matrix){
   
    let coefficient = 0;
    let value = [];
    let collumnValue=[];
    let lineValue=[];

    for(let i=1; i<=Mix.state.problem.num_lines; i++){
        for(let j=1; j<=Mix.state.problem.num_collumn; j++){
            if(matrix[i][j] != 0){
                coefficient++;
                value[coefficient]=matrix[i][j];
                lineValue[coefficient]=i;
                collumnValue[coefficient]=j;
            
            }
        }
    }
    Mix.setLine_Pos(lineValue)
    Mix.setCol_Pos(collumnValue)
    Mix.setValue_Pos(value)
    Mix.setNumberCoef(coefficient)

}

export default function solverGLPK(){
    
    let z=0;
    let x = [];
    let valueRestriction = [];
    let statusProblem = '';
    
    
    loadLines();

    
    let matrix = new Array(100); 
    createMatrix(matrix)

    upInformationMatrix(matrix);
    
    splitInformationArray(matrix);
    
    
    let lp = glpk.glp_create_prob(); 

    glpk.glp_set_prob_name(lp, Mix.state.problem.name);
    

    if(Mix.state.problem.type_optimization == "Aumentar lucro"){
        
        glpk.glp_set_obj_dir(lp, glpk.GLP_MAX);
         
    }else{
        glpk.glp_set_obj_dir(lp, glpk.GLP_MIN);  
    }
      
            
    glpk.glp_add_rows(lp, Mix.state.problem.num_lines);
    glpk.glp_add_cols(lp, Mix.state.problem.num_collumn);

    
    for(let i=1; i <= Mix.state.problem.num_lines; i++){
        if(i <= Mix.state.problem.num_resource){
            
            if(Mix.state.problem.signal_restriction[i-1] == "Inicial em"){
                
                glpk.glp_set_row_bnds(lp, i, glpk.GLP_LO, Mix.state.problem.right_side[i-1], 0);

            }else if(Mix.state.problem.signal_restriction[i-1] == "No máximo"){
                glpk.glp_set_row_bnds(lp, i, glpk.GLP_UP, 0, Mix.state.problem.right_side[i-1]);
                
            }else{
                
                glpk.glp_set_row_bnds(lp, i, glpk.GLP_FX, Mix.state.problem.right_side[i-1], Mix.state.problem.right_side[i-1]);
            }
        }else{
            for(let j=0; j <= Mix.state.problem.num_prod;j++){
                if(Mix.state.problem.signal_restriction_x[j] != "Ilimitada"){
                    
                    if(Mix.state.problem.signal_restriction_x[j] == "Limitada e no mínimo"){
                        glpk.glp_set_row_bnds(lp, i, glpk.GLP_LO, Mix.state.problem.right_side[i-1], 0);
                    }else if(Mix.state.problem.signal_restriction_x[j] == "Limitada e no máximo"){
                        glpk.glp_set_row_bnds(lp, i, glpk.GLP_UP, 0, Mix.state.problem.right_side[i-1]);
                    }else {
                        glpk.glp_set_row_bnds(lp, i, glpk.GLP_FX, Mix.state.problem.right_side[i-1], Mix.state.problem.right_side[i-1]);
                    }
                }
            }
        }
        
    }
 
                                      
    for(let i=1; i<=Mix.state.problem.num_collumn;i++){
        
        glpk.glp_set_col_bnds(lp, i, glpk.GLP_LO, 0, 0);
        glpk.glp_set_col_kind(lp, i, glpk.GLP_IV);
        glpk.glp_set_obj_coef(lp, i, Mix.state.problem.coef_goal[i-1]);
    }

            
    glpk.glp_load_matrix(lp, Mix.state.problem.number_coefficient, Mix.state.problem.linePos, Mix.state.problem.colPos, Mix.state.problem.valueInPos);
    var smcp = new glpk.SMCP({presolve: glpk.GLP_ON});
    glpk.glp_simplex(lp, smcp);

    var iocp = new glpk.IOCP({presolve: glpk.GLP_ON});
    glpk.glp_intopt(lp, iocp);
            
   
    z = glpk.glp_mip_obj_val(lp); 
    Mix.setZ(z);
    
    for(let i=1; i<=Mix.state.problem.num_collumn; i++){
          x[i-1] = glpk.glp_mip_col_val(lp, i);
    }

    Mix.setX(x);
    
    for(let i=1; i<=Mix.state.problem.num_lines; i++){
       valueRestriction[i-1] = glpk.glp_get_row_prim(lp, i);
    }

    Mix.setRestrictResult(valueRestriction);
    
    
    if(glpk.glp_get_status(lp) == glpk.GLP_OPT){
        statusProblem= "Solução ótima";
    }else if(glpk.glp_get_status(lp) == glpk.GLP_FEAS){
        statusProblem= "Solução viável";
    }else if(glpk.glp_get_status(lp) == glpk.GLP_INFEAS){
        statusProblem= "Solução inviável";
    }else if(glpk.glp_get_status(lp) == glpk.GLP_NOFEAS){
        statusProblem= "Problema não possui solução viável";
    }else if(glpk.glp_get_status(lp) == glpk.GLP_UNBND){
        statusProblem= "Solução Ilimitada";
    }else if(glpk.glp_get_status(lp) == glpk.GLP_UNDEF){
         statusProblem= "Solução Indefinida";
    }
    Mix.setAnswer(statusProblem);
    

}

